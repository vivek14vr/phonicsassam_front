export type CoverImage = {
  url: string;
  publicId: string;
};

export type EventImage = {
  url: string;
  publicId: string;
  alt?: string;
  isBanner?: boolean;
};

export type City = {
  _id: string;
  name: string;
  slug: string;
  state: string;
  description: string;
  coverImage: CoverImage;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type School = {
  _id: string;
  city: string | City;
  name: string;
  slug: string;
  description: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Past event gallery with photos. */
export type GalleryEvent = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  school: string | School;
  state: string;
  cityName: string;
  schoolName: string;
  eventDate: string | null;
  youtubeUrls?: string[];
  /** @deprecated use youtubeUrls */
  youtubeUrl?: string;
  images: EventImage[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Shared common gallery image (not tied to location). */
export type CommonGalleryImage = {
  _id: string;
  url: string;
  publicId: string;
  alt: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GalleryPlace = {
  state: string;
  city: string;
  eventCount: number;
  latestDate: string | null;
  coverImage?: EventImage | null;
};

export type GalleryMeta = {
  states: string[];
  cities: string[];
  schools: string[];
  years: string[];
  placePairs: { state: string; city: string }[];
};

/** Workshop card shown on the public Workshops page. */
export type Program = {
  _id: string;
  title: string;
  slug: string;
  badge: string;
  description: string;
  price: string;
  compareAtPrice: string;
  dateLabel: string;
  scheduleLabel: string;
  venue: string;
  ctaLabel: string;
  ctaHref: string;
  highlights: string[];
  coverImage: CoverImage;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HeroShowcasePlace = {
  name: string;
  count: string;
  galleryTitle?: string;
  gallerySubtitle?: string;
  photoCountLabel?: string;
  images?: HeroShowcaseImage[];
};

export type HeroShowcaseImage = {
  url: string;
  publicId: string;
  alt?: string;
};

export type MediaAsset = {
  url: string;
  publicId: string;
  createdAt?: string;
  width?: number;
  height?: number;
  source?: "s3" | "cloudinary" | "local" | "upload";
};

/** Editable homepage hero gallery card. */
export type HeroShowcaseContent = {
  brandEyebrow: string;
  title: string;
  badgeLabel: string;
  galleryTitle: string;
  gallerySubtitle: string;
  photoCountLabel: string;
  mosaicImages: HeroShowcaseImage[];
  places: HeroShowcasePlace[];
  browseEyebrow: string;
  browseLabel: string;
  browseCtaLabel: string;
  browseCtaHref: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredDescription: string;
};

export type Admin = {
  id?: string;
  _id?: string;
  email: string;
  name: string;
};
