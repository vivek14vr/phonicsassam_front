"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteImages, type SiteImageKey } from "@/lib/siteImages";
import { easeOut, springSoft, viewportOnce } from "@/lib/motion";

/** Fills a `relative` parent — parent must set size (aspect / h / inset). */
export function ScenePhoto({
  image,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  image: SiteImageKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const data = siteImages[image];
  return (
    <Image
      src={data.src}
      alt={data.alt}
      fill
      className={`object-cover ${className}`}
      sizes={sizes}
      priority={priority}
    />
  );
}

/** Full-bleed story band with photo + copy. */
export function StoryBand({
  image,
  eyebrow,
  title,
  detail,
  align = "left",
  tone = "page",
}: {
  image: SiteImageKey;
  eyebrow: string;
  title: string;
  detail: string;
  align?: "left" | "right";
  tone?: "soft" | "white" | "page" | "ink";
}) {
  const tones = {
    soft: "bg-background",
    white: "bg-background",
    page: "bg-background",
    ink: "bg-ink text-white",
  };
  const fromX = align === "right" ? 48 : -48;

  return (
    <section className={`${tones[tone]} overflow-hidden`}>
      <div
        className={`section-shell grid items-center gap-8 py-14 lg:grid-cols-2 lg:gap-12 lg:py-20 ${
          align === "right" ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: fromX, rotate: align === "right" ? 2 : -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={viewportOnce}
          transition={springSoft}
          whileHover={{ y: -6 }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-soft shadow-[10px_10px_0_0_rgba(182,106,203,0.2)] lg:aspect-[5/4]"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: easeOut }}
            whileHover={{ scale: 1.06 }}
          >
            <ScenePhoto
              image={image}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12, letterSpacing: "0.35em" },
              show: {
                opacity: 1,
                y: 0,
                letterSpacing: "0.16em",
                transition: { duration: 0.5, ease: easeOut },
              },
            }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" },
              show: {
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0% 0)",
                transition: { duration: 0.6, ease: easeOut },
              },
            }}
            className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl ${
              tone === "ink" ? "text-white" : "text-ink"
            }`}
          >
            {title}
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: easeOut },
              },
            }}
            className={`max-w-md text-base leading-7 ${
              tone === "ink" ? "text-white/70" : "text-muted"
            }`}
          >
            {detail}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/** Small photo collage for page headers. */
export function PhotoCollage({
  images,
  className = "",
}: {
  images: SiteImageKey[];
  className?: string;
}) {
  const [a, b, c] = images;
  return (
    <motion.div
      className={`grid grid-cols-2 gap-2 sm:gap-3 ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 28, scale: 0.94, rotate: -1.5 },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: springSoft,
          },
        }}
        whileHover={{ y: -4, rotate: 0.5 }}
        className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-soft sm:aspect-[2/1]"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easeOut }}
          whileHover={{ scale: 1.05 }}
        >
          <ScenePhoto image={a} sizes="100vw" priority />
        </motion.div>
      </motion.div>
      {b ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20, rotate: -3 },
            show: {
              opacity: 1,
              x: 0,
              rotate: -1,
              transition: springSoft,
            },
          }}
          whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-soft"
        >
          <ScenePhoto image={b} sizes="50vw" />
        </motion.div>
      ) : null}
      {c ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20, rotate: 3 },
            show: {
              opacity: 1,
              x: 0,
              rotate: 1,
              transition: springSoft,
            },
          }}
          whileHover={{ y: -6, rotate: 0, scale: 1.03 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-soft"
        >
          <ScenePhoto image={c} sizes="50vw" />
        </motion.div>
      ) : null}
    </motion.div>
  );
}

/** Closing CTA — same page background as the rest of home. */
export function ClassroomCtaBand({
  eyebrow = "See it in action",
  title = "See the work in classrooms",
  detail = "Open galleries for past event photos, or read about the training behind Sketchy Phonics.",
  primaryHref = "/galleries",
  primaryLabel = "Past event galleries",
  secondaryHref = "/about",
  secondaryLabel = "About Komal",
}: {
  eyebrow?: string;
  title?: string;
  detail?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
} = {}) {
  return (
    <section className="relative mb-10 overflow-hidden bg-background sm:mb-14">
      <div className="section-shell relative grid items-center gap-8 py-16 lg:grid-cols-2 lg:py-20">
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -16 },
              show: { opacity: 1, x: 0, transition: { duration: 0.45 } },
            }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 200, damping: 18 },
              },
            }}
            className="font-display text-3xl font-semibold text-ink sm:text-4xl"
          >
            {title}
          </motion.h2>
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
            }}
            className="max-w-md text-muted"
          >
            {detail}
          </motion.p>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <motion.a
              href={primaryHref}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
            >
              {primaryLabel}
            </motion.a>
            <motion.a
              href={secondaryHref}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-ink"
            >
              {secondaryLabel}
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 3, scale: 0.92 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={springSoft}
          whileHover={{ y: -8, rotate: -1 }}
          className="relative hidden aspect-[5/4] overflow-hidden rounded-3xl border border-line bg-soft shadow-[10px_10px_0_0_rgba(182,106,203,0.18)] lg:block"
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/scenes/kids-play.jpg"
              alt="Children learning through play"
              fill
              className="object-cover"
              sizes="40vw"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
