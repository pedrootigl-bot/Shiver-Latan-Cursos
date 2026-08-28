"use client";

import Image from "next/image";
import { BadgeCheck, Camera, Phone } from "lucide-react";
import { PhoneHomeIndicator, PhoneStatusBar } from "./PhoneStatusBar";
import type { ChatCardData } from "@/lib/content";

function MiniProfitScreenshot({ profit, label }: { profit: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#06080d]">
      <PhoneStatusBar time="15:01" />
      <div className="relative bg-gradient-to-b from-[#0a1220] to-[#040608] px-3 py-4 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] bg-white/[0.02]"
        />
        <p className="relative text-[8px] text-white/40">{label}</p>
        <p className="relative mt-1 text-sm font-extrabold text-[var(--blue-glow)]">
          {profit}
        </p>
      </div>
      <PhoneHomeIndicator />
    </div>
  );
}

export function ChatCard({ data }: { data: ChatCardData }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0e13] shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#075e54]/20 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[var(--blue-glow)]/20">
            <span className="text-[10px] font-bold text-[var(--blue-glow)]">em</span>
          </span>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-semibold text-white">{data.title}</p>
              <BadgeCheck className="h-3.5 w-3.5 text-[var(--blue-glow)]" />
            </div>
            <p className="text-[9px] text-[var(--blue-glow)]">{data.status}</p>
          </div>
        </div>
        <div className="flex gap-3 text-white/50">
          <Camera className="h-4 w-4" />
          <Phone className="h-4 w-4" />
        </div>
      </div>

      <div
        className="flex-1 space-y-2 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.02%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] px-3 py-3"
      >
        {data.imageMessage ? (
          <div className="max-w-[85%] overflow-hidden rounded-xl rounded-tl-sm bg-[#1f2c34] p-1.5">
            <MiniProfitScreenshot
              profit={data.imageMessage.profit}
              label={data.imageMessage.label}
            />
            <p className="mt-1 px-1 text-right text-[8px] text-white/30">
              {data.imageMessage.time}
            </p>
          </div>
        ) : null}

        {data.messages.map((msg) => (
          <div
            key={`${msg.time}-${msg.text.slice(0, 12)}`}
            className={`flex gap-1.5 ${msg.outgoing ? "justify-end" : ""}`}
          >
            {msg.outgoing && msg.avatar ? (
              <span className="relative order-2 h-6 w-6 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={msg.avatar}
                  alt=""
                  fill
                  loading="lazy"
                  quality={70}
                  className="object-cover"
                  sizes="24px"
                />
              </span>
            ) : null}
            <div
              className={`max-w-[82%] rounded-xl px-2.5 py-1.5 ${
                msg.outgoing
                  ? "order-1 rounded-tr-sm bg-[#005c4b] text-white/90"
                  : "rounded-tl-sm bg-[#1f2c34] text-white/80"
              }`}
            >
              <p className="text-[10px] leading-relaxed">{msg.text}</p>
              <p className="mt-0.5 text-right text-[8px] text-white/35">
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
