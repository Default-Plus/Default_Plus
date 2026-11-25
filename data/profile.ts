export interface SkillGroup {
  category: string;
  subtitle: string;
  items: string[];
}

export const SITE_CONFIG = {
  brand: "DEFAULT_PLUS",
  url: "https://default-plus.vercel.app",
  handle: "Default_Plus",
  role: "Developer & Designer",
  tagline: "Adding Value to the Default.",
  location: "Seoul / KR",
  email: "default_plus@naver.com",
  githubUrl: "https://github.com/Default-Plus",
  githubHandle: "@DEFAULT_PLUS",
  discordHandle: "@DEFAULT_PLUS",
  discordCopyValue: "DEFAULT_PLUS",
  version: "v2.1",
} as const;

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend & Interactive Web",
    subtitle: "타이포그래피·인터랙션·3D 웹 인터페이스 구현",
    items: [
      "Next.js (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "React Three Fiber",
      "Tiptap",
      "Web Audio API",
      "IndexedDB / Dexie.js",
    ],
  },
  {
    category: "AI, RAG & Backend",
    subtitle: "벡터 검색·RAG 파이프라인 및 Python 기반 자동화",
    items: [
      "Python",
      "PyTorch",
      "ChromaDB",
      "Sentence-Transformers",
      "Gemini API",
      "Discord.py",
    ],
  },
  {
    category: "Cross-Platform & Infra",
    subtitle: "단일 코드베이스 멀티 플랫폼 배포 및 CI/CD",
    items: [
      "Electron",
      "Capacitor (Android / iOS)",
      "Google Drive API v3",
      "OAuth 2.0 / PKCE",
      "Vercel",
      "GitHub Actions CI/CD",
    ],
  },
];

export const CORE_PRINCIPLES = [
  {
    index: "01",
    title: "Basics as the Edge",
    description:
      "화려한 장식보다 빠른 로딩, 정돈된 타이포그래피, 예외 상황에서도 무너지지 않는 기본기를 가장 중요한 기준으로 봅니다.",
  },
  {
    index: "02",
    title: "Pragmatic Architecture",
    description:
      "과도한 복잡함을 경계합니다. 문제의 규모와 목적에 맞춰 유지보수하기 쉽고 명료한 기술 구조를 선택합니다.",
  },
  {
    index: "03",
    title: "Design with Narrative",
    description:
      "기능 구현에서 멈추지 않고 여백, 마이크로카피, 모션의 물리적 감각까지 하나의 일관된 사용자 경험으로 설계합니다.",
  },
] as const;
