# Default_Plus Portfolio

Next.js 16 (App Router / Turbopack) + React Three Fiber 기반으로 제작된 포트폴리오 웹사이트입니다.

- **Live Site**: [https://default-plus.vercel.app/](https://default-plus.vercel.app/)
- **Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS v4, React Three Fiber, Vercel
- **Contact**: `default_plus@naver.com`

---

## Architecture Highlights

- **Persistent Interactive 3D Aurora (`PersistentScene` + `AuroraGrid`)**: `app/layout.tsx` 레벨의 영구 WebGL 컨텍스트로 페이지 전환 시 카메라 포지션만 부드럽게 보간되며, 모바일 경량화·`dispose()` 메모리 해제·`prefers-reduced-motion` 및 CSS 오로라 폴백을 지원합니다.
- **Dedicated Case Study Routes (`/projects/[slug]`)**: `data/projects.ts` 기반 정적 생성(`generateStaticParams`)과 프로젝트별 동적 메타데이터(`generateMetadata`), 시스템 아키텍처·트레이드오프·트러블슈팅·향후 로드맵 섹션을 제공합니다.
- **Quick Command Palette (`Ctrl+K`)**: 빠른 페이지 이동, 프로젝트 검색, 이메일 복사, 3D 배경 토글을 지원합니다.
- **SEO & Dynamic OG**: `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`를 내장합니다.

---

## Key Projects Showcase

### 1. 여백 / Yeobaek (Local-First Minimal Productivity App)
- **Repository**: [Default-Plus/yeobaek](https://github.com/Default-Plus/yeobaek)
- **Live Demo**: [yeobaek-theta.vercel.app](https://yeobaek-theta.vercel.app/)
- **Releases**: [Windows `.exe` & Android `.apk`](https://github.com/Default-Plus/yeobaek/releases)
- **Stack**: Next.js 15, TypeScript, Dexie.js, Tiptap, Google Drive API v3, Electron, Capacitor

### 2. 셈 / Sem (3-Second Quick Entry & Local-First Personal Ledger PWA)
- **Repository**: [Default-Plus/sem-ledger](https://github.com/Default-Plus/sem-ledger)
- **Live Demo**: [sem-ledger.vercel.app](https://sem-ledger.vercel.app/)
- **Stack**: Next.js 15, TypeScript, Tailwind CSS, Dexie.js (IndexedDB), PWA

### 3. Café De Receipt (Interactive Web Audio Mixer)
- **Repository**: [Default-Plus/Cafe_De_Receipt](https://github.com/Default-Plus/Cafe_De_Receipt)
- **Live Demo**: [cafe-de-receipt.vercel.app](https://cafe-de-receipt.vercel.app/)
- **Stack**: Next.js 14, TypeScript, Web Audio API, Tailwind CSS, html2canvas

### 4. ARCHIVE_CAT (Hybrid RAG Knowledge Assistant)
- **Repository**: [Default-Plus/archive-cat-rag](https://github.com/Default-Plus/archive-cat-rag)
- **Stack**: Python, ChromaDB (Persistent), Sentence-Transformers, Gemini API, Discord.py

### 5. BOWONE Portfolio & CMS Architecture (Collaboration)
- **Live Demo**: [portfolio-bowone.vercel.app](https://portfolio-bowone.vercel.app/)
- **Role**: Initial Architecture, Data Migration, CI/CD & Security Review (UI/UX & CMS by BOWONE)
- **Stack**: Next.js, TypeScript, Tailwind CSS, Vercel, CI/CD

### 6. Exam Hub (Structured Exam Quiz & Review Platform)
- **Live Demo**: [exam-hub-gold.vercel.app](https://exam-hub-gold.vercel.app/)
- **Stack**: Next.js, TypeScript, Tailwind CSS, Vercel

### 7. NSMC Sentiment Lab (In Progress — NLP Comparative Study)
- **Topic**: Pretrained Fine-tuned BERT vs. From-Scratch Custom Transformer on NSMC
- **Stack**: Python, PyTorch, Hugging Face Transformers, NLP

---

## Project Structure

```text
Default_Plus/
├── app/
│   ├── about/page.tsx               # 핵심 가치 · 기술 스택 · 연락처
│   ├── components/
│   │   ├── AuroraGrid.tsx           # 인터랙티브 GLSL 셰이더 3D 오로라 격자
│   │   ├── PersistentScene.tsx      # 영구 WebGL 배경 · Fallback · Global UI Context
│   │   ├── Navbar.tsx               # 공통 고정 네비게이션
│   │   ├── CommandPalette.tsx       # Ctrl+K 빠른 검색 팔레트
│   │   ├── CopyButton.tsx           # 원클릭 클립보드 복사 버튼
│   │   └── ProjectVisualPreview.tsx # 프로젝트별 시그니처 비주얼 프리뷰
│   ├── projects/
│   │   ├── page.tsx                 # 아카이브 서버 엔트리
│   │   ├── ProjectsClient.tsx       # 카테고리 필터 & 프로젝트 그리드
│   │   └── [slug]/page.tsx          # 정적 생성 케이스 스터디 상세 페이지
│   ├── globals.css                  # 타이포그래피 · 다크 테마 토큰
│   ├── layout.tsx                   # 루트 레이아웃 · 폰트 · SEO
│   ├── opengraph-image.tsx          # 동적 OG 이미지 생성
│   ├── page.tsx                     # SSR 홈 페이지
│   ├── robots.ts                    # robots.txt
│   └── sitemap.ts                   # 동적 sitemap.xml
├── data/
│   ├── profile.ts                   # 브랜드 · 철학 · 기술 스택 · 연락처 데이터
│   └── projects.ts                  # 프로젝트 & 케이스 스터디 데이터
└── package.json
```

---

## Getting Started

```bash
npm install
npm run dev
npm run lint
npm run build
```
