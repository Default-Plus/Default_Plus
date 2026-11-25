import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "여백(Yeobaek), Café De Receipt, ARCHIVE_CAT, BOWONE Portfolio, Exam Hub, NSMC Sentiment Lab 등 Default_Plus 프로젝트 아카이브.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
