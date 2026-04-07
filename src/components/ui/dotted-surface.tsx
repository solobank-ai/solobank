"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">;

interface SceneRefs {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  points: THREE.Points;
  animationId: number;
  count: number;
}

export function DottedSurface({
  className,
  ...props
}: DottedSurfaceProps): React.ReactElement {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRefs | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SEPARATION = 150;
    const AMOUNT_X = 40;
    const AMOUNT_Y = 60;

    const getSize = (): { w: number; h: number } => {
      // Use the container's own box so the surface tracks the element
      // it's mounted on (not the window). Falls back to window if the
      // container hasn't been sized yet.
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      return { w, h };
    };

    // ── Scene ────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0d0d0f, 2000, 10000);

    const { w: initW, h: initH } = getSize();
    const camera = new THREE.PerspectiveCamera(60, initW / initH, 1, 10000);
    camera.position.set(0, 355, 1220);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initW, initH);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── Particles ────────────────────────────────────────────────────────
    const isDark = resolvedTheme !== "light";
    const positions: number[] = [];
    const colors: number[] = [];

    // Subtle Solana-tinted colour: mostly white, with a hint of purple->green
    // drift across the grid. Index-based so the look is deterministic.
    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        const x = ix * SEPARATION - (AMOUNT_X * SEPARATION) / 2;
        const z = iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2;
        positions.push(x, 0, z);

        if (isDark) {
          // Blend purple (#9945FF → 153,69,255) to green (#14F195 → 20,241,149)
          // across the X axis, then desaturate heavily so it reads as white dust
          // with a faint solana wash.
          const t = ix / (AMOUNT_X - 1);
          const r = (153 * (1 - t) + 20 * t) / 255;
          const g = (69 * (1 - t) + 241 * t) / 255;
          const b = (255 * (1 - t) + 149 * t) / 255;
          // Mix with white to keep it soft.
          const mix = 0.75;
          colors.push(
            r * (1 - mix) + mix,
            g * (1 - mix) + mix,
            b * (1 - mix) + mix,
          );
        } else {
          colors.push(0, 0, 0);
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3),
    );

    const material = new THREE.PointsMaterial({
      size: 8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let count = 0;
    let animationId = 0;
    let isVisible = true;

    // ── Animate ──────────────────────────────────────────────────────────
    const positionAttribute = geometry.attributes
      .position as THREE.BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;

    const animate = (): void => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      let i = 0;
      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          const idx = i * 3;
          posArray[idx + 1] =
            Math.sin((ix + count) * 0.3) * 50 +
            Math.sin((iy + count) * 0.5) * 50;
          i++;
        }
      }
      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.05;
    };

    // ── Resize ───────────────────────────────────────────────────────────
    const handleResize = (): void => {
      const { w, h } = getSize();
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    // Also observe container size changes (e.g. layout shifts without
    // a window resize event).
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // Pause when tab hidden to save CPU / battery.
    const handleVisibility = (): void => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    animate();
    sceneRef.current = { scene, camera, renderer, points, animationId, count };

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      ro.disconnect();
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        sceneRef.current.scene.traverse((obj) => {
          if (obj instanceof THREE.Points) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
        sceneRef.current.renderer.dispose();
        if (
          containerRef.current &&
          sceneRef.current.renderer.domElement.parentNode === containerRef.current
        ) {
          containerRef.current.removeChild(sceneRef.current.renderer.domElement);
        }
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}
