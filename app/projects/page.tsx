"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Link from 'next/link';
import AuroraGrid from '../components/AuroraGrid';

export default function ProjectsPage() {
  const projects = [
    { id: "01", title: "Visual Identity", category: "Branding", year: "2026" },
    { id: "02", title: "Future Interface", category: "UI/UX Design", year: "2025" },
    { id: "03", title: "Seamless Flow", category: "Web Interaction", year: "2025" },
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

      <nav className="fixed top-0 w-full z-30 flex justify-between items-center p-10">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-500 transition-colors">
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </Link>
        <Link href="/" className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-white transition-colors">
          Exit
        </Link>
      </nav>

      <main className="relative z-20 pt-40 pb-20 px-10 md:px-20">
        <header className="mb-24">
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">Archive<span className="text-blue-600">.</span></h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-32 max-w-7xl mx-auto">
          {projects.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="aspect-[16/9] bg-gray-900 border border-white/5 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">{item.id} // {item.category}</span>
                  <h3 className="text-4xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-500">{item.title}</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-600 mb-1">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}