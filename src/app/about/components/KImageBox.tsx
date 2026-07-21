import { useEffect, useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import { ImageItem } from "@/types";
import CustomCarousel from "./CustomCarousel";
import { normalizeImageSrc } from "@/lib/images";

interface KImageBoxProps {
  src?: string;
  alt?: string;
  height?: ResponsiveStyleValue<number | string>;
  width?: ResponsiveStyleValue<number | string>;
  imageArray?: ImageItem[];
  sx?: SxProps<Theme>;
  autoTransition?: boolean;
  transitionInterval?: number;
  imageSx?: SxProps<Theme>;
  fallbackSrc?: string;
}

const KImageBox = ({
  src,
  alt,
  height,
  width,
  imageArray,
  sx,
  autoTransition = false,
  transitionInterval = 3000,
  imageSx,
  fallbackSrc,
}: KImageBoxProps) => {
  const primarySrc = normalizeImageSrc(src);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setHasImageError(false);
  }, [primarySrc]);

  if (imageArray && imageArray.length > 0) {
    return (
      <Box
        sx={{
          width: width ?? "100%",
          height: height ?? "100%",
        }}
      >
        <CustomCarousel
          images={imageArray}
          height={height}
          width={width}
          sx={sx}
          autoTransition={autoTransition}
          transitionInterval={transitionInterval}
          imageSx={imageSx}
          fallbackSrc={fallbackSrc}
        />
      </Box>
    );
  }

  const imageSrc = hasImageError || !primarySrc ? fallbackSrc : primarySrc;

  if (!imageSrc) return null;

  return (
    <Box
      component="img"
      src={imageSrc}
      alt={alt}
      sx={{
        objectFit: "cover" as const,
        borderRadius: 2,
        height: height ?? "auto",
        width: width ?? "100%",
        ...(sx || {}),
      }}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setHasImageError(true);
        }
      }}
    />
  );
};

export default KImageBox;
