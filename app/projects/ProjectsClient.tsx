"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  PROJECT_FILTERS,
  PROJECTS,
  type ProjectFilterCategory,
} from "@/data/projects";
import ProjectVisualPreview from "../components/ProjectVisualPreview";
import YeobaekDownloadControl from "../components/YeobaekDownloadControl";

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilterCategory>("All");

  const counts = useMemo(() => {
    const map: Record<ProjectFilterCategory, number> = {
      All: PROJECTS.length,
      "Product & Web": 0,
      "AI & Research": 0,
      Collaboration: 0,
    };
    for (const p of PROJECTS) {
      map[p.filterCategory] += 1;
    }
    return map;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.filterCategory === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen page-animate">
      <main className="mx-auto max-w-7xl px-5 pt-24 pb-20 sm:px-6 sm:pt-32 md:px-12 md:pt-40 md:pb-28">
        <header className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 sm:gap-8 md:mb-20 md:flex-row md:items-end">
          <div>
            <div className="mb-3 text-[10px] font-mono uppercase tracking-[0.35em] text-emerald-400 sm:mb-4 sm:tracking-[0.4em]">
              Selected Works · 2026
            </div>
            <h1 className="text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-8xl lg:text-9xl">
              Archive<span className="text-blue-600">.</span>
            </h1>
          </div>

          <p className="max-w-md text-xs leading-relaxed text-gray-400 sm:text-sm">
            기획부터 아키텍처 설계, AI 파이프라인, 크로스플랫폼 배포까지 직접
            구현한 프로젝트 아카이브입니다. 카드를 클릭하면 상세 케이스 스터디로
            이동합니다.
          </p>
        </header>

        {/* Category Filter Tabs (Horizontal scroll strip on mobile) */}
        <div
          role="tablist"
          aria-label="Project categories"
          className="no-scrollbar -mx-5 mb-10 flex flex-nowrap items-center gap-2 overflow-x-auto border-y border-white/10 px-5 py-3.5 sm:mx-0 sm:mb-14 sm:flex-wrap sm:px-0 sm:py-4"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveFilter(filter)}
                className={`inline-flex shrink-0 items-center gap-2 px-3.5 py-2 text-[11px] font-mono uppercase tracking-widest transition-all sm:px-4 ${
                  isSelected
                    ? "bg-white font-bold text-black"
                    : "border border-white/10 bg-white/[0.02] text-gray-400 hover:border-white/30 hover:text-white"
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`text-[10px] ${
                    isSelected ? "text-black/60" : "text-gray-600"
                  }`}
                >
                  {counts[filter]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-x-14 gap-y-14 md:grid-cols-2 md:gap-y-20 lg:gap-x-16">
          {filteredProjects.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between border-b border-white/10 pb-7 sm:pb-8"
            >
              <div>
                <Link
                  href={`/projects/${item.slug}`}
                  className="mb-5 block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:mb-6"
                >
                  <ProjectVisualPreview project={item} variant="card" />
                </Link>

                <Link
                  href={`/projects/${item.slug}`}
                  className="inline-block focus:outline-none"
                >
                  <h2 className="mb-2 text-2xl font-bold tracking-tight transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-blue-400 md:text-3xl">
                    {item.title}
                  </h2>
                </Link>

                <p className="mb-3 text-xs leading-relaxed text-gray-300 sm:text-sm">
                  {item.description}
                </p>

                <p className="text-[11px] font-mono text-gray-500">
                  Role: {item.role}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4 sm:mt-6 sm:gap-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 transition-colors hover:text-blue-300"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {item.downloadApiPath && item.releaseUrl ? (
                    <YeobaekDownloadControl
                      apiPath={item.downloadApiPath}
                      releasesUrl={item.releaseUrl}
                      variant="card"
                    />
                  ) : (
                    item.releaseUrl && (
                      <a
                        href={item.releaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 transition-colors hover:text-emerald-300"
                      >
                        Releases ↗
                      </a>
                    )
                  )}
                  {item.notionUrl && (
                    <a
                      href={item.notionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 transition-colors hover:text-purple-300"
                    >
                      Doc ↗
                    </a>
                  )}
                </div>

                <Link
                  href={`/projects/${item.slug}`}
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-white"
                >
                  Case Study →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
