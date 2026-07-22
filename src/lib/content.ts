export function formatDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function eventYear(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return String(date.getFullYear());
}

export function placeLabel(state: string, city: string) {
  return `${city}, ${state}`;
}

/** Banner for gallery cards; falls back to the first photo. */
export function eventBannerImage(event: {
  images?: { url: string; publicId: string; alt?: string; isBanner?: boolean }[];
}) {
  if (!event.images?.length) return null;
  return event.images.find((image) => image.isBanner) ?? event.images[0];
}

/** Extract a YouTube video id from common URL formats. */
export function youtubeVideoId(url?: string | null) {
  if (!url?.trim()) return null;
  try {
    const value = url.trim();
    const short = value.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/);
    if (short?.[1]) return short[1];

    const watch = value.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
    if (watch?.[1]) return watch[1];

    const embed = value.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/);
    if (embed?.[1]) return embed[1];

    const shorts = value.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/);
    if (shorts?.[1]) return shorts[1];

    return null;
  } catch {
    return null;
  }
}
