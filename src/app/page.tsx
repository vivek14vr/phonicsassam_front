"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DEFAULT_HERO_SHOWCASE, HeroShowcase } from "@/components/HeroShowcase";
import { SketchHeadline } from "@/components/SketchHeadline";
import { CountUpStat } from "@/components/CountUpStat";
import { IconBadge } from "@/components/PitchIcon";
import {
  ScenePhoto,
  StoryBand,
  ClassroomCtaBand,
} from "@/components/SceneVisuals";
import { HomeVideoSection } from "@/components/YouTubeEmbed";
import type { PitchIconName } from "@/lib/workshopPitch";
import type { SiteImageKey } from "@/lib/siteImages";
import { projectStory } from "@/lib/projectStory";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  Container,
  EmptyState,
  GalleryGridSkeleton,
  Section,
  SectionHeader,
} from "@/components/ui";
import { formatDate, placeLabel, eventBannerImage } from "@/lib/content";
import { api } from "@/lib/api";
import {
  easeOut,
  polaroidDrop,
  skewIn,
  stickerSlap,
  staggerStickers,
  viewportOnce,
} from "@/lib/motion";
import type {
  CommonGalleryImage,
  GalleryEvent,
  HeroShowcaseContent,
} from "@/lib/types";

const MOSAIC_LIMIT = 5;
const LOCATION_EVENTS_LIMIT = 3;

function pickRandomEvents(events: GalleryEvent[], limit: number) {
  const copy = [...events];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, limit);
}

/** 4-col pack: one tall left tile + four small tiles — no empty cells. */
const mosaicSpans = [
  "col-span-2 row-span-2 min-h-[11rem] sm:min-h-[13rem]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[4/3]",
];

const teasers: {
  eyebrow: string;
  title: string;
  detail: string;
  href: string;
  cta: string;
  icon: PitchIconName;
  image: SiteImageKey;
}[] = [
  {
    eyebrow: "Galleries",
    title: "See classrooms come alive",
    detail:
      "Photos from training days and school visits — songs, stories, actions, and phonics in real government classrooms.",
    href: "/galleries?tab=common",
    cta: "Browse Galleries",
    icon: "camera",
    image: "kidsSchool",
  },
  {
    eyebrow: "About Our Journey",
    title: "How Phonics Assam began",
    detail:
      "From a 2022 vision with Komal Goenka and Ramesh Jain to a statewide literacy movement for confident young readers.",
    href: "/about",
    cta: "Read the Story",
    icon: "teacher",
    image: "teacherClass",
  },
  {
    eyebrow: "Reading Success",
    title: "See confidence take shape",
    detail:
      "Authentic classroom moments from Assam — children who once struggled with letters now reading with confidence.",
    href: "/reading-success",
    cta: "Reading Success",
    icon: "play",
    image: "kidsLearning",
  },
];

const journeyBeats: {
  title: string;
  detail: string;
  icon: PitchIconName;
}[] = [
  {
    title: "The challenge we met",
    detail: projectStory.challenge,
    icon: "school",
  },
  {
    title: "An opportunity to act",
    detail: `${projectStory.opportunity} ${projectStory.pilot}`,
    icon: "bulb",
  },
  {
    title: "A statewide movement",
    detail: `${projectStory.growth} ${projectStory.today}`,
    icon: "steps",
  },
];

