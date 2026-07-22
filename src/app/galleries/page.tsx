"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
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
import { PhotoCollage, StoryBand } from "@/components/SceneVisuals";
import { AnimatedChipRow, PageHeroCopy } from "@/components/PageMotion";
import type { GalleryEvent, GalleryMeta } from "@/lib/types";

const browseHints = [
  { label: "State", icon: "map" as const },
  { label: "City", icon: "pin" as const },
  { label: "School", icon: "school" as const },
  { label: "Year", icon: "calendar" as const },
];

export default function GalleriesPage() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");

  const metaQuery = useQuery({
    queryKey: ["events", "meta"],
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
    queryFn: () =>
      api.get<{ events: GalleryEvent[] }>(`/events/public${queryString}`),
  });

  const meta = metaQuery.data;
  const events = eventsQuery.data?.events ?? [];

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
      <Section>
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <PageHeroCopy
            eyebrow="Galleries"
            title="Past event photo galleries"
            detail="Finished teaching programs and school events — browse by state, city, school, or year."
          >
            <AnimatedChipRow items={browseHints} />
          </PageHeroCopy>
          <PhotoCollage images={["kidsSchool", "classroom", "kidsPlay"]} />
        </Container>
      </Section>

      <StoryBand
        image="teacherClass"
        eyebrow="Real classrooms"
        title="Every gallery is a window into a training day"
        detail="Browse photos from phonics workshops across schools — teachers practicing, children joining in, and moments that show literacy work in action."
        tone="soft"
      />

      <Section>
        <Container className="space-y-6">
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
            <Select value={school} onChange={(e) => setSchool(e.target.value)}>
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
              No past events found. Add a city, school, then an event with photos
              from Admin.
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
                    whileHover={{ rotate: 0, y: -10, scale: 1.03, zIndex: 2 }}
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
                            {event.schoolName ? ` · ${event.schoolName}` : ""}
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
        </Container>
      </Section>
    </div>
  );
}
