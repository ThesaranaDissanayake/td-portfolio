"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MobileNavigation from "./components/MobileNavigation";
import WhoAmI from "./components/WhoAmI";
import Education from "./components/Education";
import Skills from "./components/Skills";
import SkillBadges from "./components/SkillBadges";
import Certifications from "./components/Certifications";
import Volunteering from "./components/Volunteering";
import Experience from "./components/Experience";
import ContactCTA from "../../components/ContactCTA";

const About = () => {
  const [activeSection, setActiveSection] = useState(1);

  // Create refs for each section
  const whoAmIRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillBadgesRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);
  const volunteeringRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(
    () => [
      { id: 1, text: "Who Am I", ref: whoAmIRef, icon: "PersonIcon" },
      { id: 2, text: "Education", ref: educationRef, icon: "SchoolIcon" },
      {
        id: 3,
        text: "Certifications",
        ref: certificationsRef,
        icon: "WorkspacePremiumIcon",
      },
      { id: 4, text: "Skills", ref: skillsRef, icon: "CodeIcon" },
      { id: 5, text: "Skill Badges", ref: skillBadgesRef, icon: "AppsIcon" },
      {
        id: 6,
        text: "Community",
        ref: volunteeringRef,
        icon: "VolunteerActivismIcon",
      },
      {
        id: 7,
        text: "Experience",
        ref: experienceRef,
        icon: "WorkHistoryIcon",
      },
    ],
    [],
  );

  const scrollToSection = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, offset = 0) => {
      if (ref.current) {
        const top =
          ref.current.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [],
  );

  const handleScroll = useCallback(() => {
    const offset = 220;
    sectionRefs.forEach(({ id, ref }) => {
      const sectionTop = ref.current?.getBoundingClientRect().top;
      const sectionHeight = ref.current?.offsetHeight;
      if (sectionTop !== undefined && sectionHeight !== undefined) {
        if (sectionTop <= offset && sectionTop + sectionHeight > offset) {
          setActiveSection(id);
        }
      }
    });
  }, [sectionRefs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {/* Floating Navigation (Mobile & Desktop) */}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: { xs: "57px", sm: "64px", md: "110px" },
          zIndex: 1201,
        }}
      >
        <MobileNavigation
          activeSection={activeSection}
          sectionRefs={sectionRefs}
          scrollToSection={scrollToSection}
        />
      </Box>

      {/* Main content container */}
      <Container
        // maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          pt: { xs: "7.5rem", md: "12rem" }, // Padding after sticky nav
          px: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          {sectionRefs.map(({ id, text, ref }) => {
            const ComponentMap: { [key: string]: React.ComponentType } = {
              "Who Am I": WhoAmI,
              Education: Education,
              Skills: Skills,
              "Skill Badges": SkillBadges,
              Certifications: Certifications,
              Community: Volunteering,
              Experience: Experience,
            };
            const Component = ComponentMap[text];
            return (
              <Box
                key={id}
                ref={ref}
                sx={{ width: "100%", mb: { xs: 4, md: 6 } }}
              >
                {Component && <Component />}
              </Box>
            );
          })}
        </Box>

        {/* Contact CTA Section - Footer Style */}
        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          <ContactCTA />
        </Box>
      </Container>
    </>
  );
};

export default About;
