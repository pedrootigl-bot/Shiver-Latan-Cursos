"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { content } from "@/lib/content";
import { renderHighlightedText } from "@/lib/highlight-text";
import {
  easeOut,
  fadeLeft,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

export function Mentor() {
  const { mentor, ctaUrl } = content;

  return (
    <section
      id={mentor.id}
      aria-labelledby="mentor-titulo"
      aria-label="Sobre El Mentor Trader"
      className="section-fade-top section-deferred relative overflow-hidden bg-[#05070a] py-1 lg:py-1.5"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <motion.div
          className="relative order-1 flex flex-col justify-center px-4 pb-4 pt-10 sm:px-10 sm:pt-14 lg:order-2 lg:px-12 lg:py-20 xl:px-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)] sm:text-xs"
          >
            {mentor.eyebrow}
          </motion.p>

          <motion.h2
            id="mentor-titulo"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mt-3 max-w-xl text-[1.65rem] font-extrabold leading-[1.14] tracking-tight text-white sm:mt-4 sm:text-4xl sm:leading-[1.12] lg:text-[2.75rem]"
          >
            {mentor.titleBefore}{" "}
            <span className="text-[var(--blue-glow)]">{mentor.titleHighlight}</span>
          </motion.h2>

          <div className="mt-4 flex max-w-xl flex-col gap-3.5 sm:mt-5 sm:gap-4">
            {mentor.paragraphs.map((paragraph, index) => (
              <motion.p
                key={paragraph.text.slice(0, 32)}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  ease: easeOut,
                  delay: index * 0.05,
                }}
                className={
                  index === 0
                    ? "text-[0.9375rem] leading-[1.72] text-white/88 sm:text-base sm:leading-[1.75]"
                    : index === mentor.paragraphs.length - 1
                      ? "text-[0.875rem] leading-[1.68] text-white/75 sm:text-[0.9375rem] sm:leading-[1.72]"
                      : "text-[0.875rem] leading-[1.68] text-white/68 sm:text-[0.9375rem] sm:leading-[1.72]"
                }
              >
                {renderHighlightedText(paragraph.text, paragraph.highlights)}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
            className="mt-8 hidden border-t border-white/[0.08] pt-7 lg:block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#0033aa] bg-[var(--blue)] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_28px_rgba(0,102,255,0.55)] transition hover:brightness-110"
            >
              <Star className="h-4 w-4 shrink-0 fill-white" />
              {mentor.ctaLabel}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative order-2 mx-4 min-h-[min(72vw,420px)] w-[calc(100%-2rem)] self-stretch overflow-hidden rounded-2xl border border-[var(--orange)]/40 sm:mx-0 sm:min-h-[560px] sm:w-full sm:rounded-none sm:rounded-r-2xl sm:border-y sm:border-l-0 sm:border-r lg:order-1 lg:mx-0 lg:min-h-0 lg:h-full lg:w-full"
        >
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            quality={80}
            loading="lazy"
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070a]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#05070a]/50"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOut }}
          className="order-3 border-t border-white/[0.08] px-4 pb-10 pt-6 sm:px-10 sm:pb-12 lg:hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#0033aa] bg-[var(--blue)] px-4 py-3.5 text-[0.8125rem] font-bold uppercase tracking-wide text-white shadow-[0_0_28px_rgba(0,102,255,0.55)] transition hover:brightness-110 sm:px-7 sm:text-sm"
          >
            <Star className="h-4 w-4 shrink-0 fill-white" />
            {mentor.ctaLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
