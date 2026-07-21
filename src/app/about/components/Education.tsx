import { Stack } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";
import { IMAGE_FALLBACKS, SITE_IMAGES } from "@/lib/images";

const Education = () => {
  return (
    <TwoColumnSection
      title={"Education"}
      eyebrow="Learning"
      rightComponent={
        <Stack
          direction={"column"}
          sx={{
            width: "100%",
            gap: 2,
            alignItems: "center",
          }}
        >
          <SkillCard
            date={"06/2021 - 07/2025"}
            title={"BSc (Hons) in Information Technology"}
            subtitle={"Sri Lanka Institute of Information Technology (SLIIT)"}
            description={"Specializing in Information Technology"}
          />
          <SkillCard
            date={"2019"}
            title={"G.C.E. Advanced Level - Technology Stream"}
            subtitle={"Bandaranayake College, Gampaha"}
            description={
              "Science for Technology - C | Bio Systems Technology - C | Agricultural Science - C"
            }
          />
        </Stack>
      }
      leftComponent={
        <KImageBox
          imageArray={SITE_IMAGES.education}
          fallbackSrc={IMAGE_FALLBACKS.education}
          height="400px"
          autoTransition
          transitionInterval={5000}
          sx={{
            borderRadius: "3px",
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
          }}
          imageSx={{
            objectFit: "cover",
          }}
        />
      }
    />
  );
};

export default Education;
