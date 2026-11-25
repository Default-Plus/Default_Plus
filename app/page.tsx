import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/data/profile";

export default function Home() {
  const featured = PROJECTS[0];

  return (
    <div className="relative flex min-h-screen flex-col justify-between page-animate">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-24 md:px-12 md:pt-32">
        <div className="grid w-full grid-cols-1 items-end gap-14 md:grid-cols-2 md:gap-16">
          <div className="space-y-6">
            <div className="text-[10px] font-mono tracking-[0.55em] text-emerald-400 uppercase">
              {SITE_CONFIG.role}
            </div>
            <h1 className="text-6xl font-black leading-[0.86] tracking-[-0.06em] sm:text-7xl md:text-[7.2rem]">
              Beyond <br /> the <br />
              <span className="bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 bg-clip-text italic text-transparent">
                Default.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start space-y-10 pb-2 md:items-end">
            <div className="space-y-4 md:text-right">
              <p className="text-3xl font-black leading-tight tracking-tighter md:text-5xl">
                <strong>Default</strong>에<br />
                <strong>Plus</strong>하다.
              </p>
              <div className="h-[2px] w-12 bg-blue-600 md:ml-auto" />
              <p className="text-[11px] font-medium italic tracking-[0.2em] text-gray-400 uppercase">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group relative flex items-center justify-center overflow-hidden bg-white px-10 py-4 text-[10px] font-black tracking-[0.35em] text-black uppercase transition-all hover:bg-blue-600 hover:text-white active:scale-95"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1.5">
                  Enter View
                </span>
                <span className="absolute right-6 opacity-0 transition-all duration-300 group-hover:right-5 group-hover:opacity-100">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="border border-white/15 bg-black/40 px-7 py-4 text-[10px] font-mono font-bold tracking-[0.28em] text-gray-300 uppercase backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.06] hover:text-white"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Latest Featured Work Strip */}
        <div className="mt-16 border-t border-white/10 pt-6 md:mt-20">
          <Link
            href={`/projects/${featured.slug}`}
            className="group flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-blue-400 uppercase">
                Latest Archive {"//"} {featured.id}
              </span>
              <span className="text-sm font-bold text-white transition-colors group-hover:text-blue-400">
                {featured.title}
              </span>
              <span className="hidden text-xs text-gray-400 lg:inline">
                — {featured.description}
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase transition-all group-hover:translate-x-1 group-hover:text-white">
              View Case Study →
            </span>
          </Link>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 py-7 font-mono text-[9px] tracking-[0.35em] text-gray-500 uppercase md:px-12">
        <div>{SITE_CONFIG.location}</div>
        <div className="hidden items-center gap-1.5 italic text-gray-600 md:inline-flex">
          <span>Press</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span>K to Navigate · {SITE_CONFIG.version}</span>
        </div>
        <div>© 2026 {SITE_CONFIG.handle}</div>
      </footer>
    </div>
  );
}
