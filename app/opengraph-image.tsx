import { ImageResponse } from "next/og";

export const alt = "DEFAULT_PLUS — Designing the New Standard";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 20% 85%, rgba(16, 185, 129, 0.25), transparent 45%), radial-gradient(circle at 80% 25%, rgba(59, 130, 246, 0.28), transparent 45%), radial-gradient(circle at 60% 85%, rgba(168, 85, 247, 0.2), transparent 45%)",
          padding: "72px 80px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: "-0.04em",
            }}
          >
            <span>DEFAULT</span>
            <span style={{ color: "#3b82f6" }}>_</span>
            <span>PLUS</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              color: "#34d399",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            DEVELOPER &amp; DESIGNER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 0.98,
            }}
          >
            Beyond the Default.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a1a1aa",
              fontWeight: 400,
            }}
          >
            Adding Value to the Default. Pay attention to the Basics.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: 24,
            fontSize: 18,
            color: "#71717a",
          }}
        >
          <span>default-plus.vercel.app</span>
          <span>Seoul / KR · © 2026 Default_Plus</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
