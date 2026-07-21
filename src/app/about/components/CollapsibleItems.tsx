"use client";
import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface CollapsibleItemsProps<T> {
  /** Full list of items. */
  items: T[];
  /** How many to show before "Show more" (default 6). */
  initialCount?: number;
  /** Renders the layout (Grid/flex) for the given visible slice. */
  children: (visibleItems: T[]) => React.ReactNode;
  /** Label builder for the collapsed state; receives the hidden count. */
  moreLabel?: (remaining: number) => string;
  lessLabel?: string;
  /** Align the toggle. Sections on the About page are centered. */
  align?: "center" | "left";
}

/**
 * Progressive-disclosure wrapper for item-heavy sections: shows the first
 * `initialCount` items with a "Show more" toggle that reveals the rest,
 * so long lists (certifications, badges) don't force endless scrolling.
 * The caller keeps its own grid/flex markup via the render-prop.
 */
function CollapsibleItems<T>({
  items,
  initialCount = 6,
  children,
  moreLabel = (n) => `Show ${n} more`,
  lessLabel = "Show less",
  align = "center",
}: CollapsibleItemsProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const canCollapse = items.length > initialCount;
  const visibleItems =
    expanded || !canCollapse ? items : items.slice(0, initialCount);
  const remaining = items.length - initialCount;

  return (
    <Box sx={{ width: "100%" }}>
      {children(visibleItems)}

      {canCollapse && (
        <Box
          sx={{
            display: "flex",
            justifyContent: align === "center" ? "center" : "flex-start",
            mt: { xs: 3, md: 4 },
          }}
        >
          <Button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            disableRipple
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  transition: "transform 0.2s ease",
                  transform: expanded ? "rotate(180deg)" : "none",
                }}
              />
            }
            sx={{
              color: "text.primary",
              px: 0,
              borderRadius: 0,
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              borderBottom: "1px solid transparent",
              "&:hover": {
                backgroundColor: "transparent",
                borderBottomColor: "text.primary",
              },
            }}
          >
            {expanded ? lessLabel : moreLabel(remaining)}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CollapsibleItems;
