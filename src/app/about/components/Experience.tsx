import { Typography } from "@mui/material";
import SkillCard from "./SkillCard";
import OneColumnSection from "./OneColumnSection";
import TimelineList from "./TimelineList";

const experienceCards = [
  {
    title: "Junior Executive - SCM Digital Transformation",
    subtitle: "EFL Global - Sri Lanka",
    date: "2026 - Present",
    descriptions: [
      "Analyze operational processes to identify inefficiencies, bottlenecks, manual gaps, and improvement opportunities.",
      "Design and implement digital solutions that transform manual workflows into structured, scalable, and reliable systems.",
      "Manage SDLC activities including requirement analysis, solution design, development, testing, documentation, implementation, and continuous improvement.",
      "Coordinate with business users, IT teams, operations teams, and cross-functional stakeholders to gather requirements and implement system changes.",
      "Develop automation solutions, internal tools, reporting workflows, and process digitization initiatives using software engineering best practices.",
      "Prepare SOPs, business rules, user guides, technical implementation notes, and process documentation.",
    ],
  },
  {
    title: "Intern - Operations Analyst",
    subtitle: "EFL Global - Sri Lanka",
    date: "22 Jan 2024 - 30 Sep 2024",
    descriptions: [
      "Gained practical exposure to freight forwarding operations, documentation standards, organizational workflows, and inter-departmental coordination.",
      "Supported Power BI and Excel reporting, including data accuracy validation, trend analysis, dashboard support, and operational performance monitoring.",
      "Documented business processes to identify bottlenecks and support process standardization.",
      "Gained exposure to VBA/macros, automation logic, low-code application development, workflow automation, and digital transformation initiatives.",
      "Developed understanding of KPI measurement, dashboard design, root-cause analysis, and process efficiency improvement.",
    ],
  },
  {
    title: "Data Processing / Analyzing Associate",
    subtitle: "Adelanka (Pvt) Ltd - Sri Lanka | Production Department",
    date: "10 Aug 2020 - 08 May 2021",
    descriptions: [
      "Entered and recorded music metadata from electronic and hardcopy source materials into dedicated metadata processing systems used for royalty reporting.",
      "Verified processed data to ensure accuracy above company standards.",
      "Identified and reconciled routine and complex metadata input discrepancies.",
      "Supported weekly and monthly production deadlines through accurate data processing and timely task completion.",
      "Built early professional experience in structured data handling, accuracy validation, discrepancy reconciliation, and production-based data operations.",
    ],
  },
];

const renderList = (items: string[]) => (
  <>
    {items.map((item) => (
      <li key={item}>
        <Typography variant={"caption"} sx={{ p: 0 }}>
          {item}
        </Typography>
      </li>
    ))}
  </>
);

const Experience = () => {
  return (
    <OneColumnSection
      title={"Professional Experience"}
      eyebrow="Career"
      sectionBody={
        <TimelineList
          activeIndex={0}
          items={experienceCards.map((card) => (
            <SkillCard
              key={card.title}
              title={card.title}
              subtitle={card.subtitle}
              date={card.date}
              listDescription={renderList(card.descriptions)}
            />
          ))}
        />
      }
    />
  );
};

export default Experience;
