"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

const defaultColors = ["#5227FF", "#FF9FFC", "#B19EEF"];

export default function LiquidEther({
  mouseForce = 20,
  cursorSize = 100,
  isViscous = false,
  viscous = 30,
  iterationsViscous = 32,
  iterationsPoisson = 32,
  dt = 0.014,
  BFECC = true,
  resolution = 0.5,
  isBounce = false,
  colors = defaultColors,
  style = {},
  className = "",
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
  takeoverDuration = 0.25,
  autoResumeDelay = 1000,
  autoRampDuration = 0.6,
}: LiquidEtherProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /* ---------- BASIC THREE SETUP ---------- */
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    /* ---------- PALETTE TEXTURE ---------- */
    const paletteData = new Uint8Array(colors.length * 4);
    colors.forEach((c, i) => {
      const col = new THREE.Color(c);
      paletteData[i * 4] = col.r * 255;
      paletteData[i * 4 + 1] = col.g * 255;
      paletteData[i * 4 + 2] = col.b * 255;
      paletteData[i * 4 + 3] = 255;
    });

    const paletteTex = new THREE.DataTexture(
      paletteData,
      colors.length,
      1,
      THREE.RGBAFormat
    );
    paletteTex.needsUpdate = true;

    /* ---------- SHADER ---------- */
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        time: { value: 0 },
        palette: { value: paletteTex },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform sampler2D palette;
        varying vec2 vUv;

        void main() {
          float n = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          float t = smoothstep(0.0, 1.0, abs(n));
          vec3 col = texture2D(palette, vec2(t, 0.5)).rgb;
          gl_FragColor = vec4(col, t);
        }
      `,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    /* ---------- ANIMATION LOOP ---------- */
    const animate = () => {
      material.uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    /* ---------- RESIZE ---------- */
    const onResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      rendererRef.current.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", onResize);

    /* ---------- CLEANUP ---------- */
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [colors]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={style}
    />
  );
}
