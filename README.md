# Default_Plus Portfolio

Next.js 14 App Router 기반으로 제작된 소프트웨어 엔지니어링 포트폴리오 웹사이트.

- **Live Site**: [https://default-plus.vercel.app/](https://default-plus.vercel.app/)
- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Vercel

---

## Key Projects Showcase

### 1. ARCHIVE_CAT (Hybrid RAG Knowledge Assistant)
- **Repository**: [Default-Plus/archive-cat-rag](https://github.com/Default-Plus/archive-cat-rag)
- **Stack**: Python 3.14, ChromaDB (Persistent), Sentence-Transformers, Google Gemini API, Discord.py
- **Highlights**:
  - 로컬 다국어 임베딩(`paraphrase-multilingual-MiniLM-L12-v2`)을 활용한 API 비용 절감 및 빠른 벡터 연산
  - 디스크 기반 영구 벡터 저장소(`PersistentClient`) 구축으로 세션 재부팅 후에도 지식 영속성 보장
  - 런타임 지식 동적 인덱싱, 로컬 문서 동기화, LIFO 기반 롤백(`!학습취소`) 파이프라인 구현

### 2. Café De Receipt (Interactive Web Audio Mixer)
- **Repository**: [Default-Plus/Cafe_De_Receipt](https://github.com/Default-Plus/Cafe_De_Receipt)
- **Live Demo**: [cafe-de-receipt.vercel.app](https://cafe-de-receipt.vercel.app/)
- **Stack**: Next.js 14, TypeScript, Web Audio API, Tailwind CSS, html2canvas
- **Highlights**:
  - Web Audio API 노드 그래프 구축 및 실시간 슬라이더 볼륨 조작 시 팝핑 잡음을 차단하는 `setTargetAtTime` 지수 감쇠 적용
  - 브라우저 Autoplay Policy 대응 및 메모리 누수 방지 라이프사이클(`ctx.close()`) 관리
  - CSS `clip-path` 기반 물리 영수증 애니메이션 및 `html2canvas` 래스터라이징 PNG 다운로드 지원

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