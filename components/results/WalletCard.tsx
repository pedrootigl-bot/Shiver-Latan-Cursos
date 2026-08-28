"use client";

import Image from "next/image";
import { PhoneHomeIndicator, PhoneStatusBar } from "./PhoneStatusBar";
import type { WalletCardData } from "@/lib/content";

export function WalletCard({ data }: { data: WalletCardData }) {
  return (
    <article className="relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#101318] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="mx-auto w-full max-w-[200px] overflow-hidden rounded-[20px] border border-white/10 bg-black">
        <PhoneStatusBar time={data.time} />

        <div className="bg-gradient-to-b from-[#0a1220] to-[#050608] px-3 pb-4 pt-2">
          <p className="text-center text-[10px] font-semibold text-white/70">
            Carteira
          </p>

          <p className="mt-3 text-[9px] font-medium uppercase tracking-wide text-white/35">
            Saldo atual
          </p>
          <p className="text-xl font-extrabold text-white">{data.balance}</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-lg bg-[var(--blue)] py-2 text-[10px] font-bold uppercase tracking-wide text-white"
            >
              Saque
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/15 bg-white/5 py-2 text-[10px] font-bold uppercase tracking-wide text-white/70"
            >
              Histórico
            </button>
          </div>

          <div className="mt-3 rounded-lg border border-[var(--blue-glow)]/20 bg-[var(--blue-glow)]/5 px-2 py-2 text-center">
            <p className="text-[10px] font-bold text-[var(--blue-glow)]">
              + {data.dailyProfit}{" "}
              <span className="text-white/50">|</span> {data.dailyPct}
            </p>
          </div>
        </div>

        <PhoneHomeIndicator />
      </div>

      <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/[0.08] bg-[#0a0d12]/95 p-2.5 backdrop-blur-sm">
        <div className="flex items-start gap-2">
          {data.avatar ? (
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full">
              <Image
                src={data.avatar}
                alt={data.author}
                fill
                loading="lazy"
                quality={70}
                className="object-cover"
                sizes="28px"
              />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] leading-relaxed text-white/75">
              {data.overlayMessage}
            </p>
            <p className="mt-1 text-right text-[8px] text-white/30">
              {data.overlayTime}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
