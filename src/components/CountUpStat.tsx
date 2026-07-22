"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function parseStat(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) return { target: 0, suffix: value, prefix: "" };
  return {
    target: Number(match[1].replace(/,/g, "")),
    suffix: match[2] || "",
    prefix: "",
  };
}

/** Counts up when scrolled into view — for hero stats. */
export function CountUpStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const { target, suffix } = parseStat(value);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(target);
      return;
    }
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, reduce]);

  const formatted = n.toLocaleString("en-IN");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </motion.div>
  );
}
