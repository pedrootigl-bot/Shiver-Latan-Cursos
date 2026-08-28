"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
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
    let lenis: Lenis | null = null;
    let cancelled = false;

    void (async () => {
      const [{ default: Lenis }] = await Promise.all([
        import("lenis"),
        import("lenis/dist/lenis.css"),
      ]);

      if (cancelled) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: LENIS_LERP,
        wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
        allowNestedScroll: true,
        anchors: true,
        respectReducedMotion: true,
        prevent: shouldPreventLenis,
      });

      setLenisInstance(lenis);
    })();

    return () => {
      cancelled = true;
      lenis?.destroy();
      setLenisInstance(null);
    };
  }, []);

  return null;
}