export default function HomePage() {
  const mosaicQuery = useQuery({
    queryKey: ["common-gallery", "random", MOSAIC_LIMIT],
    queryFn: () =>
      api.get<{ images: CommonGalleryImage[] }>(
        `/common-gallery/public/random?limit=${MOSAIC_LIMIT}`
      ),
  });

  const eventsQuery = useQuery({
    queryKey: ["events", "home", "location"],
    queryFn: () => api.get<{ events: GalleryEvent[] }>("/events/public"),
  });

  const settingsQuery = useQuery({
    queryKey: ["settings", "public"],
    queryFn: () =>
      api.get<{ heroShowcase: HeroShowcaseContent }>("/settings/public"),
  });

  const mosaicImages = mosaicQuery.data?.images ?? [];
  const locationEvents = useMemo(
    () =>
      pickRandomEvents(
        eventsQuery.data?.events ?? [],
        LOCATION_EVENTS_LIMIT
      ),
    [eventsQuery.data?.events]
  );
  const heroShowcase = settingsQuery.data?.heroShowcase ?? DEFAULT_HERO_SHOWCASE;

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden bg-background pt-28 sm:pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(182,106,203,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(182,106,203,0.08),_transparent_50%)]" />
          <motion.div
            className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 top-10 h-80 w-80 rounded-full bg-accent/8 blur-3xl"
            animate={{ x: [0, -24, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative grid items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-14 lg:pb-20">
          <div className="space-y-7">
            <motion.p
              initial={{ opacity: 0, x: -24, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent"
            >
              Phonics Assam · Since {projectStory.foundedYear}
            </motion.p>

            <SketchHeadline
              words={[
                "Every",
                "child",
                "in",
                "Assam",
                "deserves",
                "to",
                "read",
                "with",
                "confidence.",
              ]}
              accentWord="confidence."
              className="font-display max-w-xl text-[clamp(2.2rem,4.6vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-ink"
            />

            <motion.p
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
              className="max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8"
            >
              {projectStory.belief} Led by {projectStory.founders}, the mission
              builds strong reading skills in the foundational years through
              teacher capacity building and classroom implementation.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.75,
                type: "spring",
                stiffness: 240,
                damping: 18,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.04, rotate: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button href="/galleries" variant="accent" size="lg">
                  Browse Galleries
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.04, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button href="/about" variant="outline" size="lg">
                  About the Project
                </Button>
              </motion.div>
            </motion.div>

            <div className="flex flex-wrap gap-6 border-t border-line pt-6 sm:gap-10">
              {projectStory.impact.slice(1).map((stat) => (
                <CountUpStat
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>

          <motion.div
            className="pb-8 lg:pb-4"
            initial={{ opacity: 0, rotateY: -18, x: 48 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
            style={{ perspective: 1200 }}
          >
            <HeroShowcase content={heroShowcase} />
          </motion.div>
        </Container>
      </section>

      <Section className="py-10 sm:py-12">
        <Container className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader
              className="space-y-1.5"
              eyebrow="Common Gallery"
              title="Moments from the classrooms"
              description="A fresh mix of shared photos — reshuffled each visit."
            />
            <div className="flex flex-wrap gap-2">
              <Button href="/galleries?tab=common" variant="accent" size="sm">
                View common gallery
              </Button>
            </div>
          </div>

          {mosaicQuery.isLoading ? (
            <GalleryGridSkeleton count={4} />
          ) : mosaicQuery.error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {(mosaicQuery.error as Error).message}
            </p>
          ) : mosaicImages.length === 0 ? (
            <EmptyState>
              No common gallery photos yet. Upload them from Admin → Common
              Gallery.
            </EmptyState>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-2">
              {mosaicImages.slice(0, MOSAIC_LIMIT).map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, scale: 0.94, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 24,
                    delay: index * 0.03,
                  }}
                  whileHover={{ scale: 1.015, zIndex: 2 }}
                  className={`relative overflow-hidden rounded-xl border border-line bg-soft ${
                    mosaicSpans[index] ?? "aspect-[4/3]"
                  }`}
                >
                  <Link
                    href="/galleries?tab=common"
                    className="absolute inset-0 block"
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || "Classroom moment"}
                      fill
                      className="object-cover"
                      sizes={
                        index === 0
                          ? "(max-width: 640px) 100vw, 40vw"
                          : "(max-width: 640px) 50vw, 20vw"
                      }
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section id="location-galleries" className="py-10 sm:py-12">
        <Container className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <SectionHeader
              className="space-y-1.5"
              eyebrow="By location"
              title="Past event galleries"
              description="A few school workshops and training days from across the map."
            />
            <Button href="/galleries?tab=location" variant="outline" size="sm">
              View all locations
            </Button>
          </div>

          {eventsQuery.isLoading ? (
            <GalleryGridSkeleton count={3} />
          ) : eventsQuery.error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {(eventsQuery.error as Error).message}
            </p>
          ) : locationEvents.length === 0 ? (
            <EmptyState>
              No location galleries yet. Add a city, school, and event with
              photos from Admin.
            </EmptyState>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {locationEvents.map((event, i) => {
                const banner = eventBannerImage(event);
                return (
                  <motion.div
                    key={event._id}
                    custom={i}
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
                            <Image
                              src={banner.url}
                              alt={event.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <Image
                              src="/scenes/classroom.jpg"
                              alt=""
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
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

      <HomeVideoSection
        url="https://youtu.be/EztOWHk1mUE"
        eyebrow="Watch"
        title="See the mission in motion"
        detail="A look at how classrooms come alive with structured phonics — and how children grow into confident readers."
      />

      <StoryBand
        image="school"
        eyebrow="About the Project"
        title="It all began with a simple vision"
        detail={`${projectStory.belief} In ${projectStory.foundedYear}, ${projectStory.founders} embarked on a mission to give every child in Assam a structured path to reading.`}
        tone="page"
      />

      <Section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="The journey"
            title="From six schools to a literacy movement"
            description={projectStory.pilot}
          />
          <motion.div
            className="grid gap-4 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerStickers}
          >
            {journeyBeats.map((beat, i) => (
              <motion.div
                key={beat.title}
                variants={stickerSlap}
                whileHover={{ y: -6, rotate: i % 2 ? 1 : -1 }}
                className="rounded-2xl border border-line bg-white p-5 shadow-[4px_4px_0_0_rgba(182,106,203,0.12)]"
              >
                <IconBadge name={beat.icon} size="sm" className="mb-3" />
                <h3 className="font-display text-xl font-semibold text-ink">
                  {beat.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted">{beat.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <StoryBand
        image="kidsRead"
        eyebrow="In the classroom"
        title="Songs, stories, actions, and phonics"
        detail={projectStory.classroomMoments}
        align="right"
        tone="page"
      />

      <Section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Impact today"
            title="Phonics Assam by the numbers"
            description={projectStory.today}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projectStory.impact.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-white p-5"
              >
                <CountUpStat value={stat.value} label={stat.label} />
                <p className="mt-3 text-sm leading-6 text-muted">{stat.detail}</p>
              </div>
            ))}
          </div>
          <p className="max-w-3xl text-base leading-7 text-muted">
            {projectStory.visionClose}
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="space-y-10">
          <SectionHeader
            eyebrow="Explore"
            title="Continue the mission with us"
            description="See classroom moments, learn the story, and explore reading success across Assam."
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {teasers.map((teaser, i) => (
              <motion.div
                key={teaser.href}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                variants={skewIn}
                whileHover={{
                  x: 6,
                  borderColor: "rgba(182,106,203,0.45)",
                }}
              >
                <Card
                  padded={false}
                  className="flex h-full flex-col overflow-hidden border-l-4 border-l-accent"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-soft">
                    <ScenePhoto
                      image={teaser.image}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <IconBadge name={teaser.icon} size="sm" className="mb-1" />
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                      {teaser.eyebrow}
                    </p>
                    <CardTitle className="mt-3">{teaser.title}</CardTitle>
                    <CardDescription className="mt-2 flex-1">
                      {teaser.detail}
                    </CardDescription>
                    <div className="mt-5">
                      <Button href={teaser.href} variant="outline" size="sm">
                        {teaser.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <ClassroomCtaBand
        eyebrow="The vision continues"
        title={projectStory.closingLine}
        detail={projectStory.visionClose}
        primaryHref="/galleries?tab=common"
        primaryLabel="See classroom moments"
        secondaryHref="/about"
        secondaryLabel="Read the full story"
      />
    </div>
  );
}
