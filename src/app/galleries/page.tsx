"use client";

import { Suspense, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  Container,
  EmptyState,
  GalleryGridSkeleton,
  Select,
  Section,
} from "@/components/ui";
import { formatDate, placeLabel, eventBannerImage } from "@/lib/content";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { polaroidDrop, viewportOnce } from "@/lib/motion";
import { AnimatedChipRow } from "@/components/PageMotion";
import type { CommonGalleryImage, GalleryEvent, GalleryMeta } from "@/lib/types";

const browseHints = [
  { label: "State", icon: "map" as const },
  { label: "City", icon: "pin" as const },
  { label: "School", icon: "school" as const },
  { label: "Year", icon: "calendar" as const },
];

type GalleryTab = "common" | "location";

export default function GalleriesPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-background py-16">
          <Container>
            <GalleryGridSkeleton />
          </Container>
        </div>
      }
    >
      <GalleriesPageContent />
    </Suspense>
  );
}

function GalleriesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const tab: GalleryTab = tabParam === "location" ? "location" : "common";

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [lightbox, setLightbox] = useState<CommonGalleryImage | null>(null);

  function setTab(next: GalleryTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (next === "common") {
      params.set("tab", "common");
    } else {
      params.set("tab", "location");
    }
    const qs = params.toString();
    router.replace(qs ? `/galleries?${qs}` : "/galleries", { scroll: false });
  }

  const commonQuery = useQuery({
    queryKey: ["common-gallery", "public"],
    enabled: tab === "common",
    queryFn: () =>
      api.get<{ images: CommonGalleryImage[] }>("/common-gallery/public"),
  });

  const metaQuery = useQuery({
    queryKey: ["events", "meta"],
    enabled: tab === "location",
    queryFn: () => api.get<GalleryMeta>("/events/public/meta"),
  });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (city) params.set("city", city);
    if (school) params.set("school", school);
    if (year) params.set("year", year);
    const value = params.toString();
    return value ? `?${value}` : "";
  }, [state, city, school, year]);

  const eventsQuery = useQuery({
    queryKey: ["events", "public", state, city, school, year],
    enabled: tab === "location",
    queryFn: () =>
      api.get<{ events: GalleryEvent[] }>(`/events/public${queryString}`),
  });

  const meta = metaQuery.data;
  const events = eventsQuery.data?.events ?? [];
  const commonImages = commonQuery.data?.images ?? [];

  const cities = useMemo(() => {
    if (!meta?.placePairs) return meta?.cities ?? [];
    return [
      ...new Set(
        meta.placePairs
          .filter((place) => !state || place.state === state)
          .map((place) => place.city)
      ),
    ].sort();
  }, [meta, state]);

  return (
    <div className="bg-background">
      <Section className="pt-28 pb-8 sm:pt-32 sm:pb-10 md:pt-36">
        <Container className="space-y-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Galleries
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {tab === "common"
                  ? "Common Gallery"
                  : "Past event photo galleries"}
              </h1>
              <p className="text-sm leading-6 text-muted sm:text-base">
                {tab === "common"
                  ? "Shared photos from classrooms and training days — not tied to a single school."
                  : "Browse finished teaching programs by state, city, school, or year."}
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Gallery type"
              className="inline-flex shrink-0 self-start rounded-xl border border-line bg-white p-1 shadow-sm sm:self-auto"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "common"}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === "common"
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-soft"
                }`}
                onClick={() => setTab("common")}
              >
                Common Gallery
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "location"}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  tab === "location"
                    ? "bg-accent text-white"
                    : "text-ink hover:bg-soft"
                }`}
                onClick={() => setTab("location")}
              >
                By Location
              </button>
            </div>
          </div>

          {tab === "common" ? (
            <div className="space-y-4">
              {commonQuery.isLoading ? (
                <GalleryGridSkeleton />
              ) : commonQuery.error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {(commonQuery.error as Error).message}
                </p>
              ) : commonImages.length === 0 ? (
                <EmptyState>
                  No common gallery images yet. Upload them from Admin → Common
                  Gallery.
                </EmptyState>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
                  {commonImages.map((image, i) => (
                    <motion.button
                      key={image._id}
                      type="button"
                      custom={i % 6}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportOnce}
                      variants={polaroidDrop}
                      whileHover={{ y: -6, rotate: i % 2 === 0 ? -2 : 2, scale: 1.02 }}
                      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-soft text-left"
                      onClick={() => setLightbox(image)}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt || "Common gallery photo"}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <AnimatedChipRow items={browseHints} />

              <div className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
                <Select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                >
                  <option value="">All states</option>
                  {(meta?.states ?? []).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                <Select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">All cities</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                <Select
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                >
                  <option value="">All schools</option>
                  {(meta?.schools ?? []).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
                <Select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">All years</option>
                  {(meta?.years ?? []).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>

              {(state || city || school || year) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setState("");
                    setCity("");
                    setSchool("");
                    setYear("");
                  }}
                >
                  Clear filters
                </Button>
              )}

              {eventsQuery.isLoading ? (
                <GalleryGridSkeleton />
              ) : eventsQuery.error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                  {(eventsQuery.error as Error).message}
                </p>
              ) : events.length === 0 ? (
                <EmptyState>
                  No past events found. Add a city, school, then an event with
                  photos from Admin.
                </EmptyState>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {events.map((event, i) => {
                    const banner = eventBannerImage(event);
                    return (
                      <motion.div
                        key={event._id}
                        custom={i % 6}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        variants={polaroidDrop}
                        whileHover={{
                          rotate: i % 2 === 0 ? -2.5 : 2.5,
                          y: -10,
                          scale: 1.03,
                          zIndex: 2,
                        }}
                        className="origin-bottom"
                      >
                        <Link
                          href={`/galleries/${event.slug}`}
                          className="block h-full"
                        >
                          <Card
                            padded={false}
                            className="h-full overflow-hidden border-2 border-ink/10 bg-white p-2 shadow-[6px_6px_0_0_rgba(182,106,203,0.18)]"
                          >
                            <div className="relative aspect-[5/4] overflow-hidden bg-soft">
                              {banner?.url ? (
                                <motion.div
                                  className="absolute inset-0"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <Image
                                    src={banner.url}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                  />
                                </motion.div>
                              ) : (
                                <div className="relative h-full">
                                  <Image
                                    src="/scenes/kids-school.jpg"
                                    alt=""
                                    fill
                                    className="object-cover opacity-90"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="space-y-2 p-4">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                                Past event
                              </p>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription>
                                {placeLabel(event.state, event.cityName)}
                                {event.schoolName
                                  ? ` · ${event.schoolName}`
                                  : ""}
                              </CardDescription>
                              {formatDate(event.eventDate) ? (
                                <p className="text-sm text-muted">
                                  {formatDate(event.eventDate)}
                                </p>
                              ) : null}
                            </div>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Container>
      </Section>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || "Photo"}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-semibold text-ink"
            onClick={() => setLightbox(null)}
          >
            Close
          </button>
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.alt || "Common gallery photo"}
              className="mx-auto max-h-[90vh] w-auto object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
