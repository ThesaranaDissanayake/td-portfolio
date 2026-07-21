import { Grid } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import KImageBox from "./KImageBox";
import SkillCard from "./SkillCard";
import Reveal from "@/components/Reveal";
import { IMAGE_FALLBACKS, SITE_IMAGES } from "@/lib/images";

const communityCards = [
  {
    title: "School Technology Society",
    subtitle: "Former Member",
    date: "School years",
    description:
      "Participated in school technology activities and built early interest in practical computing, technical problem solving, and collaborative learning.",
  },
  {
    title: "School Rugby Team",
    subtitle: "Former Member",
    date: "School years",
    description:
      "Developed teamwork, discipline, resilience, and communication through competitive school sports participation.",
  },
];

const Volunteering = () => {
  return (
    <OneColumnSection
      title={"Community & Gallary"}
      eyebrow="Involvement"
      sectionDescription={
        <Reveal sx={{ width: "100%" }}>
          <KImageBox
            imageArray={SITE_IMAGES.community}
            fallbackSrc={IMAGE_FALLBACKS.community}
            height="400px"
            autoTransition
            transitionInterval={4500}
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
        </Reveal>
      }
      sectionBody={
        <Grid container spacing={3}>
          {communityCards.map((card, index) => (
            <Grid item xs={12} md={6} key={card.title}>
              <Reveal delay={(index % 2) * 0.1} sx={{ height: "100%" }}>
                <SkillCard
                  title={card.title}
                  subtitle={card.subtitle}
                  date={card.date}
                  description={card.description}
                  zoomInAnimation
                />
              </Reveal>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default Volunteering;
