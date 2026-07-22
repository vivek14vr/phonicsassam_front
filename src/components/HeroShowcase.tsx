"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMemo, useRef, useState, type MouseEvent } from "react";
import { easeOut } from "@/lib/motion";
import type { HeroShowcaseContent, HeroShowcaseImage } from "@/lib/types";

const FALLBACK_TONES = [
  "bg-[#f4b4e0]",
  "bg-[#c9b6ff]",
  "bg-[#9ad7f5]",
  "bg-[#ffd6a5]",
  "bg-[#b8f2c9]",
  "bg-[#ffb3c6]",
];

export const DEFAULT_HERO_SHOWCASE: HeroShowcaseContent = {
  brandEyebrow: "Sketchy Phonics",
  title: "Past event galleries",
  badgeLabel: "Public",
  galleryTitle: "Assam Workshop 2025",
  gallerySubtitle: "Guwahati · Govt. Girls High School",
  photoCountLabel: "142 photos",
  mosaicImages: [],
  places: [
    {
      name: "Assam",
      count: "48 events",
      galleryTitle: "Assam Workshop 2025",
      gallerySubtitle: "Guwahati · Govt. Girls High School",
      photoCountLabel: "142 photos",
      images: [],
    },
    {
      name: "Maharashtra",
      count: "36 events",
      galleryTitle: "Maharashtra Training",
      gallerySubtitle: "Mumbai · Municipal School",
      photoCountLabel: "98 photos",
      images: [],
    },
    {
      name: "Rajasthan",
      count: "22 events",
      galleryTitle: "Rajasthan Workshop",
      gallerySubtitle: "Jaipur · Govt. School",
      photoCountLabel: "64 photos",
      images: [],
    },
  ],
  browseEyebrow: "Browse by",
  browseLabel: "State · City · School · Year",
  browseCtaLabel: "Open",
  browseCtaHref: "/galleries",
  featuredEyebrow: "Featured event",
  featuredTitle: "Phonics Training Day",
  featuredDescription:
    "Classroom moments from teacher training across government schools.",
};

function mosaicFromImages(images: HeroShowcaseImage[] | undefined) {
  const list = (images || []).filter((img) => img.url).slice(0, 6);
  return Array.from({ length: 6 }, (_, index) => {
    const image = list[index];
    if (image?.url) return { image, tone: FALLBACK_TONES[index] };
    return { image: null, tone: FALLBACK_TONES[index] };
  });
}

export function HeroShowcase({
  content = DEFAULT_HERO_SHOWCASE,
}: {
  content?: HeroShowcaseContent | null;
}) {
  const data = { ...DEFAULT_HERO_SHOWCASE, ...content };
  const places = data.places?.length ? data.places : DEFAULT_HERO_SHOWCASE.places;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 18,
  });
  const glareX = useTransform(mx, [-0.5, 0.5], [20, 80]);
  const glareY = useTransform(my, [-0.5, 0.5], [20, 80]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45), transparent 55%)`;

  const selected = places[Math.min(selectedIndex, places.length - 1)] || places[0];
  const galleryTitle = selected?.galleryTitle?.trim() || data.galleryTitle;
  const gallerySubtitle =
    selected?.gallerySubtitle?.trim() || data.gallerySubtitle;
  const photoCountLabel =
    selected?.photoCountLabel?.trim() || data.photoCountLabel;

  const tiles = useMemo(() => {
    const placeImages = selected?.images?.filter((img) => img.url) || [];
    if (placeImages.length) return mosaicFromImages(placeImages);
    return mosaicFromImages(data.mosaicImages);
  }, [selected, data.mosaicImages]);

  function onMove(e: MouseEvent) {
    if (reduce || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none" style={{ perspective: 1200 }}>
      <div className="pointer-events-none absolute -right-6 -top-8 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
      <div className="pointer-events-none absolute bottom-8 left-4 h-28 w-28 rounded-full bg-accent/15 blur-2xl" />

      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl border border-line bg-white p-4 shadow-[0_24px_80px_-24px_rgba(182,106,203,0.45)] sm:p-5"
      >
        {!reduce ? (
          <motion.div
            aria-hidden
            style={{ background: glare }}
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-60 mix-blend-overlay"
          />
        ) : null}

        <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {data.brandEyebrow}
            </p>
            <p className="text-sm font-semibold text-ink">{data.title}</p>
          </div>
          {data.badgeLabel ? (
            <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              {data.badgeLabel}
            </span>
          ) : null}
        </div>

        <div className="relative z-10 overflow-hidden rounded-2xl border border-line bg-soft/70">
          <div className="flex items-center justify-between gap-3 border-b border-line px-3 py-2.5">
            <div className="min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryTitle + gallerySubtitle}
                  initial={{ opacity: 0, filter: "blur(6px)", x: 12 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(6px)", x: -12 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                >
                  <p className="truncate text-sm font-semibold text-ink">
                    {galleryTitle}
                  </p>
                  <p className="truncate text-xs text-muted">{gallerySubtitle}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="shrink-0 text-xs font-medium text-muted">
              {photoCountLabel}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-2.5">
            {tiles.map((tile, index) => (
              <motion.div
                key={`${selectedIndex}-${index}-${tile.image?.url || "empty"}`}
                initial={{ opacity: 0, scale: 0.7, rotate: index % 2 ? 8 : -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                  delay: index * 0.05,
                }}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0
                    ? "col-span-2 row-span-2 min-h-[7.5rem]"
                    : "aspect-[4/3]"
                } ${tile.image ? "bg-soft" : tile.tone}`}
              >
                {tile.image?.url ? (
                  <Image
                    src={tile.image.url}
                    alt={tile.image.alt || galleryTitle}
                    fill
                    className="object-cover"
                    sizes={index === 0 ? "280px" : "100px"}
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>

        {places.length ? (
          <div className="relative z-10 mt-4 flex flex-wrap gap-2">
            {places.map((place, index) => {
              const active = index === selectedIndex;
              return (
                <motion.button
                  key={`${place.name}-${index}`}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative overflow-hidden rounded-full border px-3 py-1.5 text-xs ${
                    active
                      ? "border-accent text-white"
                      : "border-line bg-white text-ink hover:border-accent/40"
                  }`}
                >
                  {active ? (
                    <motion.span
                      layoutId="hero-place-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 420, damping: 28 }}
                    />
                  ) : null}
                  <span className="relative z-10 font-semibold">{place.name}</span>
                  {place.count ? (
                    <span
                      className={`relative z-10 ml-1.5 ${active ? "text-white/85" : "text-muted"}`}
                    >
                      {place.count}
                    </span>
                  ) : null}
                </motion.button>
              );
            })}
          </div>
        ) : null}

        <div className="relative z-10 mt-4 flex items-center justify-between rounded-xl border border-line bg-soft/80 px-3 py-2.5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              {data.browseEyebrow}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-ink">
              {data.browseLabel}
            </p>
          </div>
          <Link
            href={data.browseCtaHref || "/galleries"}
            className="rounded-lg bg-accent px-2.5 py-1.5 text-xs font-semibold text-white"
          >
            {data.browseCtaLabel}
          </Link>
        </div>

        <div className="relative z-10 mt-4 border-t border-line pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
            {data.featuredEyebrow}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink sm:text-base">
            {data.featuredTitle}
          </p>
          <p className="mt-1 text-xs leading-5 text-muted sm:text-sm sm:leading-6">
            {data.featuredDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
