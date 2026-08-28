"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { ReviewCardData } from "@/lib/content";

export function ReviewCard({ data }: { data: ReviewCardData }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#101318] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2.5">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
          <Image
            src={data.avatar}
            alt={data.name}
            fill
            loading="lazy"
            quality={70}
            className="object-cover"
            sizes="40px"
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{data.name}</p>
          <span className="mt-0.5 inline-block rounded-md bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium text-white/45">
            {data.badge}
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/[0.06] bg-[#0a0d12] px-3 py-2.5">
        <p className="text-[11px] leading-relaxed text-white/70">{data.text}</p>
        <p className="mt-1.5 text-right text-[9px] text-white/30">{data.time}</p>
      </div>

      <div className="mt-auto flex items-center gap-3 rounded-xl border border-[var(--blue-glow)]/20 bg-[#0a0f14] px-3 py-3 pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--blue-glow)]/40 bg-[var(--blue-glow)]/10">
          <Check className="h-5 w-5 text-[var(--blue-glow)]" strokeWidth={2.5} />
        </span>
        <div>
          <p className="text-[9px] font-medium uppercase tracking-wide text-white/40">
            {data.scoreLabel}
          </p>
          <p className="text-2xl font-extrabold leading-none text-white">{data.score}</p>
          <p className="mt-0.5 text-[10px] text-[var(--blue-glow)]">{data.scoreCaption}</p>
        </div>
      </div>
    </article>
  );
}
