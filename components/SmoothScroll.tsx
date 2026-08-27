"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenisInstance } from "@/lib/lenis-instance";

/**
 * Intensidade do smooth scroll (ajuste fino):
 * - LENIS_LERP: quanto menor, mais inércia (mais “pesado”)
 * - LENIS_WHEEL_MULTIPLIER: sensibilidade da roda / trackpad
 */
export const LENIS_LERP = 0.075;
export const LENIS_WHEEL_MULTIPLIER = 0.9;

function shouldPreventLenis(node: HTMLElement) {
  return Boolean(
    node.closest(
      '[data-lenis-prevent], [role="dialog"], [aria-modal="true"]',
    ),
  );
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      // Mobile/touch: comportamento nativo (sem sync artificial)
      syncTouch: false,
      lerp: LENIS_LERP,
      wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
      // Carrosséis horizontais e containers overflow
      allowNestedScroll: true,
      // Âncoras (#modulos, #resultados, #mentor, etc.)
      anchors: true,
      // prefers-reduced-motion: reduce → sem suavização
      respectReducedMotion: true,
      prevent: shouldPreventLenis,
    });

    setLenisInstance(lenis);

    return () => {
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
