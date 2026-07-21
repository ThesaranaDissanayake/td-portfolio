import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

interface OneColumnSectionProps {
  sectionDescription?: ReactNode;
  sectionBody?: ReactNode;
  title?: string;
  eyebrow?: string;
}

const OneColumnSection = ({
  sectionDescription,
  sectionBody,
  title,
  eyebrow = "About me",
}: OneColumnSectionProps) => {
  return (
    <Box
      sx={{
        height: "fit-content",
        mt: { xs: 3, md: 0 },
        pb: { xs: 3, md: 8 },
      }}
    >
      {title && (
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Stack direction="column" sx={{ width: "100%" }}>
          {sectionDescription && (
            <Box sx={{ mb: 5, display: "flex", width: "100%" }}>
              {sectionDescription}
            </Box>
          )}
          <Box>{sectionBody}</Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default OneColumnSection;
