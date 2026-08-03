"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import { MediaPicker } from "@/components/MediaPicker";
import {
  AdminListSkeleton,
  Button,
  Card,
  EmptyState,
  Input,
} from "@/components/ui";
import { api } from "@/lib/api";
import type { CommonGalleryImage, HeroShowcaseImage } from "@/lib/types";

export default function AdminCommonGalleryPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formError, setFormError] = useState("");

  const imagesQuery = useQuery({
    queryKey: ["admin", "common-gallery"],
    enabled: Boolean(token),
    queryFn: () =>
      api.get<{ images: CommonGalleryImage[] }>("/common-gallery", token),
  });

  const images = imagesQuery.data?.images ?? [];
  const existingPublicIds = new Set(images.map((image) => image.publicId));

  const uploadMutation = useMutation({
    mutationFn: async (libraryImages: HeroShowcaseImage[]) => {
      if (!libraryImages.length) throw new Error("Add at least one image");
      const form = new FormData();
      form.append("libraryImages", JSON.stringify(libraryImages));
      return api.post<{ images: CommonGalleryImage[] }>(
        "/common-gallery",
        form,
        token
      );
    },
    onSuccess: async () => {
      setFormError("");
      setPickerOpen(false);
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

  return (
    <AdminShell
      title="Common Gallery"
      description="Upload shared images shown on the homepage mosaic and the Common Gallery tab."
    >
      <Card className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Upload images
        </h2>
        <button
          type="button"
          onClick={() => {
            setFormError("");
            setPickerOpen(true);
          }}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-background px-4 py-6 text-center hover:border-accent"
        >
          <span className="text-sm font-semibold text-ink">Add photos</span>
          <span className="text-xs text-muted">
            Open S3 library — pick existing or upload new
          </span>
        </button>
        {formError ? (
          <p className="text-sm text-red-600">{formError}</p>
        ) : null}
        {uploadMutation.isPending ? (
          <p className="text-sm text-muted">Adding photos to common gallery…</p>
        ) : null}
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
                          window.confirm(
                            "Delete this image from the common gallery?"
                          )
                        ) {
                          deleteMutation.mutate(image._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <p className="text-xs text-muted">
                    {image.isPublished ? "Published" : "Hidden"} ·{" "}
                    {image.publicId}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <MediaPicker
        open={pickerOpen}
        title="Common Gallery photos"
        maxSelect={30}
        selected={[]}
        onClose={() => setPickerOpen(false)}
        onConfirm={(picked) => {
          const fresh = picked.filter(
            (image) => !existingPublicIds.has(image.publicId)
          );
          if (!fresh.length) {
            setFormError(
              picked.length
                ? "Those images are already in the common gallery"
                : "Select at least one image"
            );
            return;
          }
          uploadMutation.mutate(fresh);
        }}
      />
    </AdminShell>
  );
}
