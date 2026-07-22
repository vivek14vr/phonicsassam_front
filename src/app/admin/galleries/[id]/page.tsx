"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import { MediaPicker } from "@/components/MediaPicker";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
  AdminFormSkeleton,
} from "@/components/ui";
import { api } from "@/lib/api";
import type {
  EventImage,
  GalleryEvent,
  HeroShowcaseImage,
  School,
} from "@/lib/types";

function schoolIdOf(event: GalleryEvent) {
  return typeof event.school === "object" ? event.school._id : event.school;
}

function toDateInput(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function AdminEditGalleryPage() {
  const { token } = useAuth();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const eventId = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([""]);
  const [existingImages, setExistingImages] = useState<EventImage[]>([]);
  const [removedPublicIds, setRemovedPublicIds] = useState<string[]>([]);
  const [bannerPublicId, setBannerPublicId] = useState("");
  const [libraryImages, setLibraryImages] = useState<HeroShowcaseImage[]>([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const eventQuery = useQuery({
    queryKey: ["admin", "event", eventId],
    enabled: Boolean(token && eventId),
    queryFn: () => api.get<{ event: GalleryEvent }>(`/events/${eventId}`, token),
  });

  const schoolsQuery = useQuery({
    queryKey: ["admin", "schools"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ schools: School[] }>("/schools", token),
  });

  useEffect(() => {
    const event = eventQuery.data?.event;
    if (!event || hydrated) return;
    setTitle(event.title);
    setContent(event.content || "");
    setSchoolId(schoolIdOf(event));
    setEventDate(toDateInput(event.eventDate));
    const urls = event.youtubeUrls?.length
      ? event.youtubeUrls
      : event.youtubeUrl
        ? [event.youtubeUrl]
        : [""];
    setYoutubeUrls(urls.length ? urls : [""]);
    setExistingImages(event.images || []);
    const banner =
      event.images?.find((image) => image.isBanner)?.publicId ||
      event.images?.[0]?.publicId ||
      "";
    setBannerPublicId(banner);
    setHydrated(true);
  }, [eventQuery.data, hydrated]);

  const visibleExisting = useMemo(
    () =>
      existingImages.filter(
        (image) => !removedPublicIds.includes(image.publicId)
      ),
    [existingImages, removedPublicIds]
  );

  const updateEvent = useMutation({
    mutationFn: async () => {
      const cleanedVideos = youtubeUrls.map((url) => url.trim()).filter(Boolean);
      if (
        visibleExisting.length === 0 &&
        libraryImages.length === 0 &&
        cleanedVideos.length === 0
      ) {
        throw new Error("Keep at least one photo or YouTube link");
      }

      const form = new FormData();
      form.append("title", title);
      form.append("content", content);
      form.append("schoolId", schoolId);
      form.append("eventDate", eventDate || "");
      form.append("youtubeUrls", JSON.stringify(cleanedVideos));
      form.append("removeImagePublicIds", JSON.stringify(removedPublicIds));
      if (bannerPublicId) form.append("bannerPublicId", bannerPublicId);
      form.append("libraryImages", JSON.stringify(libraryImages));
      return api.put<{ event: GalleryEvent }>(`/events/${eventId}`, form, token);
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      await queryClient.invalidateQueries({ queryKey: ["admin", "event", eventId] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      await queryClient.invalidateQueries({
        queryKey: ["event", data.event.slug],
      });
      router.push("/admin/galleries");
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const schools = schoolsQuery.data?.schools ?? [];

  return (
    <AdminShell
      title="Edit gallery"
      description="Update title, school, date, videos, banner, and photos."
    >
      <div className="flex flex-wrap gap-2">
        <Button href="/admin/galleries" variant="outline" size="sm">
          ← Back to galleries
        </Button>
        {eventQuery.data?.event?.slug ? (
          <Button
            href={`/galleries/${eventQuery.data.event.slug}`}
            variant="outline"
            size="sm"
          >
            View public page
          </Button>
        ) : null}
      </div>

      {formError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      {eventQuery.isLoading ? (
        <AdminFormSkeleton />
      ) : eventQuery.error ? (
        <p className="text-red-700">{(eventQuery.error as Error).message}</p>
      ) : (
        <Card>
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              updateEvent.mutate();
            }}
            className="space-y-3"
          >
            <Select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              required
            >
              <option value="">Select school</option>
              {schools.map((school) => {
                const city =
                  typeof school.city === "object" ? school.city : null;
                return (
                  <option key={school._id} value={school._id}>
                    {school.name}
                    {city ? ` · ${city.name}, ${city.state}` : ""}
                  </option>
                );
              })}
            </Select>

            <Input
              placeholder="Gallery / event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">
                YouTube session videos
              </p>
              {youtubeUrls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="url"
                    placeholder={`YouTube link ${index + 1}`}
                    value={url}
                    onChange={(e) => {
                      const next = [...youtubeUrls];
                      next[index] = e.target.value;
                      setYoutubeUrls(next);
                    }}
                  />
                  {youtubeUrls.length > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setYoutubeUrls((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setYoutubeUrls((prev) => [...prev, ""])}
              >
                Add another video
              </Button>
            </div>

            <Textarea
              placeholder="Short note about this past event"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">Current photos</p>
              <p className="text-xs text-muted">
                Click a photo to set it as banner. Remove any you don’t want.
              </p>
              {visibleExisting.length === 0 ? (
                <p className="text-sm text-muted">No saved photos left.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {visibleExisting.map((image) => {
                    const isBanner = bannerPublicId === image.publicId;
                    return (
                      <div
                        key={image.publicId}
                        className={`relative aspect-square overflow-hidden rounded-xl border ${
                          isBanner
                            ? "border-accent ring-2 ring-accent"
                            : "border-line"
                        }`}
                      >
                        <button
                          type="button"
                          className="absolute inset-0 z-0"
                          onClick={() => setBannerPublicId(image.publicId)}
                          aria-label="Set as banner"
                        />
                        <Image
                          src={image.url}
                          alt={image.alt || title}
                          fill
                          className="object-cover"
                          sizes="120px"
                        />
                        {isBanner ? (
                          <span className="absolute left-1 top-1 z-10 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            Banner
                          </span>
                        ) : null}
                        <button
                          type="button"
                          className="absolute right-1 top-1 z-10 rounded-md bg-ink/80 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                          onClick={() => {
                            setRemovedPublicIds((prev) => [
                              ...prev,
                              image.publicId,
                            ]);
                            if (bannerPublicId === image.publicId) {
                              const next = visibleExisting.find(
                                (item) => item.publicId !== image.publicId
                              );
                              setBannerPublicId(next?.publicId || "");
                            }
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-ink">
                Add more photos{" "}
                <span className="font-normal text-muted">
                  ({libraryImages.length} new)
                </span>
              </p>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-background px-4 py-6 text-center hover:border-accent"
              >
                <span className="text-sm font-semibold text-ink">Add photos</span>
                <span className="text-xs text-muted">
                  Open Cloudinary library — pick existing or upload new
                </span>
              </button>
              {libraryImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {libraryImages.map((image) => (
                    <div
                      key={image.publicId}
                      className="relative aspect-square overflow-hidden rounded-xl border border-line"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || title}
                        fill
                        className="object-cover"
                        sizes="120px"
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-md bg-ink/80 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                        onClick={() =>
                          setLibraryImages((prev) =>
                            prev.filter((item) => item.publicId !== image.publicId)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button type="submit" disabled={updateEvent.isPending}>
                {updateEvent.isPending ? "Saving..." : "Save changes"}
              </Button>
              <Button href="/admin/galleries" variant="outline">
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <MediaPicker
        open={pickerOpen}
        title="Add gallery photos"
        maxSelect={Math.max(1, 30 - visibleExisting.length)}
        selected={libraryImages}
        onClose={() => setPickerOpen(false)}
        onConfirm={(images) => {
          const blocked = new Set(visibleExisting.map((img) => img.publicId));
          setLibraryImages(
            images.filter((img) => !blocked.has(img.publicId)).slice(0, 30)
          );
          setPickerOpen(false);
        }}
      />
    </AdminShell>
  );
}
