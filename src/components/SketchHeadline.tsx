"use client";

import { MotionDiv, staggerWords, wordReveal, motion } from "@/lib/motion";

/** Headline that pops in word-by-word like sketch strokes. */
export function SketchHeadline({
  words,
  accentWord,
  className,
}: {
  words: string[];
  accentWord?: string;
  className?: string;
}) {
  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="show"
      variants={staggerWords}
    >
      {words.map((word) => {
        const accent = accentWord === word;
        return (
          <span
            key={word}
            className="mr-[0.28em] inline-block overflow-hidden align-bottom pb-[0.08em]"
          >
            <MotionDiv
              variants={wordReveal}
              className={`inline-block origin-bottom-left ${accent ? "text-accent" : ""}`}
            >
              {word}
            </MotionDiv>
          </span>
        );
      })}
    </motion.h1>
  );
}
