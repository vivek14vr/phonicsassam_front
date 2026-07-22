"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { IconBadge } from "@/components/PitchIcon";
import { Button, SectionHeader } from "@/components/ui";
import { siteImages, type SiteImageKey } from "@/lib/siteImages";
import { projectStory } from "@/lib/projectStory";
import type { PitchIconName } from "@/lib/workshopPitch";
import { polaroidDrop, springSoft, viewportOnce } from "@/lib/motion";

export function AboutStoryBlock() {
  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -36, rotate: -2 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={viewportOnce}
        transition={springSoft}
        whileHover={{ y: -6 }}
        className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line shadow-[10px_10px_0_0_rgba(182,106,203,0.18)] sm:aspect-[5/4] lg:aspect-[4/5]"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={siteImages.kidsLearning.src}
            alt={siteImages.kidsLearning.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="space-y-5"
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 18 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <SectionHeader
            eyebrow={`Since ${projectStory.foundedYear}`}
            title="A shared belief that every child can become a confident reader"
          />
        </motion.div>
        <motion.div
          className="space-y-4 text-base leading-8 text-muted"
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <p>
            In {projectStory.foundedYear},{" "}
            <strong className="text-ink">{projectStory.founders}</strong>{" "}
            embarked on a mission with one shared belief:
          </p>
          <p className="italic text-accent">“{projectStory.belief}”</p>
          <p>{projectStory.challenge}</p>
          <p>
            {projectStory.opportunity} {projectStory.pilot}
          </p>
        </motion.div>
        <motion.div
          className="flex flex-wrap gap-3 pt-2"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <Button href="/workshops" variant="accent">
            View Workshops
          </Button>
          <Button href="/galleries" variant="outline">
            Browse Galleries
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function AboutFocusGrid({
  items,
}: {
  items: {
    title: string;
    detail: string;
    icon: PitchIconName;
    image: SiteImageKey;
  }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          custom={i}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={polaroidDrop}
          whileHover={{ y: -10, rotate: 0, scale: 1.02, zIndex: 2 }}
          className="overflow-hidden rounded-2xl border border-line bg-white shadow-[4px_4px_0_0_rgba(182,106,203,0.12)]"
        >
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.45 }}
            >
              <Image
                src={siteImages[item.image].src}
                alt={siteImages[item.image].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </motion.div>
          </div>
          <div className="space-y-3 p-5">
            <IconBadge name={item.icon} size="sm" />
            <h3 className="font-display text-xl font-semibold text-ink">
              {item.title}
            </h3>
            <p className="text-sm leading-7 text-muted">{item.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PageHeroCopy({
  eyebrow,
  title,
  detail,
  children,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className="space-y-5"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
      }}
    >
      <div className="space-y-3">
        <motion.p
          variants={{
            hidden: { opacity: 0, x: -16 },
            show: { opacity: 1, x: 0 },
          }}
          className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 22 },
            show: {
              opacity: 1,
              y: 0,
              transition: { type: "spring", stiffness: 220, damping: 18 },
            },
          }}
          className="font-display max-w-3xl text-3xl font-semibold text-ink sm:text-4xl"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 14 },
            show: { opacity: 1, y: 0 },
          }}
          className="max-w-2xl text-base leading-7 text-muted"
        >
          {detail}
        </motion.p>
      </div>
      {children ? (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export function AnimatedChipRow({
  items,
}: {
  items: { label: string; icon: PitchIconName }[];
}) {
  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
      }}
    >
      {items.map((item) => (
        <motion.div
          key={item.label}
          variants={{
            hidden: { opacity: 0, scale: 0.8, y: 10 },
            show: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 380, damping: 18 },
            },
          }}
          whileHover={{ y: -3, scale: 1.04 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-3"
        >
          <IconBadge name={item.icon} size="sm" className="shadow-none" />
          <span className="text-sm font-semibold text-ink">{item.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}
