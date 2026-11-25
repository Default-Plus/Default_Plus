export type ProjectFilterCategory =
  | "All"
  | "Product & Web"
  | "AI & RAG"
  | "Collaboration";

export type ProjectStatus = "Live" | "Active";

export type ProjectAccent = "blue" | "emerald" | "purple" | "amber";

export interface ArchitectureStep {
  layer: string;
  title: string;
  detail: string;
}

export interface EngineeringDecision {
  topic: string;
  considered: string;
  chosen: string;
  rationale: string;
}

export interface TroubleshootingItem {
  problem: string;
  solution: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  filterCategory: Exclude<ProjectFilterCategory, "All">;
  status: ProjectStatus;
  accent: ProjectAccent;
  year: string;
  description: string;
  overview: string;
  role: string;
  credits?: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
  architecture: ArchitectureStep[];
  decisions: EngineeringDecision[];
  troubleshooting: TroubleshootingItem[];
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  releaseUrl?: string;
  notionUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    slug: "yeobaek",
    title: "여백 (Yeobaek)",
    subtitle: "Local-First Minimal Writing & Personal Productivity App",
    category: "Local-First / Cross-Platform App",
    filterCategory: "Product & Web",
    status: "Live",
    accent: "emerald",
    year: "2026",
    description:
      "타이포그래피 중심의 Local-First 미니멀 글쓰기 & 개인 생산성 앱 (Web · Windows · Android/iOS)",
    overview:
      "메모·할 일·캘린더·리마인더를 방해 요소 없는 차분한 글쓰기 경험 속에 통합한 개인 생산성 앱입니다. 별도의 중앙 DB 서버 운영 비용 없이 사용자의 Google Drive를 개인 클라우드 저장소로 활용해 데이터 소유권과 오프라인 즉시성을 동시에 확보했습니다.",
    role: "Solo Product Design, Architecture & Multi-Platform Engineering",
    metrics: [
      { label: "Platforms", value: "Web · Win · Android · iOS" },
      { label: "Sync Backend", value: "Google Drive AppData" },
      { label: "Sync Strategy", value: "4s Debounce 3-Way Diff" },
    ],
    highlights: [
      "Dexie.js(IndexedDB) 로컬 우선 저장소와 Google Drive API v3(appDataFolder) 3-Way 메타데이터 Diff 동기화 엔진 구축 및 오프라인 동시 수정 시 충돌 사본 자동 보존",
      "웹/데스크탑(GIS)과 네이티브 모바일(RFC 7636 OAuth 2.0 PKCE + 시스템 브라우저) 크로스플랫폼 인증 및 Tiptap 인라인 체크리스트·날짜 트리거 에디터 구현",
      "단일 Next.js 코드베이스 기반 Electron(로컬 정적 서버·자동 업데이트) 및 Capacitor(Android/iOS) 패키징과 GitHub Actions 통합 릴리즈(.exe / .apk) 자동화",
    ],
    architecture: [
      {
        layer: "UI / Editor",
        title: "Next.js 15 + Tiptap Editorial Engine",
        detail:
          "Story → Entry 계층 구조, 플로팅 버블 메뉴, 인라인 체크리스트(`- [ ] `) 및 `@오늘`/`@내일` 날짜 트리거 파싱",
      },
      {
        layer: "Local Storage",
        title: "Dexie.js (IndexedDB) Repository",
        detail:
          "모든 쓰기 작업을 로컬에 즉각 반영해 오프라인에서도 지연 없이 동작하고 변경 이벤트를 발행",
      },
      {
        layer: "Cloud Sync",
        title: "Google Drive v3 3-Way Diff Engine",
        detail:
          "`sync_index.json` 메타데이터만 선조회해 변경된 `story_*.json` / `note_*.json` 파일만 선별 송수신",
      },
      {
        layer: "Distribution",
        title: "Web/PWA · Electron · Capacitor CI/CD",
        detail:
          "버전 태그(`v*`) 푸시 시 GitHub Actions가 Windows NSIS `.exe`와 Android `.apk`를 동시 빌드·릴리즈",
      },
    ],
    decisions: [
      {
        topic: "클라우드 동기화 백엔드",
        considered: "별도 중앙 DB 서버 운영",
        chosen: "Dexie.js + Google Drive API v3 (`appDataFolder`)",
        rationale:
          "개인 노트는 프라이버시와 장기 지속성이 핵심입니다. 사용자 본인의 Google Drive 앱 전용 숨김 폴더를 저장소로 삼아 서버 유지 비용 없이 멀티 디바이스 동기화를 구현했습니다.",
      },
      {
        topic: "멀티 플랫폼 전략",
        considered: "플랫폼별 개별 네이티브 코드베이스",
        chosen: "단일 Next.js 정적 번들 + Electron + Capacitor",
        rationale:
          "타이포그래피와 에디터 일관성, 유지보수 속도를 높이기 위해 웹 코어를 공유하고 인증(PKCE)·알림·자동 업데이트만 플랫폼 브릿지로 분리했습니다.",
      },
    ],
    troubleshooting: [
      {
        problem:
          "모바일 WebView 내부에서는 Google 정책상 OAuth 팝업이 차단되며, 토큰 만료 시 재로그인이 반복되는 문제",
        solution:
          "Capacitor `Browser` + 커스텀 URI 스킴(`app.defaultplus.yeobaek:/oauth2redirect`) 기반의 RFC 7636 Authorization Code + PKCE 플로우를 구현하고 Refresh Token 자동 갱신을 연동했습니다.",
      },
      {
        problem:
          "오프라인 상태에서 PC와 모바일에서 같은 노트를 동시 수정한 뒤 동기화할 때 데이터가 덮어씌워질 위험",
        solution:
          "마지막 동기화 스냅샷(`baseIndex`) 대비 로컬·원격 양쪽 모두 변경된 경우 최신 `updatedAt`을 본문으로 유지하고, 이전 버전은 `(충돌 사본)`으로 자동 복제·업로드해 데이터 유실을 차단했습니다.",
      },
    ],
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Dexie.js",
      "Tiptap",
      "Google Drive API",
      "Electron",
      "Capacitor",
    ],
    githubUrl: "https://github.com/Default-Plus/yeobaek",
    demoUrl: "https://yeobaek-theta.vercel.app/",
    releaseUrl: "https://github.com/Default-Plus/yeobaek/releases",
  },
  {
    id: "02",
    slug: "cafe-de-receipt",
    title: "Café De Receipt",
    subtitle: "Interactive Web Audio Ambient Mixer & Receipt Printer",
    category: "Interactive / Web Audio",
    filterCategory: "Product & Web",
    status: "Live",
    accent: "blue",
    year: "2026",
    description:
      "Web Audio API 노드 그래프 기반 멀티트랙 앰비언트 믹서 & 영수증 인터랙션 웹 애플리케이션",
    overview:
      "카페의 백색소음과 영수증 출력 감성을 결합한 클라이언트 완결형 집중 웹 앱입니다. 외부 백엔드나 API 키 없이 브라우저의 Web Audio API만으로 정밀한 멀티트랙 오디오 믹싱을 수행하고, 집중 세션을 한 장의 영수증 이미지로 소장할 수 있는 인터랙션을 구현했습니다.",
    role: "Solo Full-Stack & Audio Engineering",
    metrics: [
      { label: "Architecture", value: "100% Client-Side" },
      { label: "Audio Engine", value: "Web Audio Node Graph" },
      { label: "Export Output", value: "High-DPI PNG Receipt" },
    ],
    highlights: [
      "Web Audio API 노드 그래프 구축 및 지수 감쇠(setTargetAtTime)를 통한 볼륨 조작 시 팝핑 노이즈 제거",
      "브라우저 Autoplay Policy 대응 및 AudioContext 생명주기(ctx.close) 관리로 메모리 누수 방지",
      "CSS clip-path 물리 영수증 애니메이션 및 html2canvas 기반 고해상도 PNG 내보내기 구현",
    ],
    architecture: [
      {
        layer: "Audio Graph",
        title: "AudioContext → GainNode → Destination",
        detail:
          "트랙별 독립 `GainNode`와 마스터 볼륨 노드를 연결해 실시간 무지연 멀티트랙 믹싱 처리",
      },
      {
        layer: "State & Session",
        title: "Preset Mixer & Focus Timer",
        detail:
          "사용자 믹스 조합과 집중 시간·메모를 영수증 주문 항목 데이터로 실시간 직렬화",
      },
      {
        layer: "Visual Output",
        title: "CSS Clip-Path Receipt & html2canvas",
        detail:
          "톱니 절취선과 출력 모션을 CSS로 구현하고 DOM 노드를 고해상도 PNG 파일로 래스터라이징",
      },
    ],
    decisions: [
      {
        topic: "오디오 제어 방식",
        considered: "HTML5 `<audio>` 요소의 단순 `volume` 속성 제어",
        chosen: "Web Audio API `AudioContext` + `GainNode` 그래프",
        rationale:
          "모바일 브라우저 제약을 회피하고 `setTargetAtTime` 기반의 부드러운 볼륨 보간으로 아날로그 믹서 수준의 사운드 전환을 구현하기 위해 선택했습니다.",
      },
      {
        topic: "클라이언트 완결형 구조",
        considered: "서버 측 렌더링 및 세션 저장 API",
        chosen: "Zero-Backend 정적 웹 아키텍처",
        rationale:
          "로그인 마찰 없이 접속 즉시 집중을 시작할 수 있는 사용성과 안정적인 정적 배포 효율을 우선했습니다.",
      },
    ],
    troubleshooting: [
      {
        problem:
          "볼륨 슬라이더를 빠르게 조작하거나 음소거 전환 시 파형 불연속으로 인한 팝핑(Clicking) 잡음 발생",
        solution:
          "직접 값 대입 대신 `gain.setTargetAtTime` 지수 감쇠 보간을 적용해 모든 볼륨 전환 구간에서 잡음을 제거했습니다.",
      },
      {
        problem:
          "브라우저 Autoplay Policy로 인한 초기 재생 차단 및 페이지 이탈 시 오디오 컨텍스트 잔류 문제",
        solution:
          "첫 사용자 제스처 시 `AudioContext.resume()`을 호출하고 언마운트 시 `ctx.close()`로 생명주기를 명확히 정리했습니다.",
      },
    ],
    techStack: ["Next.js 14", "TypeScript", "Web Audio API", "Tailwind CSS", "html2canvas"],
    githubUrl: "https://github.com/Default-Plus/Cafe_De_Receipt",
    demoUrl: "https://cafe-de-receipt.vercel.app/",
  },
  {
    id: "03",
    slug: "archive-cat",
    title: "ARCHIVE_CAT",
    subtitle: "Hybrid RAG Knowledge Assistant & Persistent Vector Archive",
    category: "AI / Local RAG Engine",
    filterCategory: "AI & RAG",
    status: "Active",
    accent: "purple",
    year: "2026",
    description:
      "로컬 벡터 DB(ChromaDB)와 Gemini API 기반의 도큐먼트 아카이브 및 런타임 지식 검색 어시스턴트",
    overview:
      "디스코드 채널과 로컬 문서에 축적된 지식을 실시간으로 인덱싱하고 자연어로 질의응답하는 하이브리드 RAG 봇입니다. 임베딩 연산과 벡터 저장소를 로컬에 내재화해 반복적인 API 비용과 지연을 줄이고, 운영 중 안전하게 지식을 되돌릴 수 있는 롤백 파이프라인을 구현했습니다.",
    role: "Solo AI Pipeline & Bot Architecture",
    metrics: [
      { label: "Embedding", value: "Local MiniLM-L12-v2" },
      { label: "Vector Store", value: "Persistent ChromaDB" },
      { label: "Knowledge Control", value: "Live Index & LIFO Rollback" },
    ],
    highlights: [
      "로컬 다국어 임베딩 모델(MiniLM-L12-v2) 도입으로 임베딩 API 비용 절감 및 저지연 벡터 검색 구현",
      "디스크 기반 영구 벡터 저장소(PersistentClient) 설계로 프로세스 재시작 후에도 지식 영속성 확보",
      "실시간 지식 인덱싱, 로컬 문서 동기화 및 LIFO 기반 롤백(!학습취소) 커맨드 파이프라인 구축",
    ],
    architecture: [
      {
        layer: "Interface",
        title: "Discord.py Async Command Router",
        detail:
          "자연어 질의, 문서 학습, 로컬 파일 동기화, `!학습취소` 롤백 명령을 비동기 이벤트 루프로 처리",
      },
      {
        layer: "Embedding",
        title: "Sentence-Transformers (Local)",
        detail:
          "`paraphrase-multilingual-MiniLM-L12-v2`로 한국어·영문 문서를 외부 API 호출 없이 벡터화",
      },
      {
        layer: "Retrieval",
        title: "ChromaDB PersistentClient",
        detail:
          "디스크 영구 저장소에서 코사인 유사도 기반 Top-K 컨텍스트 청크를 저지연 검색",
      },
      {
        layer: "Generation",
        title: "Gemini API Grounded Prompting",
        detail:
          "검색된 컨텍스트를 프롬프트에 주입해 환각을 억제한 근거 기반 답변 생성",
      },
    ],
    decisions: [
      {
        topic: "임베딩 파이프라인 위치",
        considered: "외부 클라우드 임베딩 API 전량 호출",
        chosen: "로컬 다국어 임베딩(`MiniLM-L12-v2`) + Gemini 생성 하이브리드",
        rationale:
          "문서 청킹과 재인덱싱이 잦은 아카이브 특성상 임베딩을 로컬에서 처리하면 비용을 크게 줄이면서도 빠른 검색 응답을 유지할 수 있습니다.",
      },
      {
        topic: "벡터 저장소 영속화",
        considered: "인메모리 임시 인덱스(재시작 시 재임베딩)",
        chosen: "ChromaDB `PersistentClient` 디스크 영구 저장 + LIFO 이력 관리",
        rationale:
          "프로세스 재시작 시 초기 기동 시간을 단축하고, 잘못 학습된 데이터를 운영 중 즉시 되돌릴 수 있는 안전한 지식 관리 흐름을 확보했습니다.",
      },
    ],
    troubleshooting: [
      {
        problem:
          "운영 중 오탈자나 잘못된 문서를 학습시켰을 때 전체 벡터 DB를 초기화해야 하는 비효율",
        solution:
          "인덱싱 시점의 문서 ID 스택을 추적하는 LIFO 기반 `!학습취소` 롤백 커맨드를 설계해 직전 학습 단위를 정밀하게 삭제할 수 있도록 개선했습니다.",
      },
    ],
    techStack: ["Python", "ChromaDB", "Sentence-Transformers", "Gemini API", "Discord.py", "RAG"],
    githubUrl: "https://github.com/Default-Plus/archive-cat-rag",
  },
  {
    id: "04",
    slug: "bowone-portfolio",
    title: "BOWONE Portfolio",
    subtitle: "Artist Portfolio Renewal, Data Schema & CI/CD Security Architecture",
    category: "Web Architecture / Collaboration",
    filterCategory: "Collaboration",
    status: "Live",
    accent: "amber",
    year: "2026",
    description:
      "멀티미디어 아티스트 포트폴리오 리뉴얼을 위한 확장형 데이터 스키마 설계 및 배포·보안 파이프라인 구축",
    overview:
      "멀티미디어 아티스트(BOWONE)와의 협업으로 진행한 포트폴리오 리뉴얼 프로젝트입니다. 270여 개에 달하는 대량의 비정형 미디어 자산을 정규화된 데이터 스키마로 마이그레이션하고, 아티스트가 향후 자율적으로 작품과 UI를 확장할 수 있도록 GitHub–Vercel CI/CD 파이프라인과 보안 구조를 설계·인수인계했습니다.",
    role: "Initial Architecture, Data Migration & Security Review",
    credits: "Editorial UI/UX & CMS Implementation by BOWONE",
    metrics: [
      { label: "Migrated Assets", value: "270+ Media Items" },
      { label: "Collaboration", value: "Architecture & Handoff" },
      { label: "Security Scope", value: "Repo Split & OAuth Audit" },
    ],
    highlights: [
      "270여 개 기존 미디어 자산과 메타데이터를 정규화된 JSON 스키마로 마이그레이션하여 유지보수성 극대화",
      "GitHub–Vercel CI/CD 파이프라인 및 비개발자 인수인계 가이드 구축으로 디자이너의 자율적 UI/CMS 확장 지원",
      "퍼블릭/프라이빗 레포지토리 분리 구조 설계 및 OAuth 세션 가드·리다이렉트 보안 취약점 점검",
    ],
    architecture: [
      {
        layer: "Data Layer",
        title: "Normalized Artwork JSON Schema",
        detail:
          "270+ 작품의 카테고리·미디어 경로·크레딧·연도를 일관된 타입 스키마로 구조화",
      },
      {
        layer: "Frontend Core",
        title: "Next.js App Router + Responsive Grid",
        detail:
          "대용량 시각 작업물 환경에서도 레이아웃 시프트 없이 탐색 가능한 컴포넌트 기반 스캐폴딩",
      },
      {
        layer: "Security & Ops",
        title: "Public/Private Repo Split & Vercel CI/CD",
        detail:
          "민감 운영 로직 분리, OAuth 세션 가드 및 리다이렉트 취약점 검증, 자동 배포 파이프라인 구축",
      },
    ],
    decisions: [
      {
        topic: "협업자 인수인계 구조",
        considered: "개발자 전담 유지보수 구조",
        chosen: "정규화 JSON 스키마 + 자동 배포 CI/CD + 단계별 운영 가이드",
        rationale:
          "아티스트가 작품이 추가될 때마다 개발자를 기다리지 않고 스스로 콘텐츠와 에디토리얼 UI를 확장할 수 있는 자생적 구조를 설계했습니다.",
      },
    ],
    troubleshooting: [
      {
        problem:
          "관리자 CMS 인증 흐름에서 비정상 리다이렉트 파라미터와 퍼블릭 레포 노출 시 보안 설정이 유출될 위험 발견",
        solution:
          "퍼블릭/프라이빗 레포지토리 경계를 재설계하고, 인증 세션 가드와 허용된 내부 경로만 통과시키는 안전한 리다이렉트 검증 로직을 적용했습니다.",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "CI/CD"],
    demoUrl: "https://portfolio-bowone.vercel.app/",
  },
];

export const PROJECT_FILTERS: ProjectFilterCategory[] = [
  "All",
  "Product & Web",
  "AI & RAG",
  "Collaboration",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1],
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : PROJECTS[0],
  };
}
