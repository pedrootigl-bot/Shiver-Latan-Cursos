"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

function PairFlags({ codes }: { codes: readonly string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {codes.map((code, index) => (
        <span
          key={`${code}-${index}`}
          className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-[#111] bg-[#222]"
          style={{
            marginLeft: index === 0 ? 0 : -7,
            zIndex: codes.length - index,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w80/${code}.png`}
            alt=""
            width={24}
            height={24}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
    </div>
  );
}

export function Hero() {
  const { hero, ctaUrl } = content;
  const { headline, subheadline } = hero;

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-black pt-12 pb-28 lg:pt-16 lg:pb-36">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10">
        <motion.div
          className="relative z-10 flex flex-col items-start gap-7"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.65, ease: easeOut }}
            className="max-w-xl text-[2.1rem] font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]"
          >
            {headline.before}
            <span className="text-[var(--blue-glow)]">{headline.highlightGreen}</span>
            {headline.middle}
            <span className="text-[var(--orange)]">
              {headline.highlightOrange}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: easeOut }}
            className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {subheadline.before}
            <span className="font-semibold text-[var(--orange)]">
              {subheadline.highlightOrange}
            </span>
            {subheadline.middle}
            <span className="font-semibold text-[var(--blue-glow)]">
              {subheadline.highlightGreen}
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: easeOut }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="blue"
              href={ctaUrl}
              className="mt-1 border-2 border-[#0033aa] px-8 py-4 text-base shadow-[0_0_28px_rgba(0,102,255,0.55)]"
            >
              <Star className="h-4 w-4 fill-white" />
              {hero.ctaLabel}
            </Button>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
            >
              <Image
                src="/images/mentor-shiver-glow-2x.png"
                alt="El Mentor Trader"
                fill
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 800px"
                className="object-contain object-bottom"
              />
            </motion.div>

            {/* Cards de ativos (pares) — acima da imagem */}
            <motion.div
              className="absolute top-[8%] right-0 z-20 flex w-[min(100%,210px)] flex-col gap-2 sm:-right-2 lg:-right-6"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{
                opacity: { duration: 0.5 },
                x: { duration: 0.5 },
                y: {
                  repeat: Infinity,
                  duration: 3.2,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }}
            >
              {hero.pairs.map((item, index) => (
                <motion.div
                  key={item.pair}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.12, duration: 0.4 }}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1a1a1a]/95 px-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
                >
                  <PairFlags codes={item.flags} />
                  <span className="flex-1 text-xs font-semibold text-white">
                    {item.pair}
                  </span>
                  <ArrowUp className="h-3.5 w-3.5 text-[var(--green)]" strokeWidth={2.5} />
                  <span className="min-w-[2.5rem] text-right text-sm font-bold text-[var(--green)]">
                    {item.pct}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Cards Comprar / Vender — acima da imagem */}
            <motion.div
              className="absolute bottom-[26%] left-0 z-20 flex flex-col gap-2 sm:-left-2 lg:-left-8"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.5, delay: 0.15 },
                x: { duration: 0.5, delay: 0.15 },
                y: {
                  repeat: Infinity,
                  duration: 3.6,
                  ease: "easeInOut",
                  delay: 0.7,
                },
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--green)] px-3.5 py-2 text-sm font-bold text-black shadow-[0_0_20px_rgba(57,255,20,0.45)]">
                Compra
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/15">
                  <ArrowUp className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--red)] px-3.5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(225,29,46,0.45)]">
                Venta
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                  <ArrowDown className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transição natural para a próxima section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[#05070a]/55 to-[#05070a] sm:h-48 lg:h-56"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_center_bottom,rgba(47,107,255,0.14),transparent_70%)]"
      />
    </section>
  );
}
