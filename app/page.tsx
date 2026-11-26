import React from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/data/profile";

export default function Home() {
  const featured = PROJECTS[0];

  return (
    <div className="relative flex min-h-[100dvh] flex-col justify-between page-animate">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16 md:px-12 md:pt-32 md:pb-20">
        <div className="grid w-full grid-cols-1 items-end gap-10 sm:gap-14 md:grid-cols-2 md:gap-16">
          <div className="space-y-4 sm:space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.42em] text-emerald-400 sm:tracking-[0.55em]">
              {SITE_CONFIG.role}
            </div>
            <h1 className="text-[3.3rem] font-black leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-[7.2rem]">
              Beyond <br /> the <br />
              <span className="bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 bg-clip-text italic text-transparent">
                Default.
              </span>
            </h1>
          </div>

          <div className="flex flex-col items-start space-y-7 pb-1 sm:space-y-10 sm:pb-2 md:items-end">
            <div className="space-y-3 sm:space-y-4 md:text-right">
              <p className="text-3xl font-black leading-tight tracking-tighter sm:text-4xl md:text-5xl">
                <strong>Default</strong>에<br />
                <strong>Plus</strong>하다.
              </p>
              <div className="h-[2px] w-12 bg-blue-600 md:ml-auto" />
              <p className="text-[10px] font-medium italic uppercase tracking-[0.18em] text-gray-400 sm:text-[11px] sm:tracking-[0.2em]">
                {SITE_CONFIG.tagline}
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/projects"
                className="group relative flex items-center justify-center overflow-hidden bg-white px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.28em] text-black transition-all hover:bg-blue-600 hover:text-white active:scale-95 sm:px-10 sm:py-4 sm:tracking-[0.35em]"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1.5">
                  Enter View
                </span>
                <span className="absolute right-4 opacity-0 transition-all duration-300 group-hover:right-3.5 group-hover:opacity-100 sm:right-6 sm:group-hover:right-5">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-center border border-white/15 bg-black/45 px-5 py-3.5 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-gray-300 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.06] hover:text-white active:scale-95 sm:px-7 sm:py-4 sm:tracking-[0.28em]"
              >
                About
              </Link>
            </div>
          </div>
        </div>

        {/* Latest Featured Work Strip */}
        <div className="mt-10 sm:mt-16 sm:border-t sm:border-white/10 sm:pt-6 md:mt-20">
          <Link
            href={`/projects/${featured.slug}`}
            className="group flex flex-col justify-between gap-2.5 border border-white/10 bg-zinc-950/70 p-4 backdrop-blur-sm transition-colors hover:border-blue-500/40 sm:flex-row sm:items-center sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-blue-400">
                Latest Archive {"//"} {featured.id}
              </span>
              <span className="text-sm font-bold text-white transition-colors group-hover:text-blue-400">
                {featured.title}
              </span>
              <span className="hidden text-xs text-gray-400 lg:inline">
                — {featured.description}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-white">
              View Case Study →
            </span>
          </Link>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-7xl items-end justify-between px-5 py-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 sm:px-6 sm:py-7 sm:tracking-[0.35em] md:px-12">
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
