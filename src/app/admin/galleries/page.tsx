"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { useAuth } from "@/components/AuthProvider";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
  AdminListSkeleton,
} from "@/components/ui";
import { formatDate, placeLabel, eventBannerImage } from "@/lib/content";
import { api } from "@/lib/api";
import type { GalleryEvent, School } from "@/lib/types";

export default function AdminGalleriesPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const [eventTitle, setEventTitle] = useState("");
  const [eventContent, setEventContent] = useState("");
  const [eventSchoolId, setEventSchoolId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventYoutubeUrls, setEventYoutubeUrls] = useState<string[]>([""]);
  const [eventImages, setEventImages] = useState<File[]>([]);
  const [eventImagePreviews, setEventImagePreviews] = useState<string[]>([]);
  const [eventBannerIndex, setEventBannerIndex] = useState(0);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const urls = eventImages.map((file) => URL.createObjectURL(file));
    setEventImagePreviews(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [eventImages]);

  function addEventImages(files: FileList | null) {
    if (!files?.length) return;
    const incoming = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    setEventImages((prev) => {
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

  function removeEventImage(index: number) {
    setEventImages((prev) => prev.filter((_, i) => i !== index));
    setEventBannerIndex((prev) => {
      if (prev === index) return 0;
      if (prev > index) return prev - 1;
      return prev;
    });
  }

  const schoolsQuery = useQuery({
    queryKey: ["admin", "schools"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ schools: School[] }>("/schools", token),
  });

  const eventsQuery = useQuery({
    queryKey: ["admin", "events"],
    enabled: Boolean(token),
    queryFn: () => api.get<{ events: GalleryEvent[] }>("/events", token),
  });

  const schools = schoolsQuery.data?.schools ?? [];
  const events = eventsQuery.data?.events ?? [];

  const createEvent = useMutation({
    mutationFn: async () => {
      const youtubeUrls = eventYoutubeUrls
        .map((url) => url.trim())
        .filter(Boolean);
      if (eventImages.length === 0 && youtubeUrls.length === 0) {
        throw new Error(
          "Add at least one photo (or a YouTube link) for the gallery"
        );
      }
      const form = new FormData();
      form.append("title", eventTitle);
      form.append("content", eventContent);
      form.append("schoolId", eventSchoolId);
      if (eventDate) form.append("eventDate", eventDate);
      form.append("youtubeUrls", JSON.stringify(youtubeUrls));
      form.append("bannerIndex", String(eventBannerIndex));
      form.append("isPublished", "true");
      eventImages.forEach((file) => form.append("images", file));
      return api.post("/events", form, token);
    },
    onSuccess: async () => {
      setEventTitle("");
      setEventContent("");
      setEventDate("");
      setEventYoutubeUrls([""]);
      setEventImages([]);
      setEventBannerIndex(0);
      setFormError("");
      await queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => setFormError(error.message),
  });

  const deleteEvent = useMutation({
    mutationFn: (id: string) => api.delete(`/events/${id}`, undefined, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin", "events"] });
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return (
    <AdminShell
      title="Galleries"
      description="Step 2 — create a past-event gallery with photos, banner, and videos."
    >
      {formError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </p>
      ) : null}

      {schools.length === 0 ? (
        <Card className="space-y-3">
          <p className="text-sm text-muted">
            Add a city and school first, then come back to create a gallery.
          </p>
          <Button href="/admin/cities" variant="accent" size="sm">
            Go to Cities & schools
          </Button>
        </Card>
      ) : null}

      <Card>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            createEvent.mutate();
          }}
          className="space-y-3"
        >
          <h2 className="text-lg font-bold text-ink">Create gallery</h2>
          <p className="text-xs text-muted">
            Upload many photos (up to 30), pick a banner, and add YouTube
            session videos.
          </p>
          <Select
            value={eventSchoolId}
            onChange={(e) => setEventSchoolId(e.target.value)}
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
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-ink">
              YouTube session videos{" "}
              <span className="font-normal text-muted">(optional)</span>
            </p>
            {eventYoutubeUrls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  type="url"
                  placeholder={`YouTube link ${index + 1}`}
                  value={url}
                  onChange={(e) => {
                    const next = [...eventYoutubeUrls];
                    next[index] = e.target.value;
                    setEventYoutubeUrls(next);
                  }}
                />
                {eventYoutubeUrls.length > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setEventYoutubeUrls((prev) =>
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
              onClick={() => setEventYoutubeUrls((prev) => [...prev, ""])}
            >
              Add another video
            </Button>
          </div>

          <Textarea
            placeholder="Short note about this past event"
            value={eventContent}
            onChange={(e) => setEventContent(e.target.value)}
          />

          <div className="space-y-2">
            <p className="text-sm font-medium text-ink">
              Gallery photos{" "}
              <span className="font-normal text-muted">
                ({eventImages.length}/30 selected)
              </span>
            </p>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-background px-4 py-6 text-center hover:border-accent">
              <span className="text-sm font-semibold text-ink">Add photos</span>
              <span className="text-xs text-muted">
                Select multiple at once, or add more in another pick
              </span>
              <Input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => {
                  addEventImages(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>

            {eventImages.length > 0 ? (
              <>
                <p className="text-xs text-muted">
                  Click a photo to set it as the gallery banner card image.
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {eventImages.map((file, index) => {
                    const isBanner = eventBannerIndex === index;
                    return (
                      <div
                        key={`${file.name}-${file.lastModified}-${index}`}
                        className={`relative aspect-square overflow-hidden rounded-xl border bg-background ${
                          isBanner
                            ? "border-accent ring-2 ring-accent"
                            : "border-line"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setEventBannerIndex(index)}
                          className="absolute inset-0 z-0"
                          aria-label={`Use ${file.name} as banner`}
                        />
                        {eventImagePreviews[index] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={eventImagePreviews[index]}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                        {isBanner ? (
                          <span className="absolute left-1 top-1 z-10 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            Banner
                          </span>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => removeEventImage(index)}
                          className="absolute right-1 top-1 z-10 rounded-md bg-ink/80 px-1.5 py-0.5 text-[10px] font-semibold text-white"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-xs text-muted">
                Tip: hold Cmd (Mac) or Ctrl (Windows) to select many photos.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={createEvent.isPending || schools.length === 0}
          >
            {createEvent.isPending
              ? `Uploading ${eventImages.length} photo${eventImages.length === 1 ? "" : "s"}...`
              : "Create gallery"}
          </Button>
        </form>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-ink">All galleries</h2>
        {eventsQuery.isLoading ? (
          <AdminListSkeleton />
        ) : events.length === 0 ? (
          <p className="text-sm text-muted">No galleries yet.</p>
        ) : (
          <div className="space-y-3">
            {events.map((event) => {
              const banner = eventBannerImage(event);
              return (
                <Card
                  key={event._id}
                  className="flex flex-wrap items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {banner?.url ? (
                      <Image
                        src={banner.url}
                        alt={event.title}
                        width={56}
                        height={56}
                        className="h-14 w-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-soft text-xs text-muted">
                        N/A
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-ink">{event.title}</p>
                      <p className="text-sm text-muted">
                        {[
                          placeLabel(event.state, event.cityName),
                          event.schoolName,
                          formatDate(event.eventDate),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <Link
                        href={`/galleries/${event.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        /galleries/{event.slug}
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      href={`/admin/galleries/${event._id}`}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteEvent.mutate(event._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </AdminShell>
  );
}
