"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button, Skeleton } from "@/components/ui";
import { api } from "@/lib/api";
import type { HeroShowcaseImage, MediaAsset } from "@/lib/types";

const PAGE_SIZE = 10;

type MediaPickerProps = {
  open: boolean;
  title?: string;
  maxSelect?: number;
  selected?: HeroShowcaseImage[];
  onClose: () => void;
  onConfirm: (images: HeroShowcaseImage[]) => void;
};

export function MediaPicker({
  open,
  title = "Media library",
  maxSelect = 6,
  selected = [],
  onClose,
  onConfirm,
}: MediaPickerProps) {
  const { token } = useAuth();
  const [picked, setPicked] = useState<HeroShowcaseImage[]>([]);
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchPage = useCallback(
    async (cursor: string | null, append: boolean) => {
      if (!token) return;
      if (append) setLoadingMore(true);
      else setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
        if (cursor) params.set("nextCursor", cursor);
        const data = await api.get<{
          assets: MediaAsset[];
          nextCursor: string | null;
        }>(`/media?${params.toString()}`, token);

        setAssets((prev) => {
          if (!append) return data.assets;
          const seen = new Set(prev.map((item) => item.publicId));
          return [
            ...prev,
            ...data.assets.filter((item) => !seen.has(item.publicId)),
          ];
        });
        setNextCursor(data.nextCursor);
      } catch (err) {
        setError((err as Error).message || "Failed to load gallery");
        if (!append) {
          setAssets([]);
          setNextCursor(null);
        }
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (!open) return;
    setPicked(selected);
    setAssets([]);
    setNextCursor(null);
    setError("");
    void fetchPage(null, false);
    // Only reset when the modal opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, fetchPage]);

  if (!open) return null;

  function toggleAsset(asset: MediaAsset) {
    setPicked((prev) => {
      const exists = prev.find((img) => img.publicId === asset.publicId);
      if (exists) {
        return prev.filter((img) => img.publicId !== asset.publicId);
      }
      if (prev.length >= maxSelect) return prev;
      return [
        ...prev,
        { url: asset.url, publicId: asset.publicId, alt: "" },
      ];
    });
  }

  async function onUpload(files: FileList | null) {
    const list = Array.from(files || []);
    if (!list.length) return;
    setUploading(true);
    setError("");
    try {
      for (const file of list) {
        if (picked.length >= maxSelect) break;
        const body = new FormData();
        body.append("image", file);
        const data = await api.post<{ asset: MediaAsset }>(
          "/media",
          body,
          token
        );
        setAssets((prev) => [data.asset, ...prev]);
        setPicked((prev) => {
          if (prev.length >= maxSelect) return prev;
          if (prev.some((img) => img.publicId === data.asset.publicId)) {
            return prev;
          }
          return [
            ...prev,
            {
              url: data.asset.url,
              publicId: data.asset.publicId,
              alt: "",
            },
          ];
        });
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-muted">
              Pick from Cloudinary (or local uploads). Selected {picked.length}/
              {maxSelect}.
            </p>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink hover:bg-soft">
            {uploading ? "Uploading…" : "Upload new"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              disabled={uploading || picked.length >= maxSelect}
              onChange={(e) => {
                void onUpload(e.target.files);
                e.target.value = "";
              }}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {loading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                Loading gallery…
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <Skeleton key={index} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>
          ) : assets.length === 0 ? (
            <p className="text-sm text-muted">
              No images yet. Upload new photos to start the library.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                {assets.map((asset) => {
                  const active = picked.some(
                    (img) => img.publicId === asset.publicId
                  );
                  return (
                    <button
                      key={asset.publicId}
                      type="button"
                      onClick={() => toggleAsset(asset)}
                      className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                        active ? "border-accent" : "border-transparent"
                      }`}
                    >
                      <Image
                        src={asset.url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                      {active ? (
                        <span className="absolute right-1 top-1 rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          Selected
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>

              {nextCursor ? (
                <div className="mt-5 flex justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void fetchPage(nextCursor, true)}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                        Loading…
                      </span>
                    ) : (
                      "Load more"
                    )}
                  </Button>
                </div>
              ) : (
                <p className="mt-4 text-center text-xs text-muted">
                  Showing all {assets.length} image
                  {assets.length === 1 ? "" : "s"}
                </p>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="accent"
            onClick={() => onConfirm(picked)}
          >
            Use {picked.length} photo{picked.length === 1 ? "" : "s"}
          </Button>
        </div>
      </div>
    </div>
  );
}
