import React from "react";
import { Container } from "@mui/material";
import Hero from "@/components/home/Hero";
import TechMarquee from "@/components/home/TechMarquee";
import Highlights from "@/components/home/Highlights";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ overflow: "visible" }}>
      <Hero />
      <TechMarquee />
      <Highlights />
      <FeaturedProjects />
      <ContactCTA />
    </Container>
  );
}
