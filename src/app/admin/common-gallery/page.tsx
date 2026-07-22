"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import {
  AdminListSkeleton,
  Button,
  Card,
  EmptyState,
  Input,
} from "@/components/ui";
import { api } from "@/lib/api";
import type { CommonGalleryImage } from "@/lib/types";

export default function AdminCommonGalleryPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  function addFiles(list: FileList | null) {
    if (!list?.length) return;
    const incoming = Array.from(list).filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => {
      const next = [...prev];
      for (const file of incoming) {
        const duplicate = next.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        );
        if (!duplicate) next.push(file);
      }
      return next.slice(0, 30);
    });
  }

  const imagesQuery = useQuery({
    queryKey: ["admin", "common-gallery"],
    enabled: Boolean(token),
    queryFn: () =>
      api.get<{ images: CommonGalleryImage[] }>("/common-gallery", token),
  });

  const images = imagesQuery.data?.images ?? [];

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!files.length) throw new Error("Add at least one image");
      const form = new FormData();
      files.forEach((file) => form.append("images", file));
      return api.post<{ images: CommonGalleryImage[] }>(
        "/common-gallery",
        form,
        token
      );
    },
    onSuccess: async () => {
      setFiles([]);
      setFormError("");
      await queryClient.invalidateQueries({
        queryKey: ["admin", "common-gallery"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["common-gallery"],
      });
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      api.delete<{ message: string }>(`/common-gallery/${id}`, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin", "common-gallery"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["common-gallery"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      alt,
      isPublished,
    }: {
      id: string;
      alt?: string;
      isPublished?: boolean;
    }) =>
      api.put<{ image: CommonGalleryImage }>(
        `/common-gallery/${id}`,
        { alt, isPublished },
        token
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin", "common-gallery"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["common-gallery"],
      });
    },
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    uploadMutation.mutate();
  }

  return (
    <AdminShell
      title="Common Gallery"
      description="Upload shared images shown on the homepage mosaic and the Common Gallery tab."
    >
      <Card className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Upload images
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
          />
          {previews.length ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {previews.map((src, index) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-xl border border-line bg-soft"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute right-1 top-1 rounded bg-ink/80 px-1.5 text-xs text-white"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : null}
          {formError ? (
            <p className="text-sm text-red-600">{formError}</p>
          ) : null}
          <Button
            type="submit"
            variant="accent"
            disabled={uploadMutation.isPending || files.length === 0}
          >
            {uploadMutation.isPending
              ? "Uploading…"
              : `Upload ${files.length || ""} image${files.length === 1 ? "" : "s"}`}
          </Button>
        </form>
      </Card>

      <div className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          Library ({images.length})
        </h2>
        {imagesQuery.isLoading ? (
          <AdminListSkeleton />
        ) : images.length === 0 ? (
          <EmptyState>No common gallery images yet. Upload some above.</EmptyState>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <Card key={image._id} padded={false} className="overflow-hidden">
                <div className="relative aspect-[4/3] bg-soft">
                  <Image
                    src={image.url}
                    alt={image.alt || "Common gallery"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <Input
                    defaultValue={image.alt}
                    placeholder="Alt text"
                    onBlur={(e) => {
                      const alt = e.target.value.trim();
                      if (alt !== (image.alt || "")) {
                        updateMutation.mutate({ id: image._id, alt });
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant={image.isPublished ? "outline" : "accent"}
                      onClick={() =>
                        updateMutation.mutate({
                          id: image._id,
                          isPublished: !image.isPublished,
                        })
                      }
                    >
                      {image.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        if (
                          window.confirm("Delete this image from the common gallery?")
                        ) {
                          deleteMutation.mutate(image._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <p className="text-xs text-muted">
                    {image.isPublished ? "Published" : "Hidden"} · {image.publicId}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
