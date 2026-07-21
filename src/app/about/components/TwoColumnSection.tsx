import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

interface TwoColumnSectionProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  title?: string;
  eyebrow?: string;
}

const TwoColumnSection = ({
  leftComponent,
  rightComponent,
  title,
  eyebrow = "About me",
}: TwoColumnSectionProps) => {
  return (
    <Box
      sx={{
        mt: { xs: 3, md: 0 },
        height: "fit-content",
        pb: title && { xs: 3, md: 8 },
      }}
    >
      {title && (
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} />
        </Reveal>
      )}
      <Grid container spacing={{ xs: 2, md: 5 }} alignItems="stretch">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {leftComponent}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {rightComponent}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TwoColumnSection;
