"use client";

import React, {
  Component,
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { Canvas } from "@react-three/fiber";
import { usePathname } from "next/navigation";
import AuroraGrid from "./AuroraGrid";

interface SceneContextValue {
  is3DEnabled: boolean;
  toggle3D: () => void;
  isPaletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const SceneContext = createContext<SceneContextValue | null>(null);

export function useSceneUI(): SceneContextValue {
  const ctx = useContext(SceneContext);
  if (!ctx) {
    throw new Error("useSceneUI must be used within SceneProvider");
  }
  return ctx;
}

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; onError: () => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(): void {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeCompactViewport(callback: () => void) {
  const mql = window.matchMedia("(max-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getCompactViewportSnapshot() {
  return window.matchMedia("(max-width: 768px)").matches;
}

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [is3DEnabled, setIs3DEnabled] = useState(true);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggle3D = useCallback(() => {
    setIs3DEnabled((prev) => !prev);
  }, []);

  const openPalette = useCallback(() => setIsPaletteOpen(true), []);
  const closePalette = useCallback(() => setIsPaletteOpen(false), []);
  const togglePalette = useCallback(() => setIsPaletteOpen((prev) => !prev), []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo<SceneContextValue>(
    () => ({
      is3DEnabled,
      toggle3D,
      isPaletteOpen,
      openPalette,
      closePalette,
      togglePalette,
      toastMessage,
      showToast,
    }),
    [is3DEnabled, toggle3D, isPaletteOpen, openPalette, closePalette, togglePalette, toastMessage, showToast]
  );

  return (
    <SceneContext.Provider value={value}>
      {children}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 left-5 z-[70] border border-white/15 bg-zinc-950/95 px-4 py-2.5 text-center text-xs font-mono tracking-wider text-emerald-400 shadow-2xl backdrop-blur-md sm:right-6 sm:bottom-6 sm:left-auto sm:text-left"
        >
          ✓ {toastMessage}
        </div>
      )}
    </SceneContext.Provider>
  );
}

export function PersistentScene() {
  const pathname = usePathname();
  const { is3DEnabled } = useSceneUI();
  const [canvasReady, setCanvasReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const isCompact = useSyncExternalStore(
    subscribeCompactViewport,
    getCompactViewportSnapshot,
    () => false
  );

  const sceneConfig = useMemo<{
    opacityClass: string;
    cameraPos: [number, number, number];
  }>(() => {
    if (pathname === "/") {
      return { opacityClass: "opacity-65", cameraPos: [0, 8, 20] };
    }
    if (pathname === "/projects") {
      return { opacityClass: "opacity-25", cameraPos: [0, 12, 24] };
    }
    if (pathname.startsWith("/projects/")) {
      return { opacityClass: "opacity-15", cameraPos: [0, 16, 28] };
    }
    return { opacityClass: "opacity-20", cameraPos: [0, 15, 30] };
  }, [pathname]);

  const showCanvas = is3DEnabled && !webglFailed;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* Subtle CSS Aurora Fallback */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          pathname === "/" ? "opacity-70" : "opacity-35"
        }`}
        style={{
          background:
            "radial-gradient(ellipse 75% 45% at 20% 85%, rgba(16, 185, 129, 0.14), transparent 65%), radial-gradient(ellipse 70% 50% at 75% 80%, rgba(59, 130, 246, 0.16), transparent 65%), radial-gradient(ellipse 55% 40% at 50% 95%, rgba(168, 85, 247, 0.12), transparent 65%)",
        }}
      />

      {showCanvas && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            canvasReady ? sceneConfig.opacityClass : "opacity-0"
          }`}
        >
          <WebGLErrorBoundary onError={() => setWebglFailed(true)}>
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 8, 20], fov: 60 }}
              gl={{
                antialias: false,
                alpha: true,
                powerPreference: "high-performance",
              }}
              onCreated={({ gl }) => {
                gl.domElement.addEventListener(
                  "webglcontextlost",
                  (event) => {
                    event.preventDefault();
                    setWebglFailed(true);
                  },
                  { once: true }
                );
                setCanvasReady(true);
              }}
            >
              <Suspense fallback={null}>
                <AuroraGrid
                  isCompact={isCompact}
                  reducedMotion={reducedMotion}
                  targetCameraPos={sceneConfig.cameraPos}
                />
              </Suspense>
            </Canvas>
          </WebGLErrorBoundary>
        </div>
      )}
    </div>
  );
}
