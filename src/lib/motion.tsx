"use client";

import { motion, type Variants } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const springSnap = { type: "spring" as const, stiffness: 420, damping: 22 };
export const springSoft = { type: "spring" as const, stiffness: 180, damping: 20 };

/** Sticker slap — for pitch cards / workshop CTAs */
export const stickerSlap: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: springSnap,
  },
};

/** Polaroid drop — gallery cards */
export const polaroidDrop: Variants = {
  hidden: { opacity: 0, y: 48, rotate: 4, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: i % 2 === 0 ? -1.5 : 1.5,
    scale: 1,
    transition: { ...springSoft, delay: i * 0.1 },
  }),
};

/** Skew wipe — explore teaser cards */
export const skewIn: Variants = {
  hidden: { opacity: 0, x: -40, skewX: -6 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.55, delay: 0.08 + i * 0.12, ease: easeOut },
  }),
};

/** Horizontal curtain for dark CTA band */
export const curtain: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const wordReveal: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const staggerWords: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const staggerStickers: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;
export const MotionArticle = motion.article;
export { motion };

export const viewportOnce = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -60px 0px",
} as const;
