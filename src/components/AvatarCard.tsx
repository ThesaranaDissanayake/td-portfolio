
"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Box,
  Divider,
  styled,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import { GitHub, LinkedIn, Code } from "@mui/icons-material";
import { profile } from "@/features/profile.config";
import { IMAGE_FALLBACKS } from "@/lib/images";

const CardWrapper = styled(Box)(() => ({
  margin: "auto",
  maxWidth: 320,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background:
    theme.palette.mode === "dark"
      ? "rgba(35, 39, 47, 0.35)"
      : "rgba(255, 255, 255, 0.45)",
  color: theme.palette.text.primary,
  width: "100%",
  borderRadius: 22,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 32px 0 rgba(135, 31, 31, 0.13)"
      : "0 8px 32px 0 rgba(135, 31, 31, 0.13)",
  border:
    theme.palette.mode === "dark"
      ? "1.5px solid rgba(255,255,255,0.12)"
      : "1.5px solid rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2, 0, 2, 0),
  position: "relative",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  overflow: "hidden",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 110,
  height: 110,
  border: `3px solid ${theme.palette.secondary.main}`,
  margin: "auto",
  marginTop: 30,
  background: theme.palette.background.default,
  boxShadow: theme.shadows[2],
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 22,
  textAlign: "center",
  marginTop: theme.spacing(1.5),
}));

const ProfileTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 15,
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.primary // White text in dark mode
      : theme.palette.common.white, // White text in light mode
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark // Dark background in dark mode
      : theme.palette.secondary.main, // Red background in light mode for contrast
  borderRadius: 8,
  padding: "2px 12px",
  margin: "0 auto",
  marginTop: theme.spacing(0.5),
  display: "inline-block",
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  background: theme.palette.background.default,
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: 8,
  transition: "background 0.2s, color 0.2s, border 0.2s",
  "&:hover": {
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    border: `1.5px solid ${theme.palette.secondary.main}`,
  },
  width: 40,
  height: 40,
}));

const AnimatedTypography = styled(Typography)<{ phase: string }>(
  ({ theme, phase }) => ({
    color: theme.palette.secondary.main,
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    "&::after": {
      content: '"|"',
      marginLeft: "2px",
      animation: "blink 1s step-end infinite",
      opacity: phase === "deleting" ? 0 : 1,
    },
    "@keyframes blink": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0 },
    },
  }),
);

const socialLinks = [
  { title: "GitHub Profile", icon: GitHub, key: "github" },
  { title: "LinkedIn Profile", icon: LinkedIn, key: "linkedin" },
  { title: "Portfolio", icon: Code, key: "portfolio" },
];

const AvatarCard: React.FC = () => {
  const theme = useTheme();
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [hasAvatarError, setHasAvatarError] = useState(false);
  const words = React.useMemo(
    () => ["Automation", "Analysis", "Engineering"],
    [],
  );
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const animate = () => {
      const currentWord = words[index];
      if (phase === "typing") {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
          timeout = setTimeout(animate, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setPhase("deleting");
            animate();
          }, pauseDuration);
        }
      } else if (phase === "deleting") {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeout = setTimeout(animate, deletingSpeed);
        } else {
          setPhase("typing");
          setIndex((prev) => (prev + 1) % words.length);
          timeout = setTimeout(animate, typingSpeed);
        }
      }
    };
    timeout = setTimeout(animate, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, index, phase, words]);

  const profileData = {
    name: profile.fullName,
    title: "Digital Transformation",
    avatarUrl: profile.avatarImageUrl,
    github: profile.githubUrl,
    linkedin: profile.linkedInUrl,
    portfolio: profile.portfolioUrl,
  };
  const avatarSrc =
    hasAvatarError || !profileData.avatarUrl
      ? IMAGE_FALLBACKS.profile
      : profileData.avatarUrl;

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <CardWrapper>
      <StyledCard elevation={3}>
        {/* <AccentBar /> */}
        <ProfileAvatar
          src={avatarSrc}
          alt={profileData.name}
          imgProps={{
            onError: () => {
              if (avatarSrc !== IMAGE_FALLBACKS.profile) {
                setHasAvatarError(true);
              }
            },
          }}
        />
        <AnimatedTypography variant="subtitle2" phase={phase}>
          {displayText}
        </AnimatedTypography>
        <ProfileName variant="h5">{profileData.name}</ProfileName>
        <ProfileTitle variant="subtitle1">{profileData.title}</ProfileTitle>
        <Divider
          sx={{
            mt: 2,
            width: "80%",
            mx: "auto",
            backgroundColor: theme.palette.divider,
          }}
        />
        <SocialLinks>
          {socialLinks
            .filter(({ key }) => profileData[key as keyof typeof profileData])
            .map(({ title, icon: Icon, key }) => (
              <Tooltip key={key} title={title}>
                <SocialButton
                  onClick={() =>
                    handleSocialClick(
                      profileData[key as keyof typeof profileData] as string,
                    )
                  }
                  aria-label={title}
                >
                  <Icon />
                </SocialButton>
              </Tooltip>
            ))}
        </SocialLinks>
      </StyledCard>
    </CardWrapper>
  );
};

export default AvatarCard;
