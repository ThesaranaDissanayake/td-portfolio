"use client";
import React from "react";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const highlights = [
  {
    icon: <CodeIcon />,
    title: "Digital solution design",
    description:
      "Scalable web-based systems and internal tools shaped around business requirements, reliable workflows, and practical day-to-day operations.",
  },
  {
    icon: <StorageIcon />,
    title: "Automation & process improvement",
    description:
      "Automation pipelines, SOP documentation, workflow mapping, and exception handling that reduce manual effort and improve process control.",
  },
  {
    icon: <CloudQueueIcon />,
    title: "Data & reporting systems",
    description:
      "Dashboards, data validation routines, KPI reporting, and operational insights built with databases, Excel, Power BI, and cloud-ready tools.",
  },
];

const Highlights = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="What I do"
          title="Turning operations into reliable systems & automation."
          subtitle="From process discovery to implementation, I build technology that makes business work clearer, faster, and easier to measure."
        />
      </Reveal>
      <Grid container spacing={0}>
        {highlights.map((item, i) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Reveal delay={i * 0.12} sx={{ height: "100%" }}>
              <Stack
                spacing={2.5}
                sx={{
                  height: "100%",
                  p: { xs: 3, md: 4 },
                  borderTop: `1px solid ${theme.palette.divider}`,
                  borderLeft: {
                    xs: "none",
                    md: i === 0 ? "none" : `1px solid ${theme.palette.divider}`,
                  },
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(244,239,231,0.03)"
                        : "rgba(27,23,18,0.03)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box sx={{ color: "secondary.main", display: "flex" }}>
                    {item.icon}
                  </Box>
                  <Typography
                    variant="overline"
                    sx={{ color: "text.disabled" }}
                  >
                    {`0${i + 1}`}
                  </Typography>
                </Stack>
                <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  {item.description}
                </Typography>
              </Stack>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Highlights;
