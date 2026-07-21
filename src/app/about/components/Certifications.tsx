"use client";
import { Grid } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import SkillCard from "./SkillCard";
import CollapsibleItems from "./CollapsibleItems";
import Reveal from "@/components/Reveal";

type CertificationCard = {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageAspectRatio?: string;
};

const certificationCards: CertificationCard[] = [
  {
    title: "SMARTGENCON 2025 Publication",
    subtitle:
      "CattleSite: Integrated Veterinary Application for Enhanced Cow Health Management",
    date: "Oct 10-11, 2025",
    description:
      "Research publication for an IoT and machine-learning based veterinary application focused on cow health management.",
    image: "/certifications/SMARTGENCON 2025 Publication.jpg",
    imageAlt:
      "SMARTGENCON 2025 conference certificate for CattleSite research publication",
    imageAspectRatio: "1754 / 1241",
  },
  {
    title: "Security for Software Development Managers (LFD125)",
    subtitle: "The Linux Foundation / OpenSSF",
    date: "Apr 05, 2026",
    description:
      "Linux Foundation certificate covering security considerations for software development management.",
    image: "/certifications/cert-1.jpg",
    imageAlt:
      "Security for Software Development Managers certificate from The Linux Foundation and OpenSSF",
    imageAspectRatio: "2577 / 1996",
  },
  {
    title: "Introduction to Linux (LFS101)",
    subtitle: "The Linux Foundation",
    date: "Mar 31, 2026",
    description:
      "Linux Foundation certificate covering Linux fundamentals and introductory open-source system concepts.",
    image: "/certifications/cert-2.jpg",
    imageAlt: "Introduction to Linux certificate from The Linux Foundation",
    imageAspectRatio: "2577 / 1996",
  },
  {
    title: "Authentication and Authorization for WebAPI (LFEL1004)",
    subtitle: "The Linux Foundation",
    date: "Apr 02, 2026",
    description:
      "Linux Foundation certificate covering authentication and authorization concepts for Web API development.",
    image:
      "/certifications/Authentication and Authorization for WebAPI LFEL1004.jpg",
    imageAlt:
      "Authentication and Authorization for WebAPI LFEL1004 certificate from The Linux Foundation",
    imageAspectRatio: "2577 / 1996",
  },
  {
    title: "Introduction to Agile Development and Scrum",
    subtitle: "IBM / Coursera",
    date: "Jul 15, 2023",
    description:
      "Coursera certificate authorized by IBM covering Agile development practices and Scrum fundamentals.",
    image:
      "/certifications/Introduction to Agile Development and Scrum_page-0001.jpg",
    imageAlt:
      "Introduction to Agile Development and Scrum certificate from IBM and Coursera",
    imageAspectRatio: "1650 / 1275",
  },
  {
    title: "Career Essentials in System Administration",
    subtitle: "Microsoft / LinkedIn Learning",
    date: "Sep 01, 2025",
    description:
      "Microsoft and LinkedIn Learning certificate covering system administration, network administration, and network security foundations.",
    image:
      "/certifications/CertificateOfCompletion_Career Essentials in System Administration by Microsoft and LinkedIn_page-0001.jpg",
    imageAlt:
      "Career Essentials in System Administration certificate from Microsoft and LinkedIn Learning",
    imageAspectRatio: "1650 / 1275",
  },
  {
    title: "Introduction to Data Analytics for Business",
    subtitle: "University of Colorado Boulder / Coursera",
    date: "Jul 18, 2023",
    description:
      "Coursera certificate authorized by the University of Colorado Boulder covering business-focused data analytics foundations.",
    image: "/certifications/Introduction to Data Analytics for Business.jpg",
    imageAlt:
      "Introduction to Data Analytics for Business certificate from University of Colorado Boulder and Coursera",
    imageAspectRatio: "1650 / 1275",
  },
  {
    title: "Preparing Data for Analysis with Microsoft Excel",
    subtitle: "Microsoft / Coursera",
    date: "Apr 01, 2024",
    description:
      "Coursera certificate authorized by Microsoft covering Excel-based data preparation for analysis workflows.",
    image: "/certifications/Preparing Data for Analysis with Microsoft Excel.jpg",
    imageAlt:
      "Preparing Data for Analysis with Microsoft Excel certificate from Microsoft and Coursera",
    imageAspectRatio: "1650 / 1275",
  },
  {
    title: "SQL Intermediate",
    subtitle: "SoloLearn",
    date: "Jul 14, 2023",
    description:
      "SoloLearn certificate covering intermediate SQL concepts for querying, filtering, and working with relational data.",
    image: "/certifications/SQL Intermediate.jpg",
    imageAlt: "SQL Intermediate certificate from SoloLearn",
    imageAspectRatio: "1754 / 1238",
  },
  {
    title: "Six Sigma White Belt",
    subtitle: "Six Sigma Online",
    date: "Apr 28, 2026",
    description:
      "Six Sigma Online certification recognizing completion of Six Sigma White Belt requirements.",
    image: "/certifications/Six Sigma White Belt.jpg",
    imageAlt: "Six Sigma White Belt certificate from Six Sigma Online",
    imageAspectRatio: "1280 / 989",
  },
  {
    title: "CargoWise Certified Specialist",
    subtitle: "WiseTech Academy",
    date: "Apr 21, 2025",
    description:
      "WiseTech Academy certification as a CargoWise Certified Specialist across customs, forwarding, liner and agency, transport, and warehouse workflows.",
    image: "/certifications/CargoWise Certified Specialist.png.jpg",
    imageAlt: "CargoWise Certified Specialist certificate from WiseTech Academy",
    imageAspectRatio: "567 / 800",
  },
  {
    title: "Diploma in PC Hardware Engineering and Network Administration",
    subtitle: "Pearson Assured / ESOFT Metro Campus",
    date: "Jul 2017",
    description:
      "Pearson Assured programme completed through ESOFT Metro Campus covering PC hardware engineering and network administration.",
    image:
      "/certifications/Pearson Assured Diploma in Hardware Engineering & Networking (Pearson Certificate).jpg",
    imageAlt:
      "Pearson Assured Diploma in PC Hardware Engineering and Network Administration certificate",
    imageAspectRatio: "1653 / 2338",
  },
  {
    title: "Diploma in PC Hardware Engineering & Networking",
    subtitle: "ESOFT Metro Campus",
    date: "May 30, 2017",
    description:
      "ESOFT Metro Campus diploma recognizing completion of PC hardware engineering and networking training.",
    image:
      "/certifications/Pearson Assured Diploma in Hardware Engineering & Networking Certificate.jpg",
    imageAlt:
      "ESOFT Metro Campus Diploma in PC Hardware Engineering and Networking certificate",
    imageAspectRatio: "1636 / 2334",
  },
  {
    title: "Certificate of Web Design for Beginners",
    subtitle: "University of Moratuwa",
    date: "Completed",
    description:
      "Introductory web design certification covering the foundations of building structured web experiences.",
    image:
      "/certifications/Web Development - 1. Web Design for Beginners_Web Design for Beginners E-Certificate (1)_page-0001.jpg",
    imageAlt:
      "Web Design for Beginners certificate from the Centre for Open and Distance Learning, University of Moratuwa",
    imageAspectRatio: "1754 / 1241",
  },
];

const Certifications = () => {
  return (
    <OneColumnSection
      title={"Certifications"}
      eyebrow="Credentials"
      sectionBody={
        <CollapsibleItems
          items={certificationCards}
          initialCount={6}
          moreLabel={(n) => `Show ${n} more`}
        >
          {(visible) => (
            <Grid container spacing={3}>
              {visible.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={card.title}>
                  <Reveal delay={(index % 3) * 0.1} sx={{ height: "100%" }}>
                    <SkillCard
                      title={card.title}
                      subtitle={card.subtitle}
                      date={card.date}
                      description={card.description}
                      image={card.image}
                      imageAlt={card.imageAlt}
                      imageAspectRatio={card.imageAspectRatio}
                      zoomInAnimation
                    />
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          )}
        </CollapsibleItems>
      }
    />
  );
};

export default Certifications;
