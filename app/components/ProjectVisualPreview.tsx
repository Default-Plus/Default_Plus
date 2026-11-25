import React from "react";
import type { Project } from "@/data/projects";

interface ProjectVisualPreviewProps {
  project: Project;
  variant?: "card" | "hero";
}

const ACCENT_STYLES = {
  emerald: {
    glow: "from-emerald-500/20 via-emerald-400/5 to-transparent",
    badge: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  blue: {
    glow: "from-blue-500/20 via-blue-400/5 to-transparent",
    badge: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  },
  purple: {
    glow: "from-purple-500/20 via-purple-400/5 to-transparent",
    badge: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  amber: {
    glow: "from-amber-500/20 via-amber-400/5 to-transparent",
    badge: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  },
} as const;

function SignatureGraphic({ slug }: { slug: string }) {
  switch (slug) {
    case "yeobaek":
      return (
        <div className="flex w-full max-w-[260px] flex-col gap-2.5 border border-white/10 bg-black/55 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[9px] font-mono text-gray-400">
            <div className="flex gap-2">
              <span className="text-emerald-400">일상</span>
              <span>메모</span>
              <span>할 일</span>
            </div>
            <span className="text-emerald-400/80">● Synced</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-28 rounded-sm bg-white/30" />
            <div className="h-1.5 w-full rounded-sm bg-white/10" />
            <div className="h-1.5 w-4/5 rounded-sm bg-white/10" />
          </div>
          <div className="mt-1 flex items-center gap-2 text-[9px] font-mono text-gray-400">
            <span className="inline-block h-2.5 w-2.5 border border-emerald-400/70 bg-emerald-400/25" />
            <span>3-Way Diff · Drive AppData</span>
          </div>
        </div>
      );

    case "cafe-de-receipt":
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-end gap-1.5 border border-white/10 bg-black/55 px-3.5 py-3">
            {[45, 78, 35, 90, 60, 50].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <div className="relative h-12 w-1.5 overflow-hidden bg-white/10">
                  <div
                    className="absolute right-0 bottom-0 left-0 bg-blue-400/80"
                    style={{ height: `${height}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-28 border border-dashed border-white/20 bg-white/[0.04] p-3 font-mono text-[8px] text-gray-300">
            <div className="border-b border-dashed border-white/15 pb-1 text-center text-blue-300">
              CAFÉ RECEIPT
            </div>
            <div className="mt-1.5 space-y-1 text-gray-400">
              <div className="flex justify-between">
                <span>RAIN</span>
                <span>0.65</span>
              </div>
              <div className="flex justify-between">
                <span>JAZZ</span>
                <span>0.40</span>
              </div>
              <div className="flex justify-between">
                <span>BREW</span>
                <span>0.55</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "archive-cat":
      return (
        <div className="flex items-center gap-2.5 text-[9px] font-mono">
          <div className="border border-white/15 bg-black/60 px-2.5 py-2 text-gray-300">
            MiniLM
            <div className="text-[8px] text-purple-400">Local Vec</div>
          </div>
          <span className="text-purple-400">→</span>
          <div className="border border-purple-400/40 bg-purple-500/15 px-2.5 py-2 text-white">
            ChromaDB
            <div className="text-[8px] text-purple-300">Persistent</div>
          </div>
          <span className="text-purple-400">→</span>
          <div className="border border-white/15 bg-black/60 px-2.5 py-2 text-gray-300">
            Gemini
            <div className="text-[8px] text-emerald-400">Grounded</div>
          </div>
        </div>
      );

    case "bowone-portfolio":
      return (
        <div className="grid w-full max-w-[240px] grid-cols-3 gap-2">
          <div className="col-span-2 flex h-16 flex-col justify-between border border-amber-400/30 bg-amber-500/10 p-2 font-mono text-[8px] text-amber-200">
            <span>270+ ASSETS</span>
            <span className="text-white/50">schema.json</span>
          </div>
          <div className="h-16 border border-white/10 bg-white/[0.04]" />
          <div className="h-10 border border-white/10 bg-white/[0.03]" />
          <div className="col-span-2 flex h-10 items-center justify-between border border-white/10 bg-black/60 px-2.5 font-mono text-[8px] text-gray-400">
            <span>CI/CD Pipeline</span>
            <span className="text-emerald-400">Verified</span>
          </div>
        </div>
      );

    case "exam-hub":
      return (
        <div className="w-full max-w-[240px] space-y-2.5 border border-white/10 bg-black/55 p-3.5">
          <div className="flex items-center justify-between text-[9px] font-mono">
            <span className="text-blue-400">Q.14 / 20</span>
            <span className="text-emerald-400">92% ACC</span>
          </div>
          <div className="h-1 w-full bg-white/10">
            <div className="h-full w-3/4 bg-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[8px] font-mono text-gray-400">
            <div className="border border-white/10 px-2 py-1">A. Option</div>
            <div className="border border-blue-500/50 bg-blue-500/15 px-2 py-1 text-blue-200">
              B. Correct ✓
            </div>
          </div>
        </div>
      );

    case "nsmc-sentiment-lab":
    default:
      return (
        <div className="flex items-center gap-4">
          <div className="grid grid-cols-4 gap-1 border border-white/10 bg-black/55 p-2.5">
            {[
              0.9, 0.2, 0.35, 0.15, 0.25, 0.85, 0.4, 0.2, 0.3, 0.5, 0.92, 0.65,
              0.1, 0.3, 0.7, 0.88,
            ].map((val, i) => (
              <div
                key={i}
                className="h-3.5 w-3.5 bg-purple-400"
                style={{ opacity: val }}
              />
            ))}
          </div>
          <div className="space-y-1 font-mono text-[9px]">
            <div className="text-purple-300">BERT vs Scratch</div>
            <div className="text-gray-400">NSMC 200K</div>
            <div className="text-emerald-400">Attention Map</div>
          </div>
        </div>
      );
  }
}

export default function ProjectVisualPreview({
  project,
  variant = "card",
}: ProjectVisualPreviewProps) {
  const accent = ACCENT_STYLES[project.accent];
  const isHero = variant === "hero";

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-zinc-950 ${
        isHero
          ? "min-h-[260px] p-8 md:min-h-[320px] md:p-10"
          : "aspect-[16/10] p-5 md:p-6"
      } flex flex-col justify-between transition-colors duration-300 group-hover:border-blue-500/40`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.glow} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative z-10 flex items-center justify-between gap-3">
        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-400">
          {project.id} {"//"} {project.category}
        </span>
        <span
          className={`border px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest ${accent.badge}`}
        >
          {project.status} · {project.year}
        </span>
      </div>

      <div className="relative z-10 my-4 flex flex-1 items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
        <SignatureGraphic slug={project.slug} />
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] pt-3">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, isHero ? 7 : 4).map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-black/50 px-2 py-0.5 text-[9px] font-mono text-gray-300"
            >
              {tech}
            </span>
          ))}
          {!isHero && project.techStack.length > 4 && (
            <span className="px-1.5 py-0.5 text-[9px] font-mono text-gray-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
        {!isHero && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 transition-colors group-hover:text-white">
            Read Case Study →
          </span>
        )}
      </div>
    </div>
  );
}
