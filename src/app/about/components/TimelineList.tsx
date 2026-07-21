import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface TimelineListProps {
  /** Rendered card content per entry, in chronological order (newest first) */
  items: ReactNode[];
  /** Index of the entry highlighted with an accent dot (e.g. current role) */
  activeIndex?: number;
}

/**
 * Static vertical timeline: a left rail of dots connected by a line,
 * each entry revealed on scroll.
 */
const TimelineList = ({ items, activeIndex = 0 }: TimelineListProps) => (
  <Stack spacing={0}>
    {items.map((item, index) => (
      <Stack key={index} direction="row" spacing={{ xs: 2, md: 3 }}>
        {/* Rail */}
        <Stack alignItems="center" sx={{ pt: 1 }}>
          <Box
            sx={(theme) => ({
              width: 12,
              height: 12,
              borderRadius: "50%",
              flexShrink: 0,
              backgroundColor:
                index === activeIndex
                  ? "secondary.main"
                  : theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.2)",
              boxShadow:
                index === activeIndex
                  ? theme.palette.mode === "dark"
                    ? "0 0 0 4px rgba(228,96,46,0.2)"
                    : "0 0 0 4px rgba(194,65,12,0.16)"
                  : "none",
            })}
          />
          {index < items.length - 1 && (
            <Box
              sx={(theme) => ({
                width: "1px",
                flexGrow: 1,
                backgroundColor: theme.palette.divider,
                my: 1,
              })}
            />
          )}
        </Stack>

        {/* Content */}
        <Box sx={{ flexGrow: 1, pb: index < items.length - 1 ? 4 : 0 }}>
          <Reveal delay={index * 0.08}>{item}</Reveal>
        </Box>
      </Stack>
    ))}
  </Stack>
);

export default TimelineList;
