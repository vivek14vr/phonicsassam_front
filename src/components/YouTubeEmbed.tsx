"use client";

import { motion } from "framer-motion";
import { youtubeVideoId } from "@/lib/content";
import { easeOut, springSoft, viewportOnce } from "@/lib/motion";

export function YouTubeEmbed({
  url,
  title = "Project video",
  className = "",
}: {
  url: string;
  title?: string;
  className?: string;
}) {
  const id = youtubeVideoId(url);
  if (!id) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={springSoft}
      className={`overflow-hidden rounded-3xl border border-line bg-ink shadow-[10px_10px_0_0_rgba(182,106,203,0.2)] ${className}`}
    >
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </motion.div>
  );
}

export function HomeVideoSection({
  url,
  eyebrow = "Watch",
  title = "See the mission in motion",
  detail,
}: {
  url: string;
  eyebrow?: string;
  title?: string;
  detail?: string;
}) {
  return (
    <section className="overflow-hidden bg-background py-14 sm:py-16">
      <div className="section-shell space-y-8">
        <motion.div
          className="mx-auto max-w-2xl space-y-3 text-center"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
            }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-accent"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 220, damping: 18 },
              },
            }}
            className="font-display text-3xl font-semibold text-ink sm:text-4xl"
          >
            {title}
          </motion.h2>
          {detail ? (
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
              }}
              className="text-base leading-7 text-muted"
            >
              {detail}
            </motion.p>
          ) : null}
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <YouTubeEmbed url={url} title={title} />
        </div>
      </div>
    </section>
  );
}
