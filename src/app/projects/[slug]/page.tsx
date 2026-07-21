import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPortfolioProjectBySlug,
  portfolioProjects,
} from "@/features/projects.config";
import { profile } from "@/features/profile.config";
import ProjectClientPage from "./ProjectClientPage";
import { IMAGE_FALLBACKS, normalizeImageSrc } from "@/lib/images";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const project = getPortfolioProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = project.title;
  const description =
    project.description ||
    project.summary ||
    `View this project by ${profile.fullName}`;
  const coverImage =
    normalizeImageSrc(project.coverImage || project.image) ||
    IMAGE_FALLBACKS.project;

  return {
    title: `${title} | ${profile.fullName}`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      siteName: profile.siteName,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [coverImage],
    },
  };
}

export default function ProjectPage({ params }: PageProps) {
  const projectData = getPortfolioProjectBySlug(params.slug);

  if (!projectData) {
    notFound();
  }

  return <ProjectClientPage projectData={projectData} />;
}
