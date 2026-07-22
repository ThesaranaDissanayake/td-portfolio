"use client";
import React, { useMemo, useState } from "react";
import {
  Box,
  Container,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  paginatePortfolioProjects,
  searchPortfolioProjects,
} from "@/features/projects.config";
import ProjectCard from "./components/ProjectCard";

const LIMIT = 6;

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const result = useMemo(() => {
    const filtered = searchPortfolioProjects(search);
    return paginatePortfolioProjects(filtered, page, LIMIT);
  }, [page, search]);

  const projects = result.data;
  const totalPages = result.pagination.totalPages;

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", pb: { xs: 6, md: 10 } }}>
      <PageHero
        eyebrow="Sample Selected work"
        title="Digital systems and automation work"
        subtitle="A collection of production systems, research work, workflow automation, reporting, and operational tools built to solve practical business problems."
      >
        <Stack alignItems="flex-start">
          <TextField
            name="selected-work-search"
            placeholder="Search projects..."
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ mr: 1, color: "text.disabled", fontSize: 20 }}
                />
              ),
            }}
            sx={{
              width: { xs: "100%", sm: 380 },
              "& .MuiInputBase-root": {
                borderRadius: "2px",
                px: 2,
                background: (theme) => theme.palette.background.paper,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "divider",
              },
            }}
          />
        </Stack>
      </PageHero>

      {projects.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            Nothing matches your search.
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {projects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 3) * 0.1}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="secondary"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "2px",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Projects;
