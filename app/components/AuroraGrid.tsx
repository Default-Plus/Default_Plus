"use client";
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AuroraGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(300, 150, 150, 150);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color("#10b981") },
        color2: { value: new THREE.Color("#3b82f6") },
        color3: { value: new THREE.Color("#a855f7") }
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          float elevation = sin(modelPosition.x * 0.2 + time * 0.5) * sin(modelPosition.z * 0.2 + time * 0.3) * 2.0;
          modelPosition.y += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mixStrength1 = vUv.x;
          float mixStrength2 = vElevation * 0.2 + 0.5;
          vec3 colorMix1 = mix(color1, color2, mixStrength1);
          vec3 finalColor = mix(colorMix1, color3, mixStrength2);
          float sideFade = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x);
          float alpha = 0.4 * (1.0 - smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y)) * sideFade;
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      wireframe: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    return { geometry, material };
  }, []);

  useFrame((state, delta) => {
    if (material) material.uniforms.time.value += delta;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -30, 0]} />
  );
}