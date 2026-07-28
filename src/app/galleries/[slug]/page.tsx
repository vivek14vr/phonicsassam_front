"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { Card, Container, GalleryDetailSkeleton, Section } from "@/components/ui";
import { IconBadge } from "@/components/PitchIcon";
import { formatDate, placeLabel, youtubeVideoId } from "@/lib/content";
import { api } from "@/lib/api";
import type { GalleryEvent } from "@/lib/types";

function eventVideoUrls(event: GalleryEvent) {
  const urls = [
    ...(event.youtubeUrls ?? []),
    ...(event.youtubeUrl ? [event.youtubeUrl] : []),
  ];
  const ids = urls
    .map((url) => youtubeVideoId(url))
    .filter((id): id is string => Boolean(id));
  return [...new Set(ids)];
}

export default function GalleryEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { data, isLoading, error } = useQuery({
    queryKey: ["event", slug],
    queryFn: () => api.get<{ event: GalleryEvent }>(`/events/public/${slug}`),
  });

  if (isLoading) {
    return <GalleryDetailSkeleton />;
  }

  if (error) {
    return (
      <p className="section-shell py-16 text-red-700">
        {(error as Error).message}
      </p>
    );
  }

  const event = data!.event;
  const videoIds = eventVideoUrls(event);

  return (
    <div className="bg-background">
      <Section className="border-b border-line pt-28 pb-6 sm:pt-32 sm:pb-8 md:pt-36">
        <Container className="space-y-3">
          <Link
            href="/galleries"
            className="text-sm font-semibold text-accent hover:underline"
          >
            ← All galleries
          </Link>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Past event
          </p>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-2 pt-1">
            {placeLabel(event.state, event.cityName) ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
                <IconBadge name="pin" size="sm" className="shadow-none" />
                <span className="text-sm text-ink">
                  {placeLabel(event.state, event.cityName)}
                </span>
              </div>
            ) : null}
            {event.schoolName ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
                <IconBadge name="school" size="sm" className="shadow-none" />
                <span className="text-sm text-ink">{event.schoolName}</span>
              </div>
            ) : null}
            {formatDate(event.eventDate) ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
                <IconBadge name="calendar" size="sm" className="shadow-none" />
                <span className="text-sm text-ink">
                  {formatDate(event.eventDate)}
                </span>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-8">
          {event.content ? (
            <Card className="whitespace-pre-wrap leading-8 text-foreground/90">
              {event.content}
            </Card>
          ) : null}

          {videoIds.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <IconBadge name="play" size="sm" />
                <h2 className="font-display text-xl font-semibold text-ink">
                  Session videos
                </h2>
              </div>
              <div className="space-y-4">
                {videoIds.map((videoId, index) => (
                  <div
                    key={videoId}
                    className="overflow-hidden rounded-2xl border border-line bg-ink"
                  >
                    <p className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
                      Session {index + 1}
                    </p>
                    <div className="relative aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${event.title} session ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {event.images.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <IconBadge name="camera" size="sm" />
                <h2 className="font-display text-xl font-semibold text-ink">
                  Event photos
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {event.images.map((image) => (
                  <div
                    key={image.publicId}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-soft"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : videoIds.length === 0 ? (
            <p className="text-muted">No photos or video in this gallery yet.</p>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}
