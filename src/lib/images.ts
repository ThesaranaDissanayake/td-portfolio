import type { ImageItem } from "@/types";

export const IMAGE_FALLBACKS = {
  profile: "/images/profile-placeholder.svg",
  project: "/images/project-placeholder.svg",
  education: "/images/education-placeholder.svg",
  community: "/images/community-placeholder.svg",
} as const;

export const SITE_IMAGES = {
  profile: "/my-images/my-image-5.jpg",
  avatar: "/my-images/avatar.webp",
  education: [
    {
      id: 1,
      src: "/educations/School.jpg",
      alt: "Education school building",
    },
    {
      id: 2,
      src: "/educations/SLIIT.jpg",
      alt: "Education campus aerial view",
    },
  ],
  community : [
    {
      id: 1,
      src: "/volunteering/rugby-team.png",
      alt: "Community involvement event",
    },
    {
      id: 2,
      src: "/volunteering/tec-car.png",
      alt: "Community involvement activity",
    },
    {
      id: 3,
      src: "/volunteering/SLIIT.png",
      alt: "Community involvement activity",
    },
  ],
} satisfies {
  profile: string;
  avatar: string;
  education: ImageItem[];
  community: ImageItem[];
};

const DEFAULT_PLACEHOLDER_IMAGES = new Set<string>(
  Object.values(IMAGE_FALLBACKS),
);

export const normalizeImageSrc = (src?: string | null) => {
  const value = src?.trim();
  if (!value || DEFAULT_PLACEHOLDER_IMAGES.has(value)) {
    return undefined;
  }

  return value;
};
