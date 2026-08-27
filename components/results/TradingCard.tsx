"use client";

import { BarChart3 } from "lucide-react";
import type { TradingCardData } from "@/lib/content";

export function TradingCard({ data }: { data: TradingCardData }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e13] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="border-b border-white/[0.06] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1a2030] text-[9px] font-bold text-white/80">
              W
            </span>
            <div>
              <p className="text-[11px] font-bold text-white">{data.asset}</p>
              <p className="text-[9px] text-white/40">{data.balanceLabel}</p>
            </div>
          </div>
          <p className="text-xs font-bold text-white">{data.balance}</p>
        </div>
        <div className="mt-2 flex gap-1">
          {data.tabs.map((tab) => (
            <span
              key={tab}
              className={`rounded-md px-2 py-0.5 text-[9px] font-semibold ${
                tab === data.activeTab
                  ? "bg-[var(--blue-glow)]/15 text-[var(--blue-glow)]"
                  : "text-white/35"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="px-3 py-3">
        <p className="text-[9px] font-medium uppercase tracking-wide text-white/35">
          Resultado do dia
        </p>
        <p className="mt-1 text-lg font-extrabold text-[var(--blue-glow)]">
          {data.dailyResult}{" "}
          <span className="text-sm font-bold text-[var(--blue-glow)]/80">
            {data.dailyPct}
          </span>
        </p>

        <div className="mt-3 space-y-1.5">
          {data.trades.map((trade) => (
            <div
              key={`${trade.side}-${trade.asset}-${trade.time}`}
              className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2 py-1.5"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[9px] font-bold ${
                  trade.side === "B"
                    ? "bg-[var(--blue-glow)]/15 text-[var(--blue-glow)]"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {trade.side}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-white/85">
                  {trade.asset}
                </p>
                <p className="text-[8px] text-white/35">{trade.time}</p>
              </div>
              <p
                className={`text-[10px] font-bold ${
                  trade.profit.startsWith("+") || trade.profit.startsWith("R$")
                    ? "text-[var(--blue-glow)]"
                    : "text-red-400"
                }`}
              >
                {trade.profit}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto flex items-start gap-2 border-t border-white/[0.06] bg-[#080a0e] px-3 py-2.5">
        <BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--blue-glow)]" />
        <p className="text-[9px] leading-relaxed text-white/45">{data.footer}</p>
      </div>
    </article>
  );
}
