"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { SITE_CONFIG } from "@/data/profile";
import { useSceneUI } from "./PersistentScene";

interface CommandItem {
  id: string;
  group: "Navigation" | "Case Studies" | "Quick Actions";
  label: string;
  hint: string;
  keywords: string;
  action: () => void;
}

export default function CommandPalette() {
  const router = useRouter();
  const { isPaletteOpen, closePalette, is3DEnabled, toggle3D, showToast } =
    useSceneUI();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-home",
        group: "Navigation",
        label: "Home",
        hint: "/",
        keywords: "home index landing main 홈",
        action: () => {
          router.push("/");
          closePalette();
        },
      },
      {
        id: "nav-projects",
        group: "Navigation",
        label: "Projects Archive",
        hint: "/projects",
        keywords: "projects archive portfolio work 아카이브 프로젝트",
        action: () => {
          router.push("/projects");
          closePalette();
        },
      },
      {
        id: "nav-about",
        group: "Navigation",
        label: "About",
        hint: "/about",
        keywords: "about profile skills contact 소개",
        action: () => {
          router.push("/about");
          closePalette();
        },
      },
    ];

    const projectItems: CommandItem[] = PROJECTS.map((project) => ({
      id: `project-${project.slug}`,
      group: "Case Studies",
      label: `${project.id} — ${project.title}`,
      hint: project.category,
      keywords: `${project.title} ${project.subtitle} ${project.category} ${project.techStack.join(" ")}`,
      action: () => {
        router.push(`/projects/${project.slug}`);
        closePalette();
      },
    }));

    const quickItems: CommandItem[] = [
      {
        id: "action-copy-email",
        group: "Quick Actions",
        label: `Copy Email (${SITE_CONFIG.email})`,
        hint: "Clipboard",
        keywords: "email copy contact mail 이메일 복사 연락처",
        action: () => {
          void navigator.clipboard?.writeText(SITE_CONFIG.email);
          showToast(`Email copied: ${SITE_CONFIG.email}`);
          closePalette();
        },
      },
      {
        id: "action-github",
        group: "Quick Actions",
        label: "Open GitHub Profile",
        hint: "github.com/Default-Plus ↗",
        keywords: "github repo code 깃허브",
        action: () => {
          window.open(SITE_CONFIG.githubUrl, "_blank", "noopener,noreferrer");
          closePalette();
        },
      },
      {
        id: "action-toggle-3d",
        group: "Quick Actions",
        label: is3DEnabled ? "Disable 3D Aurora Grid" : "Enable 3D Aurora Grid",
        hint: is3DEnabled ? "Currently ON" : "Currently OFF",
        keywords: "3d webgl aurora shader performance 배경 토글",
        action: () => {
          toggle3D();
          showToast(is3DEnabled ? "3D Aurora disabled" : "3D Aurora enabled");
          closePalette();
        },
      },
    ];

    return [...navItems, ...projectItems, ...quickItems];
  }, [router, closePalette, is3DEnabled, toggle3D, showToast]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    );
  }, [items, query]);

  const clampedIndex =
    filteredItems.length === 0
      ? 0
      : Math.min(activeIndex, filteredItems.length - 1);

  useEffect(() => {
    if (!isPaletteOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [isPaletteOpen]);

  if (!isPaletteOpen) return null;

  const handleClose = () => {
    setQuery("");
    setActiveIndex(0);
    closePalette();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length
      );
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        filteredItems.length === 0
          ? 0
          : (prev - 1 + filteredItems.length) % filteredItems.length
      );
      return;
    }
    if (e.key === "Enter" && filteredItems[clampedIndex]) {
      e.preventDefault();
      const target = filteredItems[clampedIndex];
      setQuery("");
      setActiveIndex(0);
      target.action();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick command palette"
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-5 backdrop-blur-md sm:pt-[14vh]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden border border-white/15 bg-zinc-950/95 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search projects, pages, or actions..."
            className="w-full bg-transparent text-base text-white placeholder-gray-500 outline-none sm:text-sm"
          />
          <button
            type="button"
            onClick={handleClose}
            className="ml-3 shrink-0 border border-white/10 px-2.5 py-1 text-[10px] font-mono text-gray-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[64dvh] overflow-y-auto py-2 sm:max-h-[55vh]">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs font-mono text-gray-500">
              No matching commands for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const showGroupHeader =
                idx === 0 || filteredItems[idx - 1].group !== item.group;
              const isSelected = idx === clampedIndex;
              return (
                <React.Fragment key={item.id}>
                  {showGroupHeader && (
                    <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500">
                      {item.group}
                    </div>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => {
                      setQuery("");
                      setActiveIndex(0);
                      item.action();
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors sm:py-2.5 ${
                      isSelected
                        ? "bg-blue-600/15 text-white"
                        : "text-gray-300 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="truncate text-sm font-medium sm:text-sm">
                      {item.label}
                    </span>
                    <span
                      className={`shrink-0 text-[10px] font-mono ${
                        isSelected ? "text-blue-400" : "text-gray-500"
                      }`}
                    >
                      {item.hint}
                    </span>
                  </button>
                </React.Fragment>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[10px] font-mono text-gray-600">
          <span className="sm:hidden">Tap to select</span>
          <span className="hidden sm:inline">↑↓ Navigate · Enter Select</span>
          <span>DEFAULT_PLUS // CMD</span>
        </div>
      </div>
    </div>
  );
}
