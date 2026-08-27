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
          className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-[#111] bg-[#222] sm:h-6 sm:w-6"
          style={{
            marginLeft: index === 0 ? 0 : -6,
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
    <section
      className="relative overflow-hidden bg-black pt-6 pb-12 sm:flex sm:min-h-[98svh] sm:flex-col sm:justify-center sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20"
      id="inicio"
      aria-label="Apresentação do curso"
    >
      <div className="relative mx-auto grid max-w-7xl w-full items-center gap-4 px-4 sm:gap-5 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:gap-x-6 lg:gap-y-5 lg:px-10">
        <motion.div
          className="relative z-10 order-1 flex flex-col items-start gap-3 sm:gap-4 lg:col-start-1 lg:row-start-1"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.65, ease: easeOut }}
            className="max-w-xl text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
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
            className="max-w-md text-[0.9rem] leading-relaxed text-white/90 sm:text-base lg:text-lg"
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
        </motion.div>

        <div className="relative order-2 mx-auto w-full max-w-[380px] sm:max-w-[520px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:h-full lg:min-h-0">
          <div className="relative mx-auto aspect-[3/4] w-full max-h-[50svh] max-w-[480px] sm:aspect-[4/5] sm:max-h-[60svh] lg:max-h-[74svh] lg:max-w-none">
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

            {/* Cards de ativos (pares) — mobile: esq/baixo | desktop: dir/cima */}
            <motion.div
              className="absolute bottom-[10%] left-0 z-20 flex w-[min(72%,168px)] scale-[0.92] origin-bottom-left flex-col gap-1.5 sm:bottom-[12%] sm:w-[min(100%,210px)] sm:scale-100 sm:gap-2 sm:-left-2 lg:bottom-auto lg:left-auto lg:right-0 lg:top-[8%] lg:origin-top-right lg:-right-6"
              initial={{ opacity: 0, x: -24 }}
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
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#1a1a1a]/95 px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md sm:gap-2 sm:px-2.5 sm:py-2"
                >
                  <PairFlags codes={item.flags} />
                  <span className="flex-1 text-[10px] font-semibold text-white sm:text-xs">
                    {item.pair}
                  </span>
                  <ArrowUp className="h-3 w-3 text-[var(--green)] sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                  <span className="min-w-[2rem] text-right text-xs font-bold text-[var(--green)] sm:min-w-[2.5rem] sm:text-sm">
                    {item.pct}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Cards Compra / Venta — mobile: dir/cima | desktop: esq/baixo */}
            <motion.div
              className="absolute top-[8%] right-0 z-20 flex scale-[0.92] origin-top-right flex-col gap-1.5 sm:top-[10%] sm:scale-100 sm:gap-2 sm:-right-2 lg:top-auto lg:right-auto lg:bottom-[26%] lg:left-0 lg:origin-bottom-left lg:-left-8"
              initial={{ opacity: 0, x: 24 }}
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
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--green)] px-2.5 py-1.5 text-xs font-bold text-black shadow-[0_0_20px_rgba(57,255,20,0.45)] sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
                Compra
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/15 sm:h-5 sm:w-5">
                  <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--red)] px-2.5 py-1.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(225,29,46,0.45)] sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm">
                Venta
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15 sm:h-5 sm:w-5">
                  <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="relative z-10 order-3 flex justify-center lg:col-start-1 lg:row-start-2 lg:justify-start"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut, delay: 0.35 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="blue"
            href={ctaUrl}
            className="min-h-11 w-full max-w-md border-2 border-[#0033aa] px-6 py-3 text-sm shadow-[0_0_28px_rgba(0,102,255,0.55)] sm:min-h-12 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            <Star className="h-4 w-4 fill-white" />
            {hero.ctaLabel}
          </Button>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent via-[#05070a]/55 to-[#05070a] sm:h-28 lg:h-36"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(ellipse_at_center_bottom,rgba(47,107,255,0.14),transparent_70%)] sm:h-24"
      />
    </section>
  );
}
