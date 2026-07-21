export interface Skill {
  id: number;
  label: string;
  color: string;
  level: number;
}

export const languageSkills: Skill[] = [
  { id: 1, label: "Python", color: "#3776AB", level: 90 },
  { id: 2, label: "JavaScript", color: "#F7DF1E", level: 85 },
  { id: 3, label: "TypeScript", color: "#3178C6", level: 85 },
  { id: 4, label: "Java", color: "#007396", level: 75 },
  { id: 5, label: "SQL", color: "#CC2927", level: 85 },
  { id: 6, label: "VBA", color: "#217346", level: 80 },
];

export const webSkills: Skill[] = [
  { id: 7, label: "React", color: "#61DAFB", level: 85 },
  { id: 8, label: "Next.js", color: "#000000", level: 85 },
  { id: 9, label: "Node.js", color: "#339933", level: 80 },
  { id: 10, label: "Playwright", color: "#45BA4B", level: 75 },
  { id: 11, label: "Firebase", color: "#FFCA28", level: 75 },
];

export const databaseSkills: Skill[] = [
  { id: 12, label: "PostgreSQL", color: "#336791", level: 85 },
  { id: 13, label: "MongoDB", color: "#47A248", level: 80 },
  { id: 14, label: "Prisma", color: "#2D3748", level: 80 },
  { id: 15, label: "Data Validation", color: "#0F766E", level: 90 },
];

export const cloudSkills: Skill[] = [
  { id: 16, label: "Azure", color: "#0089D6", level: 75 },
  { id: 17, label: "Docker", color: "#2496ED", level: 75 },
  { id: 18, label: "Windows/Linux VM Operations", color: "#FCC624", level: 75 },
];

export const toolSkills: Skill[] = [
  { id: 19, label: "Power BI", color: "#F2C811", level: 85 },
  { id: 20, label: "Microsoft Excel", color: "#217346", level: 90 },
  { id: 21, label: "Excel Macros", color: "#217346", level: 85 },
  { id: 22, label: "n8n", color: "#EA4B71", level: 80 },
  { id: 23, label: "UiPath", color: "#FA4616", level: 75 },
  { id: 24, label: "Power Automate", color: "#0066FF", level: 80 },
  { id: 25, label: "Microsoft Power Apps", color: "#742774", level: 75 },
  { id: 26, label: "Git/GitHub", color: "#F05032", level: 85 },
];

export const osSkills: Skill[] = [
  { id: 27, label: "System Design", color: "#E4602E", level: 85 },
  { id: 28, label: "Process Mapping", color: "#0EA5E9", level: 90 },
  { id: 29, label: "SOP Documentation", color: "#64748B", level: 90 },
  { id: 30, label: "Technical Documentation", color: "#7C3AED", level: 85 },
];

export const frameworkSkills: Skill[] = [
  { id: 31, label: "Business Process Automation", color: "#C2410C", level: 90 },
  { id: 32, label: "Requirement Analysis", color: "#2563EB", level: 90 },
  { id: 33, label: "User Training", color: "#16A34A", level: 80 },
  { id: 34, label: "Dashboard Development", color: "#F59E0B", level: 85 },
  { id: 35, label: "KPI Reporting", color: "#0891B2", level: 85 },
];

export const allSkills: Skill[] = [
  ...languageSkills,
  ...webSkills,
  ...databaseSkills,
  ...cloudSkills,
  ...toolSkills,
  ...osSkills,
  ...frameworkSkills,
];
