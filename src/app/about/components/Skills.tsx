"use client";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import BuildIcon from "@mui/icons-material/Build";
import ComputerIcon from "@mui/icons-material/Computer";
import BoltIcon from "@mui/icons-material/Bolt";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import SkillChip from "./SkillChip";
import {
  languageSkills,
  webSkills,
  databaseSkills,
  cloudSkills,
  toolSkills,
  osSkills,
  frameworkSkills,
} from "@/features/skills.config";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: languageSkills,
    icon: <CodeIcon fontSize="small" />,
  },
  {
    title: "Web Development",
    skills: webSkills,
    icon: <LanguageIcon fontSize="small" />,
  },
  {
    title: "Databases",
    skills: databaseSkills,
    icon: <StorageIcon fontSize="small" />,
  },
  {
    title: "Cloud",
    skills: cloudSkills,
    icon: <CloudQueueIcon fontSize="small" />,
  },
  { title: "Tools", skills: toolSkills, icon: <BuildIcon fontSize="small" /> },
  {
    title: "Systems & Documentation",
    skills: osSkills,
    icon: <ComputerIcon fontSize="small" />,
  },
  {
    title: "Business & Analysis",
    skills: frameworkSkills,
    icon: <BoltIcon fontSize="small" />,
  },
];

const Skills = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ pb: { xs: 3, md: 8 } }}>
      <Reveal>
        <SectionHeading eyebrow="Capabilities" title="Skills" />
      </Reveal>
      <Grid container spacing={3}>
        {skillCategories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={category.title}>
            <Reveal delay={(index % 3) * 0.1} sx={{ height: "100%" }}>
              <Stack
                spacing={2}
                sx={{
                  height: "100%",
                  p: 3,
                  borderRadius: "3px",
                  background: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  transition: "border-color 0.3s ease, transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: theme.palette.text.primary,
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "secondary.main",
                      background: isDark
                        ? "rgba(228,96,46,0.12)"
                        : "rgba(194,65,12,0.08)",
                      border: `1px solid ${
                        isDark ? "rgba(228,96,46,0.28)" : "rgba(194,65,12,0.2)"
                      }`,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: "1rem" }}
                  >
                    {category.title}
                  </Typography>
                </Stack>
                <SkillChip itemList={category.skills} />
              </Stack>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Skills;
