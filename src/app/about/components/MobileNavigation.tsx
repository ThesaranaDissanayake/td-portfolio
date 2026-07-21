import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import AppsIcon from "@mui/icons-material/Apps";
import VerifiedIcon from "@mui/icons-material/Verified";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface SectionRef {
  id: number;
  text: string;
  ref: React.RefObject<HTMLDivElement | null>;
  icon: string;
}

interface MobileNavigationProps {
  sectionRefs: SectionRef[];
  activeSection: number;
  scrollToSection: (
    ref: React.RefObject<HTMLDivElement | null>,
    offset?: number,
  ) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  sectionRefs,
  activeSection,
  scrollToSection,
}) => {
  const theme = useTheme();
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const activeItem = itemRefs.current[activeSection];
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeSection]);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        p: 1,
        gap: 1,
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(18, 18, 18, 0.8)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: { xs: "56px", sm: "64px", md: "110px" }, // Adjust based on header height
        zIndex: 999,
        borderBottom: { xs: `1px solid ${theme.palette.divider}`, md: "none" },
        borderRadius: { xs: 0, md: "50px" }, // Pill shape on desktop
        border: { md: `1px solid ${theme.palette.divider}` }, // Border on desktop
        width: { xs: "100%", md: "fit-content" }, // Fit content on desktop
        maxWidth: { md: "90%" },
        mx: "auto", // Center on desktop
        boxShadow: { md: "0 8px 32px rgba(0, 0, 0, 0.1)" }, // Shadow on desktop
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        justifyContent: { md: "center" }, // Center items on desktop if they fit
      }}
    >
      {sectionRefs.map(({ id, text, ref, icon }) => {
        const isActive = activeSection === id;
        return (
          <Chip
            key={id}
            ref={(el) => {
              itemRefs.current[id] = el;
            }}
            label={text}
            onClick={() => scrollToSection(ref, 200)}
            variant="outlined"
            icon={
              icon === "PersonIcon" ? (
                <PersonIcon />
              ) : icon === "SchoolIcon" ? (
                <SchoolIcon />
              ) : icon === "CodeIcon" ? (
                <CodeIcon />
              ) : icon === "AppsIcon" ? (
                <AppsIcon />
              ) : icon === "VerifiedIcon" ? (
                <VerifiedIcon />
              ) : icon === "VolunteerActivismIcon" ? (
                <VolunteerActivismIcon />
              ) : icon === "WorkHistoryIcon" ? (
                <WorkHistoryIcon />
              ) : icon === "WorkspacePremiumIcon" ? (
                <WorkspacePremiumIcon />
              ) : undefined
            }
            sx={{
              fontWeight: isActive ? 600 : 400,
              transition: "all 0.3s ease",
              color: isActive ? "text.primary" : "text.secondary",
              backgroundColor: isActive
                ? theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.06)"
                : "transparent",
              borderColor: isActive
                ? theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(0, 0, 0, 0.2)"
                : theme.palette.divider,
              "& .MuiChip-icon": {
                fontSize: "1.1rem", // Reduced icon size
                color: isActive ? theme.palette.secondary.main : "inherit",
              },
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(0, 0, 0, 0.04)",
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default MobileNavigation;
