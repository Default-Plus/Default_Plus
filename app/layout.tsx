import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/profile";
import { PersistentScene, SceneProvider } from "./components/PersistentScene";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "DEFAULT_PLUS | Designing the New Standard",
    template: "%s | DEFAULT_PLUS",
  },
  description: "Pay attention to the Basics. For your better UX.",
  keywords: [
    "Default_Plus",
    "Developer",
    "Designer",
    "Next.js",
    "TypeScript",
    "React Three Fiber",
    "RAG",
    "Yeobaek",
    "Portfolio",
  ],
  authors: [{ name: SITE_CONFIG.handle, url: SITE_CONFIG.githubUrl }],
  creator: SITE_CONFIG.brand,
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.brand,
    title: "DEFAULT_PLUS | Designing the New Standard",
    description:
      "Adding Value to the Default. Pay attention to the Basics. For your better UX.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEFAULT_PLUS | Designing the New Standard",
    description:
      "Adding Value to the Default. Pay attention to the Basics. For your better UX.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.brand,
  alternateName: SITE_CONFIG.handle,
  url: SITE_CONFIG.url,
  description: "Pay attention to the Basics. For your better UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKr.variable}`}
    >
      <body className="min-h-screen bg-black font-sans text-white antialiased selection:bg-blue-500/35 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SceneProvider>
          <PersistentScene />
          <Navbar />
          <CommandPalette />
          <div className="relative z-10">{children}</div>
        </SceneProvider>
      </body>
    </html>
  );
}
