"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { content } from "@/lib/content";
import { renderHighlightedText } from "@/lib/highlight-text";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export function UrgencyCta() {
  const { urgency, ctaUrl } = content;

  return (
    <section
      id={urgency.id}
      aria-labelledby="urgencia-titulo"
      aria-label="Únete a la sala de El Mentor Trader"
      className="section-fade-top section-deferred relative isolate overflow-hidden bg-[#0b0d11] py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urgency.backgroundImage}
          alt=""
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center blur-md sm:blur-lg"
        />
        <div className="absolute inset-0 bg-[#0b0d11]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0d11]/55 via-[#0b0d11]/10 to-[#0b0d11]/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-center text-center"
        >
          <motion.h2
            id="urgencia-titulo"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: easeOut }}
            className="max-w-2xl text-[1.65rem] font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl sm:leading-[1.12]"
          >
            {urgency.titleBefore}{" "}
            <span className="text-[var(--blue-glow)]">{urgency.titleHighlight}</span>
          </motion.h2>

          <div className="mt-4 flex max-w-2xl flex-col gap-3.5 sm:mt-5 sm:gap-4">
            {urgency.paragraphs.map((paragraph, index) => (
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
                    : "text-[0.875rem] leading-[1.68] text-white/68 sm:text-[0.9375rem] sm:leading-[1.72]"
                }
              >
                {renderHighlightedText(paragraph.text, paragraph.highlights)}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.12 }}
            className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 border-t border-white/[0.08] pt-7 sm:mt-9 sm:pt-8"
          >
            <motion.a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#0033aa] bg-[var(--blue)] px-6 py-3.5 text-[0.8125rem] font-bold uppercase tracking-wide text-white shadow-[0_0_28px_rgba(0,102,255,0.55)] transition hover:brightness-110 sm:min-h-[3.25rem] sm:px-8 sm:text-sm"
            >
              <Star className="h-4 w-4 shrink-0 fill-white" />
              {urgency.ctaLabel}
            </motion.a>
            <p className="text-center text-xs leading-relaxed tracking-[0.02em] text-white/55">
              {urgency.supportText}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
