import { Typography } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import { profile } from "@/features/profile.config";
import { IMAGE_FALLBACKS } from "@/lib/images";

const WhoAmI = () => {
  return (
    <TwoColumnSection
      title={"Who Am I"}
      rightComponent={
        <KImageBox
          src={profile.profileImageUrl}
          alt={`${profile.fullName} portrait`}
          fallbackSrc={IMAGE_FALLBACKS.profile}
          height={{ xs: "420px", md: "100%" }}
          sx={{
            borderRadius: "3px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            minHeight: { md: "480px" },
            objectFit: "cover",
          }}
        />
      }
      leftComponent={
        <Typography
          variant={"body1"}
          sx={(theme) => ({
            fontSize: { xs: 15, md: 17 },
            lineHeight: 1.9,
            color: "text.secondary",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: { xs: 3, md: 4 },
            borderRadius: "3px",
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
          })}
        >
          I am a results-driven Information Technology graduate with hands-on
          experience in software engineering, data analytics, ERP systems,
          automation, and digital transformation. I specialize in converting
          complex business requirements and manual workflows into scalable,
          reliable solutions, including automation pipelines, internal tools,
          reporting dashboards, SOP documentation, and web-based applications.
          <br />
          <br />
          My work focuses on system design, full SDLC execution, process
          improvement, workflow automation, data validation, and implementation
          of practical business technology solutions. I have experience working
          with modern web technologies, databases, automation tools, cloud
          platforms, ERP workflow environments, and cross-functional business
          teams.
          <br />
          <br />I am passionate about building secure, efficient, and
          maintainable solutions that reduce manual effort, improve data
          accuracy, streamline operations, and deliver measurable business value
          through technology.
        </Typography>
      }
    />
  );
};

export default WhoAmI;
