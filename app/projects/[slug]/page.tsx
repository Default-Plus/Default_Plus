import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAdjacentProjects,
  getProjectBySlug,
  PROJECTS,
} from "@/data/projects";
import { SITE_CONFIG } from "@/data/profile";
import ProjectVisualPreview from "@/app/components/ProjectVisualPreview";
import CopyButton from "@/app/components/CopyButton";
import YeobaekDownloadControl from "@/app/components/YeobaekDownloadControl";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | DEFAULT_PLUS Case Study`,
      description: project.description,
      url: `${SITE_CONFIG.url}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(project.slug);
  const shareUrl = `${SITE_CONFIG.url}/projects/${project.slug}`;

  return (
    <div className="min-h-screen page-animate">
      <main className="mx-auto max-w-5xl px-5 pt-24 pb-20 sm:px-6 sm:pt-32 md:px-12 md:pt-36 md:pb-28">
        {/* Top Action Bar */}
        <div className="mb-8 flex items-center justify-between gap-3 border-b border-white/10 pb-4 sm:mb-10 sm:pb-5">
          <Link
            href="/projects"
            className="text-xs font-mono uppercase tracking-[0.18em] text-gray-400 transition-colors hover:text-white sm:tracking-[0.2em]"
          >
            <span className="sm:hidden">← Archive</span>
            <span className="hidden sm:inline">← Back to Archive</span>
          </Link>
          <CopyButton
            value={shareUrl}
            label="Copy Link"
            toastText="Case study URL copied"
          />
        </div>

        {/* Hero Header */}
        <header className="mb-10 space-y-5 sm:mb-12 sm:space-y-6">
          <div className="flex flex-wrap items-center gap-2.5 text-[10px] font-mono uppercase tracking-[0.18em] sm:gap-3 sm:text-[11px] sm:tracking-[0.22em]">
            <span className="text-emerald-400">
              {project.id} {"//"} {project.category}
            </span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-400">{project.year}</span>
            <span className="border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[9px] text-gray-200 sm:px-2.5 sm:text-[10px]">
              {project.status}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
            {project.title}
          </h1>

          <p className="text-sm leading-relaxed text-gray-300 sm:text-base md:text-xl">
            {project.description}
          </p>

          <div className="space-y-1.5 border border-white/10 bg-white/[0.03] p-4 md:p-5">
            <div className="text-xs font-mono text-blue-400">
              ● Role: <span className="text-gray-100">{project.role}</span>
            </div>
            {project.credits && (
              <div className="text-xs font-mono text-gray-400">
                ● Collaboration:{" "}
                <span className="text-gray-200">{project.credits}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black transition-colors hover:bg-blue-600 hover:text-white sm:py-2.5"
              >
                Live Deployment ↗
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-white/20 bg-white/[0.04] px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white transition-colors hover:border-white/50 hover:bg-white/10 sm:py-2.5"
              >
                GitHub Repository ↗
              </a>
            )}
            {project.downloadApiPath && project.releaseUrl ? (
              <YeobaekDownloadControl
                apiPath={project.downloadApiPath}
                releasesUrl={project.releaseUrl}
                variant="hero"
              />
            ) : (
              project.releaseUrl && (
                <a
                  href={project.releaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/20 sm:py-2.5"
                >
                  Releases (.exe / .apk) ↗
                </a>
              )
            )}
          </div>
        </header>

        {/* Key Metrics Strip */}
        <section className="mb-8 divide-y divide-white/10 border border-white/10 bg-zinc-950/80 sm:mb-10 sm:grid sm:grid-cols-3 sm:gap-4 sm:divide-y-0 sm:border-0 sm:bg-transparent">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between gap-4 px-4 py-3.5 sm:block sm:border sm:border-white/10 sm:bg-zinc-950/80 sm:p-5"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
                {metric.label}
              </div>
              <div className="text-right text-xs font-bold text-white sm:mt-2 sm:text-left sm:text-sm md:text-base">
                {metric.value}
              </div>
            </div>
          ))}
        </section>

        {/* Visual Banner */}
        <div className="group mb-12 sm:mb-16">
          <ProjectVisualPreview project={project} variant="hero" />
        </div>

        {/* 01 Overview */}
        <section className="mb-12 space-y-3 sm:mb-16 sm:space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            01 {"//"} Overview &amp; Context
          </h2>
          <p className="text-sm leading-7 text-gray-300 sm:leading-8 md:text-base">
            {project.overview}
          </p>
        </section>

        {/* 02 System Architecture */}
        <section className="mb-12 space-y-5 sm:mb-16 sm:space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            02 {"//"} System Architecture
          </h2>
          <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2">
            {project.architecture.map((step, index) => (
              <div
                key={step.layer}
                className="relative border border-white/10 bg-zinc-950/80 p-5 transition-colors hover:border-blue-500/40 sm:p-6"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                    Step 0{index + 1} · {step.layer}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-400 md:text-sm">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 Engineering Highlights */}
        <section className="mb-12 space-y-4 sm:mb-16 sm:space-y-5">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            03 {"//"} Engineering Highlights
          </h2>
          <ul className="space-y-3 border border-white/10 bg-zinc-950/70 p-5 sm:p-6 md:p-8">
            {project.highlights.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-200 sm:gap-3 sm:text-sm md:text-base"
              >
                <span className="mt-0.5 font-mono text-xs text-blue-500 sm:mt-1">
                  →
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 04 Key Architectural Decisions */}
        <section className="mb-12 space-y-5 sm:mb-16 sm:space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            04 {"//"} Key Architectural Decisions
          </h2>
          <div className="space-y-4">
            {project.decisions.map((decision) => (
              <div
                key={decision.topic}
                className="space-y-4 border border-white/10 bg-zinc-950/80 p-5 sm:p-6 md:p-7"
              >
                <h3 className="text-base font-bold text-white md:text-lg">
                  {decision.topic}
                </h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="border border-white/10 bg-white/[0.02] p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                      Alternative Considered
                    </div>
                    <div className="mt-1 text-xs text-gray-300 md:text-sm">
                      {decision.considered}
                    </div>
                  </div>
                  <div className="border border-emerald-500/30 bg-emerald-500/[0.06] p-3.5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                      Chosen Approach
                    </div>
                    <div className="mt-1 text-xs font-medium text-white md:text-sm">
                      {decision.chosen}
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-gray-400 md:text-sm">
                  {decision.rationale}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Troubleshooting */}
        <section className="mb-12 space-y-5 sm:mb-16 sm:space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            05 {"//"} Troubleshooting Log
          </h2>
          <div className="space-y-4">
            {project.troubleshooting.map((item, idx) => (
              <div
                key={idx}
                className="space-y-3 border border-white/10 bg-zinc-950/80 p-5 sm:p-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    Issue 0{idx + 1}
                  </span>
                  <p className="mt-1 text-sm font-medium text-white">
                    {item.problem}
                  </p>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    Resolution
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-gray-300 md:text-sm">
                    {item.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06 Future Roadmap (Optional) */}
        {project.roadmap && project.roadmap.length > 0 && (
          <section className="mb-12 space-y-5 sm:mb-16 sm:space-y-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
              06 {"//"} Future Roadmap &amp; Next Steps
            </h2>
            <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-3">
              {project.roadmap.map((item) => (
                <div
                  key={item.phase}
                  className="border border-white/10 bg-zinc-950/80 p-5 transition-colors hover:border-emerald-500/40 sm:p-6"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
                    {item.phase}
                  </span>
                  <h3 className="mt-2 text-sm font-bold text-white sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="mb-14 space-y-4 sm:mb-20">
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
            {project.roadmap && project.roadmap.length > 0 ? "07" : "06"}{" "}
            {"//"} Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-mono text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Adjacent Case Studies */}
        <nav
          aria-label="Adjacent case studies"
          className="grid grid-cols-1 gap-3.5 border-t border-white/10 pt-8 sm:grid-cols-2 sm:gap-4 sm:pt-10"
        >
          {prev && (
            <Link
              href={`/projects/${prev.slug}`}
              className="group border border-white/10 bg-zinc-950/70 p-5 transition-colors hover:border-blue-500/40 sm:p-6"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                ← Previous Project
              </div>
              <div className="mt-2 text-base font-bold text-white transition-colors group-hover:text-blue-400 sm:text-lg">
                {prev.id} · {prev.title}
              </div>
            </Link>
          )}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group border border-white/10 bg-zinc-950/70 p-5 text-left transition-colors hover:border-blue-500/40 sm:p-6 sm:text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Next Project →
              </div>
              <div className="mt-2 text-base font-bold text-white transition-colors group-hover:text-blue-400 sm:text-lg">
                {next.id} · {next.title}
              </div>
            </Link>
          )}
        </nav>
      </main>
    </div>
  );
}
