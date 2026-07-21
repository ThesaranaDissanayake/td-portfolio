"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";
import { normalizeImageSrc } from "@/lib/images";

interface FallbackImageProps extends Omit<ImageProps, "src"> {
  src?: ImageProps["src"] | null;
  fallbackSrc: string;
}

const FallbackImage = ({
  src,
  fallbackSrc,
  alt,
  onError,
  ...props
}: FallbackImageProps) => {
  const primarySrc = useMemo(() => {
    if (typeof src === "string") {
      return normalizeImageSrc(src);
    }

    return src ?? undefined;
  }, [src]);

  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [primarySrc]);

  const displaySrc = hasImageError || !primarySrc ? fallbackSrc : primarySrc;

  return (
    <Image
      {...props}
      src={displaySrc}
      alt={alt}
      onError={(event) => {
        if (displaySrc !== fallbackSrc) {
          setHasImageError(true);
        }
        onError?.(event);
      }}
    />
  );
};

export default FallbackImage;
