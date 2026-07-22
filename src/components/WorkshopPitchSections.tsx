"use client";

import Link from "next/link";
import { PitchIcon } from "@/components/PitchIcon";
import { Container } from "@/components/ui";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionSection,
  motion,
  stickerSlap,
  staggerStickers,
  viewportOnce,
} from "@/lib/motion";
import { workshopPitch } from "@/lib/workshopPitch";

const waveBg =
  "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.12), transparent 40%)";

function PitchCta({
  href,
  label,
  tone = "dark",
}: {
  href: string;
  label: string;
  tone?: "dark" | "light";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      whileHover={{ y: -4, rotate: -1 }}
      whileTap={{ scale: 0.97, y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 16 }}
    >
      <Link
        href={href}
        className={`inline-flex min-w-[240px] flex-col items-center rounded-full px-8 py-3.5 text-center ${
          tone === "dark"
            ? "bg-ink text-white shadow-[0_14px_0_0_rgba(182,106,203,0.85)]"
            : "bg-white text-ink shadow-[0_14px_0_0_rgba(17,17,17,0.85)]"
        }`}
      >
        <span className="text-sm font-bold tracking-wide sm:text-base">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}

/** Compact homepage band — same page background, accent on cards. */
export function WhoWorkshopIsForCompact() {
  const items = workshopPitch.who.items.slice(0, 4);

  return (
    <MotionSection
      className="relative overflow-hidden bg-background py-14 text-ink sm:py-16"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerStickers}
    >
      <Container className="relative space-y-8">
        <div className="mx-auto max-w-2xl text-center">
          <MotionP
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Workshops
          </MotionP>
          <MotionH2
            initial={{ opacity: 0, rotate: -2, y: 16 }}
            whileInView={{ opacity: 1, rotate: 0, y: 0 }}
            viewport={viewportOnce}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
          >
            {workshopPitch.who.title}
          </MotionH2>
        </div>
        <MotionDiv className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" variants={staggerStickers}>
          {items.map((item, i) => (
            <MotionDiv
              key={item.title}
              variants={stickerSlap}
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2, scale: 1.03 }}
              className="rounded-2xl border-2 border-ink/15 bg-white p-5 text-ink shadow-[4px_4px_0_0_rgba(17,17,17,0.12)]"
            >
              <motion.div
                className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                transition={{ duration: 0.45 }}
              >
                <PitchIcon name={item.icon} className="h-11 w-11" />
              </motion.div>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted">{item.detail}</p>
            </MotionDiv>
          ))}
        </MotionDiv>
        <div className="flex justify-center pt-2">
          <PitchCta
            href={workshopPitch.who.ctaHref}
            label={workshopPitch.who.ctaLabel}
            tone="dark"
          />
        </div>
      </Container>
    </MotionSection>
  );
}

export function WhoWorkshopIsForDetailed() {
  const { who } = workshopPitch;

  return (
    <MotionSection
      className="relative overflow-hidden bg-accent py-16 text-white sm:py-20"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerStickers}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: waveBg }}
      />
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-ink/20 blur-3xl" />

      <Container className="relative space-y-10">
        <MotionH2
          initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={viewportOnce}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {who.title}
        </MotionH2>
        <MotionDiv
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerStickers}
        >
          {who.items.map((item, i) => (
            <MotionDiv
              key={item.title}
              variants={stickerSlap}
              whileHover={{ y: -10, rotate: i % 2 ? 3 : -3, scale: 1.04 }}
              className="rounded-2xl border-2 border-ink bg-white p-5 text-center text-ink shadow-[5px_5px_0_0_rgba(17,17,17,0.9)]"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
                <PitchIcon name={item.icon} className="h-12 w-12" />
              </div>
              <h3 className="text-sm font-bold sm:text-base">{item.title}</h3>
            </MotionDiv>
          ))}
        </MotionDiv>
        <div className="flex justify-center">
          <PitchCta
            href="#workshop-list"
            label="Become a Sketchy Phonics Expert"
            tone="dark"
          />
        </div>
      </Container>
    </MotionSection>
  );
}

export function WhatYouWillLearn() {
  const { learn } = workshopPitch;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#fff_0%,#faf0f7_55%,#fff_100%)] py-16 sm:py-20">
      <Container className="relative space-y-10">
        <div className="mx-auto max-w-2xl text-center">
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            {learn.title}
          </MotionH2>
          <MotionP
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.15 }}
            className="mt-3 text-base text-muted sm:text-lg"
          >
            {learn.subtitle}
          </MotionP>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {learn.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
                delay: i * 0.07,
              }}
              whileHover={{ y: -6, borderColor: "rgba(182,106,203,0.5)" }}
              className="rounded-2xl border border-line bg-white p-5 text-center shadow-[0_12px_40px_-24px_rgba(182,106,203,0.55)]"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                <PitchIcon name={item.icon} className="h-11 w-11" />
              </div>
              <p className="text-sm font-semibold leading-6 text-ink">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <PitchCta href={learn.ctaHref} label={learn.ctaLabel} tone="dark" />
        </div>
      </Container>
    </section>
  );
}

export function ResourcesYouWillGet() {
  const { resources } = workshopPitch;

  return (
    <MotionSection
      className="relative overflow-hidden bg-accent-deep py-16 text-white sm:py-20"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={staggerStickers}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ backgroundImage: waveBg }}
      />
      <Container className="relative space-y-10">
        <MotionH2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="text-center font-display text-3xl font-semibold tracking-tight sm:text-5xl"
        >
          {resources.title}
        </MotionH2>
        <MotionDiv
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerStickers}
        >
          {resources.items.map((item) => (
            <MotionDiv
              key={item.title}
              variants={stickerSlap}
              whileHover={{ y: -8, rotate: 1.5, scale: 1.03 }}
              className="rounded-2xl border-2 border-ink/20 bg-white p-4 text-center text-ink shadow-[4px_4px_0_0_rgba(17,17,17,0.25)]"
            >
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-xl bg-white">
                <PitchIcon name={item.icon} className="h-11 w-11" />
              </div>
              <p className="text-sm font-bold leading-5">{item.title}</p>
            </MotionDiv>
          ))}
        </MotionDiv>
        <MotionP
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mx-auto max-w-2xl text-center text-base font-medium text-white/90"
        >
          {resources.footer}
        </MotionP>
      </Container>
    </MotionSection>
  );
}
