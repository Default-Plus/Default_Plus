import React from "react";
import type { Metadata } from "next";
import {
  CORE_PRINCIPLES,
  SITE_CONFIG,
  SKILL_GROUPS,
  TIMELINE,
} from "@/data/profile";
import CopyButton from "../components/CopyButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "Default_Plus — Pay attention to the Basics. For your better UX.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen page-animate">
      <main className="mx-auto max-w-6xl px-5 pt-28 pb-20 sm:px-6 sm:pt-36 md:px-12 md:pt-44 md:pb-28">
        {/* Identity Section */}
        <section className="mb-20 sm:mb-28 md:mb-36">
          <div className="mb-6 text-[10px] font-mono uppercase tracking-[0.45em] text-emerald-500 sm:mb-8 sm:tracking-[0.6em]">
            CORE VALUE
          </div>
          <h1 className="mb-8 text-[2.65rem] font-black leading-[0.94] tracking-tighter sm:mb-12 sm:text-6xl md:text-8xl">
            DESIGNING <br /> THE{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              NEW STANDARD.
            </span>
          </h1>
          <p className="max-w-4xl text-lg font-light leading-relaxed text-gray-400 sm:text-xl md:text-3xl">
            Pay attention to the <strong className="font-bold text-white">BASICS</strong>.{" "}
            <br />
            For your better <strong className="font-bold text-white">UX</strong>.
          </p>

          {/* 3 Core Principles */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-5 md:grid-cols-3">
            {CORE_PRINCIPLES.map((item) => (
              <div
                key={item.index}
                className="border border-white/10 bg-zinc-950/75 p-5 transition-colors hover:border-blue-500/40 sm:p-6"
              >
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-blue-400">
                  Principle {item.index}
                </div>
                <h2 className="mt-2.5 text-base font-bold text-white sm:mt-3 sm:text-lg">
                  {item.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-gray-400 sm:mt-2.5 md:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-20 border-t border-white/10 pt-14 sm:mb-28 sm:pt-20 md:mb-36">
          <div className="mb-9 sm:mb-12">
            <span className="mb-2.5 block text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 sm:mb-3">
              Timeline
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
              Background
            </h2>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {TIMELINE.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="grid grid-cols-1 gap-3 py-6 transition-colors hover:bg-white/[0.02] sm:gap-4 sm:py-7 md:grid-cols-12 md:items-baseline md:px-4"
              >
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 md:col-span-4">
                  <span className="border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                    {item.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-1.5 md:col-span-8">
                  <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <h3 className="text-base font-bold text-white md:text-lg">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <span className="text-xs font-mono text-gray-500">
                        · {item.subtitle}
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400 md:text-sm">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="mb-20 border-t border-white/10 pt-14 sm:mb-28 sm:pt-20 md:mb-36">
          <div className="mb-9 sm:mb-12">
            <span className="mb-2.5 block text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 sm:mb-3">
              Capabilities
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight md:text-5xl">
              Tech Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.category}
                className="flex flex-col justify-between border border-white/10 bg-zinc-950/75 p-5 sm:p-6 md:p-7"
              >
                <div>
                  <h3 className="text-base font-bold text-white md:text-lg">
                    {group.category}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
                    {group.subtitle}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-mono text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="grid grid-cols-1 gap-12 border-t border-white/10 pt-14 sm:gap-16 sm:pt-20 md:grid-cols-2 md:gap-24">
          <div>
            <span className="mb-5 block text-[10px] font-mono uppercase tracking-[0.4em] text-blue-500 sm:mb-8">
              Contact
            </span>
            <h2 className="text-4xl font-black uppercase leading-tight tracking-tighter md:text-6xl">
              Always <br /> Anywhere
            </h2>
          </div>

          <div className="space-y-10 sm:space-y-12">
            <div className="group">
              <span className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-gray-500 sm:mb-4">
                Email
              </span>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="break-all border-b border-transparent pb-1 text-lg font-bold transition-all duration-300 hover:border-blue-500 hover:text-blue-500 sm:pb-2 sm:text-2xl md:text-3xl"
                >
                  {SITE_CONFIG.email}
                </a>
                <CopyButton
                  value={SITE_CONFIG.email}
                  label="Copy"
                  toastText={`Email copied: ${SITE_CONFIG.email}`}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-10 sm:gap-16">
              <div className="group">
                <span className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-gray-500 sm:mb-4">
                  GitHub
                </span>
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold tracking-widest transition-colors hover:text-emerald-500"
                >
                  {SITE_CONFIG.githubHandle} ↗
                </a>
              </div>
              <div className="group">
                <span className="mb-3 block text-[9px] uppercase tracking-[0.3em] text-gray-500 sm:mb-4">
                  Discord
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold tracking-widest">
                    {SITE_CONFIG.discordHandle}
                  </span>
                  <CopyButton
                    value={SITE_CONFIG.discordCopyValue}
                    label="Copy"
                    toastText={`Discord copied: ${SITE_CONFIG.discordHandle}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 py-8 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-gray-700 sm:p-10 sm:tracking-[0.5em]">
        © 2026 Crafted by {SITE_CONFIG.handle}
      </footer>
    </div>
  );
}
