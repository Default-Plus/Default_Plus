"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float waveA = sin(modelPosition.x * 0.18 + uTime * 0.45) * sin(modelPosition.z * 0.18 + uTime * 0.28) * 2.1;
    float waveB = cos((modelPosition.x - modelPosition.z) * 0.08 + uTime * 0.22) * 0.65;

    vec2 pointerWorld = vec2(uMouse.x * 45.0, -uMouse.y * 28.0);
    float dist = distance(modelPosition.xz, pointerWorld);
    float ripple = exp(-dist * 0.045) * sin(dist * 0.35 - uTime * 2.2) * 1.4;

    float elevation = waveA + waveB + ripple;
    modelPosition.y += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const FRAGMENT_SHADER = `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float mixStrength1 = vUv.x;
    float mixStrength2 = clamp(vElevation * 0.18 + 0.5, 0.0, 1.0);
    vec3 colorMix1 = mix(uColor1, uColor2, mixStrength1);
    vec3 finalColor = mix(colorMix1, uColor3, mixStrength2);

    float sideFade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
    float depthFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.88, vUv.y);
    float alpha = 0.42 * sideFade * (1.0 - depthFade * 0.85);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

interface AuroraGridProps {
  isCompact: boolean;
  reducedMotion: boolean;
  targetCameraPos: [number, number, number];
}

export default function AuroraGrid({
  isCompact,
  reducedMotion,
  targetCameraPos,
}: AuroraGridProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));
  const targetVec = useRef(new THREE.Vector3(...targetCameraPos));
  const desiredVec = useRef(new THREE.Vector3(...targetCameraPos));

  const segmentsX = isCompact ? 48 : 96;
  const segmentsY = isCompact ? 32 : 64;

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(300, 150, segmentsX, segmentsY),
    [segmentsX, segmentsY]
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor1: { value: new THREE.Color("#10b981") },
      uColor2: { value: new THREE.Color("#3b82f6") },
      uColor3: { value: new THREE.Color("#a855f7") },
    }),
    []
  );

  useEffect(() => {
    targetVec.current.set(targetCameraPos[0], targetCameraPos[1], targetCameraPos[2]);
  }, [targetCameraPos]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useEffect(() => {
    const mat = materialRef.current;
    return () => {
      mat?.dispose();
    };
  }, []);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const mat = materialRef.current;

    if (mat) {
      if (!reducedMotion) {
        mat.uniforms.uTime.value += delta;
      }
      smoothedMouse.current.lerp(state.pointer, 1 - Math.exp(-delta * 4));
      mat.uniforms.uMouse.value.copy(smoothedMouse.current);
    }

    const desiredX = targetVec.current.x + (reducedMotion ? 0 : smoothedMouse.current.x * 1.6);
    const desiredY = targetVec.current.y + (reducedMotion ? 0 : smoothedMouse.current.y * 0.8);
    const desiredZ = targetVec.current.z;

    const lerpAlpha = 1 - Math.exp(-delta * 2.5);
    desiredVec.current.set(desiredX, desiredY, desiredZ);
    state.camera.position.lerp(desiredVec.current, lerpAlpha);
    state.camera.lookAt(0, -14, 0);
  });

  return (
    <mesh
      geometry={geometry}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, -30, 0]}
    >
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        wireframe
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}
