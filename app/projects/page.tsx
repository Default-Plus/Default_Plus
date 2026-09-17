"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Link from 'next/link';
import AuroraGrid from '../components/AuroraGrid';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      id: "01",
      title: "Café De Receipt",
      category: "Interactive / Web Audio",
      year: "2026",
      description: "Web Audio API 노드 그래프 기반 멀티트랙 앰비언트 믹서 & 영수증 인터랙션 웹 애플리케이션",
      techStack: ["Next.js 14", "TypeScript", "Web Audio API", "Tailwind CSS"],
      githubUrl: "https://github.com/Default-Plus/Cafe_De_Receipt",
      demoUrl: "https://cafe-de-receipt.vercel.app/",
    },
    {
      id: "02",
      title: "ARCHIVE_CAT",
      category: "AI / Local RAG Engine",
      year: "2026",
      description: "로컬 벡터 DB(ChromaDB)와 Gemini API 기반의 도큐먼트 아카이브 및 런타임 지식 검색 어시스턴트",
      techStack: ["Python", "ChromaDB", "Gemini API", "Discord.py", "RAG"],
      githubUrl: "https://github.com/Default-Plus/archive-cat-rag",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative page-animate">
      <div className="fixed inset-0 z-0 opacity-20">
        <Canvas camera={{ position: [0, 8, 20], fov: 60 }}>
          <Suspense fallback={null}>
            <AuroraGrid />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <nav className="fixed top-0 w-full z-30 flex justify-between items-center p-10 backdrop-blur-sm bg-black/20 border-b border-white/5">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-500 transition-colors">
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </Link>
        <Link href="/" className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-white transition-colors">
          Exit
        </Link>
      </nav>

      <main className="relative z-20 pt-40 pb-28 px-10 md:px-20">
        <header className="mb-24">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
            Archive<span className="text-blue-600">.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 max-w-7xl mx-auto">
          {projects.map((item) => (
            <div key={item.id} className="group flex flex-col justify-between border-b border-white/10 pb-8">
              <div>
                <div className="aspect-[16/9] bg-gray-950 border border-white/10 mb-8 relative overflow-hidden flex flex-col justify-between p-6">
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                      {item.id} // {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-gray-500">{item.year}</span>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed z-10 max-w-md">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 z-10">
                    {item.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300">
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5">
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  GitHub ↗
                </a>
                {item.demoUrl && (
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}