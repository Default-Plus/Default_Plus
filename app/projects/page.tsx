"use client";

import React, { Suspense, useState } from 'react';
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
  role: string;
  credits?: string;
  highlights: string[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  notionUrl?: string;
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "01",
      title: "Café De Receipt",
      category: "Interactive / Web Audio",
      year: "2026",
      description: "Web Audio API 노드 그래프 기반 멀티트랙 앰비언트 믹서 & 영수증 인터랙션 웹 애플리케이션",
      role: "Solo Full-Stack & Audio Engineering",
      highlights: [
        "Web Audio API 노드 그래프 구축 및 지수 감쇠(setTargetAtTime)를 통한 볼륨 조작 시 팝핑 노이즈 제거",
        "브라우저 Autoplay Policy 대응 및 AudioContext 생명주기(ctx.close) 관리로 메모리 누수 방지",
        "CSS clip-path 물리 영수증 애니메이션 및 html2canvas 기반 고해상도 PNG 내보내기 구현"
      ],
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
      role: "Solo AI Pipeline & Bot Architecture",
      highlights: [
        "로컬 다국어 임베딩 모델(MiniLM-L12-v2) 도입으로 임베딩 API 비용 절감 및 저지연 벡터 검색 구현",
        "디스크 기반 영구 벡터 저장소(PersistentClient) 설계로 프로세스 재시작 후에도 지식 영속성 확보",
        "실시간 지식 인덱싱, 로컬 문서 동기화 및 LIFO 기반 롤백(!학습취소) 커맨드 파이프라인 구축"
      ],
      techStack: ["Python", "ChromaDB", "Gemini API", "Discord.py", "RAG"],
      githubUrl: "https://github.com/Default-Plus/archive-cat-rag",
    },
    {
      id: "03",
      title: "BOWONE Portfolio",
      category: "Web Architecture / Collaboration",
      year: "2026",
      description: "멀티미디어 아티스트 포트폴리오 리뉴얼을 위한 확장형 데이터 스키마 설계 및 배포·보안 파이프라인 구축",
      role: "Initial Architecture, Data Migration & Security Review",
      credits: "Editorial UI/UX & CMS Implementation by BOWONE",
      highlights: [
        "270여 개 기존 미디어 자산과 메타데이터를 정규화된 JSON 스키마로 마이그레이션하여 유지보수성 극대화",
        "GitHub–Vercel CI/CD 파이프라인 및 비개발자 인수인계 가이드 구축으로 디자이너의 자율적 UI/CMS 확장 지원",
        "퍼블릭/프라이빗 레포지토리 분리 구조 설계 및 OAuth 세션 가드·리다이렉트 보안 취약점 점검"
      ],
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "CI/CD"],
      demoUrl: "https://portfolio-bowone.vercel.app/",
      // Notion 상세 정리 후 아래 주석을 해제하고 URL을 연결하세요.
      // notionUrl: "https://www.notion.so/...",
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
                <div
                  onClick={() => setSelectedProject(item)}
                  className="cursor-pointer aspect-[16/9] bg-gray-950 border border-white/10 mb-8 relative overflow-hidden flex flex-col justify-between p-6 hover:border-blue-500/40 transition-colors"
                >
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

                <h3
                  onClick={() => setSelectedProject(item)}
                  className="cursor-pointer text-3xl md:text-4xl font-bold tracking-tight mb-2 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300"
                >
                  {item.title}
                </h3>
                <p className="text-[11px] font-mono text-gray-500 mb-4">
                  Role: {item.role}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-6">
                  {item.githubUrl && (
                    <a
                      href={item.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      GitHub ↗
                    </a>
                  )}
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
                  {item.notionUrl && (
                    <a
                      href={item.notionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors flex items-center gap-1.5"
                    >
                      Notion Doc ↗
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(item)}
                  className="text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  Details +
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 케이스 스터디 상세 모달 */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-950 border border-white/15 max-w-2xl w-full p-8 md:p-10 relative space-y-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                  {selectedProject.id} // {selectedProject.category}
                </span>
                <h3 className="text-3xl font-black tracking-tight mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono text-gray-500 hover:text-white uppercase tracking-widest"
              >
                Close [ESC]
              </button>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">{selectedProject.description}</p>

            <div className="bg-white/[0.03] border border-white/10 p-4 space-y-1">
              <div className="text-[11px] font-mono text-blue-400">
                ● My Role: <span className="text-gray-200">{selectedProject.role}</span>
              </div>
              {selectedProject.credits && (
                <div className="text-[11px] font-mono text-gray-400">
                  ● Collaboration: <span className="text-gray-300">{selectedProject.credits}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400">
                Engineering Highlights
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {selectedProject.highlights.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="text-blue-500 font-mono text-xs mt-1">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedProject.techStack.map((tech) => (
                <span key={tech} className="text-[10px] font-mono px-2.5 py-1 bg-white/5 text-gray-300 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-white hover:text-blue-400 uppercase tracking-wider"
                >
                  GitHub Repository ↗
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-blue-400 hover:text-blue-300 uppercase tracking-wider"
                >
                  Live Deployment ↗
                </a>
              )}
              {selectedProject.notionUrl && (
                <a
                  href={selectedProject.notionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider"
                >
                  Notion Case Study ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}