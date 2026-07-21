import React, { useState, useEffect } from "react";
import { Box, IconButton, SxProps, Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ImageItem } from "@/types";
import { normalizeImageSrc } from "@/lib/images";

interface CustomCarouselProps {
  images: ImageItem[];
  height?: ResponsiveStyleValue<number | string>;
  width?: ResponsiveStyleValue<number | string>;
  sx?: SxProps<Theme>;
  autoTransition?: boolean;
  transitionInterval?: number; // in milliseconds
  imageHeight?: ResponsiveStyleValue<number | string>;
  imageSx?: SxProps<Theme>;
  fallbackSrc?: string;
}

const CustomCarousel = ({
  images,
  height = "100%",
  width,
  sx,
  imageHeight = "100%",
  autoTransition = false,
  transitionInterval = 3000,
  imageSx,
  fallbackSrc,
}: CustomCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedImageIds, setFailedImageIds] = useState<number[]>([]);

  const nextImage = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, [images.length]);

  // Auto-transition effect
  useEffect(() => {
    if (!autoTransition || images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, transitionInterval);

    return () => clearInterval(interval);
  }, [autoTransition, transitionInterval, images.length, nextImage]);

  useEffect(() => {
    setFailedImageIds([]);
    setCurrentIndex(0);
  }, [images]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex] ?? images[0];
  const primarySrc = normalizeImageSrc(currentImage.src);
  const imageSrc =
    failedImageIds.includes(currentImage.id) || !primarySrc
      ? fallbackSrc
      : primarySrc;

  if (!imageSrc) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: width ?? "100%",
        height: height ?? "100%",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={currentImage.alt}
        sx={{
          objectFit: "cover",
          borderRadius: 2,
          width: "100%",
          height: imageHeight ?? "100%",
          ...imageSx,
        }}
        onError={() => {
          if (imageSrc !== fallbackSrc) {
            setFailedImageIds((prev) =>
              prev.includes(currentImage.id)
                ? prev
                : [...prev, currentImage.id],
            );
          }
        }}
      />

      {images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous image"
            onClick={prevImage}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            aria-label="Next image"
            onClick={nextImage}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {images.map((image, index) => (
              <Box
                key={image.id}
                component="button"
                type="button"
                aria-label={`Show image ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  p: 0,
                  border: 0,
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  appearance: "none",
                  "&:hover": {
                    backgroundColor:
                      index === currentIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.8)",
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CustomCarousel;
