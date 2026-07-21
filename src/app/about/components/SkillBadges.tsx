"use client";
import { Box } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import SkillIcon from "./SkillIcon";
import CollapsibleItems from "./CollapsibleItems";

const skillsConfig = [
  { name: "React", image: "/skills/react-original-wordmark.png" },
  { name: "Next.js", image: "/skills/nextjs-original-wordmark.png" },
  { name: "Python", image: "/skills/python-original-wordmark.png" },
  { name: "TypeScript", image: "/skills/typescript-original.png" },
  { name: "JavaScript", image: "/skills/javascript-original.png" },
  { name: "Java", image: "/skills/java-original-wordmark.png" },
  { name: "Node.js", image: "/skills/nodejs-plain-wordmark.png" },
  { name: "PostgreSQL", image: "/skills/postgresql-plain-wordmark.png" },
  { name: "MongoDB", image: "/skills/mongodb-plain-wordmark.png" },
  { name: "Azure", image: "/skills/azure-original-wordmark.png" },
  { name: "Git", image: "/skills/git-original-wordmark.png" },
  { name: "GitHub", image: "/skills/github-original-wordmark.png" },
  { name: "Docker", image: "/skills/docker.png" },
  { name: "Power BI", image: "/skills/powerbi.png" },
  { name: "Firebase", image: "/skills/firebase.png" },
  { name: "Prisma", image: "/skills/prisma.png" },
  { name: "n8n", image: "/skills/n8n.png" },
  { name: "UiPath", image: "/skills/ui-path.png" },
  { name: "Power Automate", image: "/skills/microsoft-power-automate.png" },
  { name: "Power Apps", image: "/skills/powerapp.png" },
  { name: "Excel", image: "/skills/excel.png" },
  { name: "VBA", image: "/skills/vba.png" },
  { name: "Playwright", image: "/skills/Playwright.png" },
  { name: "TensorFlow", image: "/skills/tensorflow.png" },
];

const SkillBadges = () => {
  return (
    <OneColumnSection
      title={"Skill Badges"}
      eyebrow="Toolbox"
      sectionDescription={
        <CollapsibleItems
          items={skillsConfig}
          initialCount={18}
          moreLabel={(n) => `Show ${n} more`}
        >
          {(visible) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                maxWidth: "100%",
              }}
            >
              {visible.map((skill) => (
                <SkillIcon
                  key={skill.name}
                  image={skill.image}
                  placeholderText={skill.name}
                />
              ))}
            </Box>
          )}
        </CollapsibleItems>
      }
    />
  );
};

export default SkillBadges;
