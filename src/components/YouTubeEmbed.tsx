"use client";

import { motion } from "framer-motion";
import { youtubeVideoId } from "@/lib/content";
import { easeOut, springSoft, viewportOnce } from "@/lib/motion";

function isYouTubeShort(url: string) {
  return /youtube\.com\/shorts\//i.test(url);
}

export function YouTubeEmbed({
  url,
  title = "Project video",
  className = "",
  portrait,
}: {
  url: string;
  title?: string;
  className?: string;
  /** Force portrait frame; defaults from Shorts URLs. */
  portrait?: boolean;
}) {
  const id = youtubeVideoId(url);
  if (!id) return null;
  const usePortrait = portrait ?? isYouTubeShort(url);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={springSoft}
      className={`overflow-hidden rounded-3xl border border-line bg-ink shadow-[10px_10px_0_0_rgba(182,106,203,0.2)] ${className}`}
    >
      <div
        className={`relative w-full ${
          usePortrait ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
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
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: easeOut },
              },
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

function VideoCard({
  url,
  title,
  portrait,
}: {
  url: string;
  title: string;
  portrait?: boolean;
}) {
  return (
    <div className="flex h-full flex-col">
      <YouTubeEmbed url={url} title={title} portrait={portrait} />
      <p className="mt-3 text-sm font-medium leading-6 text-ink">{title}</p>
    </div>
  );
}

export function YouTubeVideoGrid({
  videos,
  eyebrow = "Classroom moments",
  title = "See reading confidence take shape",
  detail,
}: {
  videos: { url: string; title: string }[];
  eyebrow?: string;
  title?: string;
  detail?: string;
}) {
  const shorts = videos.filter((video) => isYouTubeShort(video.url));
  const landscape = videos.filter((video) => !isYouTubeShort(video.url));

  return (
    <section className="overflow-hidden bg-background py-14 sm:py-16">
      <div className="section-shell space-y-10">
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
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: easeOut },
              },
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

        <div className="space-y-12">
          {shorts.length > 0 ? (
            <div className="space-y-5">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Shorts
              </p>
              <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shorts.map((video) => (
                  <div key={video.url} className="w-full max-w-[260px]">
                    <VideoCard
                      url={video.url}
                      title={video.title}
                      portrait
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {landscape.length > 0 ? (
            <div className="space-y-5">
              {shorts.length > 0 ? (
                <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Classroom videos
                </p>
              ) : null}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {landscape.map((video) => (
                  <VideoCard
                    key={video.url}
                    url={video.url}
                    title={video.title}
                    portrait={false}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
