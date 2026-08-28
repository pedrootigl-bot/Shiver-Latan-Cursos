"use client";

import dynamic from "next/dynamic";

const SmoothScroll = dynamic(
  () => import("@/components/SmoothScroll").then((mod) => mod.SmoothScroll),
  { ssr: false },
);

export function ClientSmoothScroll() {
  return <SmoothScroll />;
}
