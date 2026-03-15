"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Link from 'next/link';
import AuroraGrid from '../components/AuroraGrid';

export default function AboutPage() {
  return (
    /* 수정: overflow-hidden을 삭제하여 스크롤이 가능하게 함 */
    <div className="min-h-screen bg-black text-white font-sans relative page-animate">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none">
        <Canvas camera={{ position: [0, 15, 30], fov: 60 }}>
          <Suspense fallback={null}>
            <AuroraGrid />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation: z-index를 높이고 pointer-events 설정을 정리 */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-10">
        <Link href="/" className="text-xl font-black tracking-tighter hover:text-blue-500 transition-colors">
          DEFAULT<span className="text-blue-500">_</span>PLUS
        </Link>
        <Link href="/" className="text-[10px] font-bold tracking-widest text-gray-500 uppercase hover:text-white transition-colors">
          Exit
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-20 pt-48 pb-32 px-10 md:px-20 max-w-6xl mx-auto">
        
        {/* Identity Section */}
        <section className="mb-48">
          <div className="text-[10px] font-mono tracking-[0.6em] text-emerald-500 uppercase mb-8">
            CORE VALUE
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12">
            DESIGNING <br /> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">NEW STANDARD.</span>
          </h2>
          <p className="text-xl md:text-3xl text-gray-400 font-light leading-relaxed max-w-4xl">
            Pay attention to the <strong>BASICS</strong>. <br />
            For your better <strong>UX</strong>.
          </p>
        </section>

        {/* Contact Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-24 border-t border-white/10">
          <div>
            <span className="text-[10px] font-mono text-blue-500 tracking-[0.4em] uppercase mb-8 block">Contact</span>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
              Always <br /> Anywhere
            </h3>
          </div>
          
          <div className="space-y-12">
            <div className="group">
              <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] block mb-4">Email</span>
              <a 
                href="mailto:default_plus@naver.com" 
                className="text-2xl md:text-4xl font-bold hover:text-blue-500 transition-all duration-300 border-b border-transparent hover:border-blue-500 pb-2"
              >
                default_plus@naver.com
              </a>
            </div>
            
            <div className="flex gap-16">
              <div className="group">
                <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] block mb-4">GitHub</span>
                <a href="#" className="text-sm font-bold hover:text-emerald-500 transition-colors tracking-widest">@DEFAULT_PLUS</a>
              </div>
              <div className="group">
                <span className="text-[9px] text-gray-600 uppercase tracking-[0.3em] block mb-4">Discord</span>
                <a href="#" className="text-sm font-bold hover:text-emerald-500 transition-colors tracking-widest">@DEFAULT_PLUS</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 p-10 text-center text-[9px] font-mono text-gray-700 tracking-[0.5em] uppercase">
        © 2026 Crafted by Default_Plus
      </footer>
    </div>
  );
}