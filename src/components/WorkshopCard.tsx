"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Program } from "@/lib/types";
import { stickerSlap, viewportOnce } from "@/lib/motion";

function MetaRow({
  icon,
  label,
}: {
  icon: "date" | "schedule" | "venue";
  label: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-muted">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-accent">
        {icon === "date" ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
          </svg>
        ) : null}
        {icon === "schedule" ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
        {icon === "venue" ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        ) : null}
      </span>
      <span>{label}</span>
    </div>
  );
}

export function WorkshopCard({
  workshop,
  index = 0,
}: {
  workshop: Program;
  index?: number;
}) {
  const ctaHref = workshop.ctaHref?.trim() || "#";
  const ctaLabel = workshop.ctaLabel?.trim() || "Know More";
  const tilt = index % 2 === 0 ? -1.25 : 1.25;

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stickerSlap}
      custom={index}
      whileHover={{
        y: -10,
        rotate: 0,
        scale: 1.02,
        boxShadow: "8px 8px 0 0 rgba(182,106,203,0.35)",
      }}
      className="flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink/20 bg-white shadow-[5px_5px_0_0_rgba(17,17,17,0.08)]"
      style={{ rotate: tilt }}
    >
      <div className="space-y-3 p-4 pb-0">
        {workshop.badge ? (
          <motion.span
            initial={{ scale: 0, rotate: -12 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 400, damping: 14, delay: 0.15 }}
            className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white"
          >
            {workshop.badge}
          </motion.span>
        ) : null}
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-soft">
          {workshop.coverImage?.url ? (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                src={workshop.coverImage.url}
                alt={workshop.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              No image
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-lg font-bold leading-snug text-ink">{workshop.title}</h3>

        {(workshop.price || workshop.compareAtPrice) && (
          <div className="flex flex-wrap items-baseline gap-2">
            {workshop.price ? (
              <p className="text-2xl font-bold text-accent">{workshop.price}</p>
            ) : null}
            {workshop.compareAtPrice ? (
              <p className="text-sm text-muted line-through">
                {workshop.compareAtPrice}
              </p>
            ) : null}
          </div>
        )}

        <div className="space-y-2.5">
          {workshop.dateLabel ? (
            <MetaRow icon="date" label={workshop.dateLabel} />
          ) : null}
          {workshop.scheduleLabel ? (
            <MetaRow icon="schedule" label={workshop.scheduleLabel} />
          ) : null}
          {workshop.venue ? <MetaRow icon="venue" label={workshop.venue} /> : null}
        </div>

        <div className="mt-auto pt-2">
          <Link
            href={ctaHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_0_0_rgba(152,77,176,1)] transition active:translate-y-1 active:shadow-none"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
