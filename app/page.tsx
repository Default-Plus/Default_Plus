"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Link from 'next/link';
import AuroraGrid from './components/AuroraGrid'; 

export default function Home() {
  // 배경 로딩 상태 관리
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`min-h-screen bg-black text-white font-sans overflow-hidden relative transition-opacity duration-1000 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      
      {/* 배경 레이어: Canvas의 onCreated를 통해 로딩 완료 시점 파악 */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas 
          camera={{ position: [0, 8, 20], fov: 60 }}
          onCreated={() => {
            // 브라우저 렌더링 부하를 고려해 100ms 정도 아주 살짝 딜레이 후 노출
            setTimeout(() => setIsLoaded(true), 100);
          }}
        >
          <Suspense fallback={null}>
            <AuroraGrid />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* 네비게이션 */}
      <nav className="fixed top-0 w-full z-30 flex justify-between items-center p-10 pointer-events-none">
        <h1 className="text-xl font-black tracking-tighter pointer-events-auto leading-none text-white">
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </h1>
        <div className="flex gap-10 text-[10px] font-bold tracking-widest text-gray-500 pointer-events-auto uppercase">
          <Link href="/projects" className="relative group overflow-hidden">
            <span className="group-hover:text-white transition-colors duration-300">Projects</span>
            <span className="absolute bottom-[-8px] left-0 w-full h-[1px] bg-white scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100" />
          </Link>
          <Link href="/about" className="relative group overflow-hidden">
            <span className="group-hover:text-white transition-colors duration-300">About</span>
            <span className="absolute bottom-[-8px] left-0 w-full h-[1px] bg-white scale-x-0 transition-transform duration-500 origin-left group-hover:scale-x-100" />
          </Link>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <main className="relative z-20 flex flex-col justify-center min-h-screen p-16 md:p-24 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-16 items-end">
          <div className="space-y-6">
            <div className="text-[10px] font-mono tracking-[0.6em] text-emerald-500 uppercase">Developer & Designer</div>
            <h2 className="text-6xl md:text-[7.5rem] font-black leading-[0.85] tracking-[-0.07em]">
              Beyond <br /> the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 italic">Default.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-12 pb-4">
            <div className="space-y-4 md:text-right">
              <p className="text-3xl md:text-5xl font-black tracking-tighter leading-tight"><strong>Default</strong>에<br /><strong>Plus</strong>하다.</p>
              <div className="h-[2px] w-12 bg-blue-600 md:ml-auto" />
              <p className="text-[11px] font-medium tracking-[0.2em] text-gray-500 uppercase italic">Adding Value to the Default.</p>
            </div>
            <div className="pointer-events-auto">
              <Link href="/projects">
                <button className="group relative flex items-center justify-center px-12 py-5 bg-white text-black text-[10px] font-black tracking-[0.4em] uppercase overflow-hidden transition-all hover:bg-blue-600 hover:text-white active:scale-95">
                  <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">Enter View</span>
                  <span className="absolute right-8 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:right-6">→</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full p-10 z-30 flex justify-between items-end text-gray-700 font-mono text-[9px] tracking-[0.4em] uppercase pointer-events-none">
        <div>Seoul / KR</div>
        <div className="hidden md:block italic text-gray-800">System Ready _ v2.0.2</div>
        <div>© 2026 Default_Plus</div>
      </footer>
    </div>
  );
}