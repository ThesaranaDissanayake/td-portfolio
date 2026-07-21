"use client";
import React from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import ProjectCard from "@/app/projects/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { featuredPortfolioProjects } from "@/features/projects.config";

const FeaturedProjects = () => {
  const projects = featuredPortfolioProjects.slice(0, 3);

  if (projects.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Reveal>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Featured projects"
          subtitle="A few systems and automation workflows I have designed, built, or supported recently."
        />
      </Reveal>
      <Grid container spacing={3} justifyContent="center">
        {projects.map((project, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={project.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Reveal delay={i * 0.12} sx={{ width: "100%" }}>
              <ProjectCard project={project} />
            </Reveal>
          </Grid>
        ))}
      </Grid>
      <Stack alignItems="flex-start" sx={{ mt: 5 }}>
        <Button
          component={Link}
          href="/projects"
          disableRipple
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "text.primary",
            px: 0,
            fontWeight: 600,
            borderRadius: 0,
            borderBottom: "1px solid transparent",
            "&:hover": {
              backgroundColor: "transparent",
              borderBottomColor: "text.primary",
            },
          }}
        >
          View all projects
        </Button>
      </Stack>
    </Box>
  );
};

export default FeaturedProjects;
