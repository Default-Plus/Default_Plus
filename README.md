# Default_Plus Portfolio

Next.js 14 App Router 기반으로 제작된 소프트웨어 엔지니어링 포트폴리오 웹사이트.

- **Live Site**: [https://default-plus.vercel.app/](https://default-plus.vercel.app/)
- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Vercel

---

## Key Projects Showcase

### 1. 여백 / Yeobaek (Local-First Minimal Productivity App)
- **Repository**: [Default-Plus/yeobaek](https://github.com/Default-Plus/yeobaek)
- **Live Demo**: [yeobaek-theta.vercel.app](https://yeobaek-theta.vercel.app/)
- **Releases**: [Windows `.exe` & Android `.apk`](https://github.com/Default-Plus/yeobaek/releases)
- **Role**: Solo Product Design, Architecture & Multi-Platform Engineering
- **Stack**: Next.js 15, TypeScript, Tailwind CSS, Dexie.js, Tiptap, Google Drive API v3, Electron, Capacitor
- **Highlights**:
  - Dexie.js(IndexedDB) 로컬 우선 저장소와 Google Drive API v3(`appDataFolder`) 3-Way 메타데이터 Diff 동기화 엔진 구축 및 오프라인 동시 수정 시 충돌 사본 자동 보존
  - 웹/데스크탑(GIS)과 네이티브 모바일(RFC 7636 OAuth 2.0 PKCE + 시스템 브라우저) 크로스플랫폼 인증 및 Tiptap 인라인 체크리스트·날짜 트리거 에디터 구현
  - 단일 Next.js 코드베이스 기반 Electron(로컬 정적 서버·`electron-updater`) 및 Capacitor(Android/iOS) 패키징과 GitHub Actions 통합 릴리즈 자동화

### 2. ARCHIVE_CAT (Hybrid RAG Knowledge Assistant)
- **Repository**: [Default-Plus/archive-cat-rag](https://github.com/Default-Plus/archive-cat-rag)
- **Stack**: Python 3.14, ChromaDB (Persistent), Sentence-Transformers, Google Gemini API, Discord.py
- **Highlights**:
  - 로컬 다국어 임베딩(`paraphrase-multilingual-MiniLM-L12-v2`)을 활용한 API 비용 절감 및 빠른 벡터 연산
  - 디스크 기반 영구 벡터 저장소(`PersistentClient`) 구축으로 세션 재부팅 후에도 지식 영속성 보장
  - 런타임 지식 동적 인덱싱, 로컬 문서 동기화, LIFO 기반 롤백(`!학습취소`) 파이프라인 구현

### 3. Café De Receipt (Interactive Web Audio Mixer)
- **Repository**: [Default-Plus/Cafe_De_Receipt](https://github.com/Default-Plus/Cafe_De_Receipt)
- **Live Demo**: [cafe-de-receipt.vercel.app](https://cafe-de-receipt.vercel.app/)
- **Stack**: Next.js 14, TypeScript, Web Audio API, Tailwind CSS, html2canvas
- **Highlights**:
  - Web Audio API 노드 그래프 구축 및 실시간 슬라이더 볼륨 조작 시 팝핑 잡음을 차단하는 `setTargetAtTime` 지수 감쇠 적용
  - 브라우저 Autoplay Policy 대응 및 메모리 누수 방지 라이프사이클(`ctx.close()`) 관리
  - CSS `clip-path` 기반 물리 영수증 애니메이션 및 `html2canvas` 래스터라이징 PNG 다운로드 지원

### 4. BOWONE Portfolio & CMS Architecture (Collaboration)
- **Live Demo**: [portfolio-bowone.vercel.app](https://portfolio-bowone.vercel.app/)
- **Role**: Initial Architecture, Data Migration, CI/CD & Security Review (UI/UX Design & CMS by BOWONE)
- **Stack**: Next.js, TypeScript, Tailwind CSS, Vercel, GitHub Actions/API
- **Highlights**:
  - 270여 개 기존 미디어 자산 및 메타데이터를 정규화된 JSON 스키마로 마이그레이션하여 유지보수성과 렌더링 확장성 확보
  - GitHub–Vercel 자동 배포 파이프라인 및 비개발자 운영 가이드 구축을 통해 아티스트의 자율적 UI/CMS 고도화 기반 마련
  - 퍼블릭/프라이빗 레포 분리 구조 설계 및 OAuth 세션 가드·리다이렉트 보안 허점 점검
---

## Project Structure

```text
Default_Plus/
├── src/
│   ├── app/                # App Router 기반 페이지 및 메타데이터
│   ├── components/         # 모듈화된 UI 컴포넌트
│   └── ...
├── public/                 # 파비콘 및 정적 에셋
├── package.json
└── tsconfig.json
```

---

## Getting Started

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드 검증
npm run build
```