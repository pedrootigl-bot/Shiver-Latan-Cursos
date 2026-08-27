"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Award, Crosshair, GraduationCap } from "lucide-react";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import {
  easeOut,
  fadeLeft,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

const credentialIcons = {
  target: Crosshair,
  award: Award,
  users: GraduationCap,
} as const;

export function Mentor() {
  const { mentor } = content;

  return (
    <section
      id={mentor.id}
      aria-labelledby="mentor-titulo"
      className="section-fade-top relative overflow-hidden bg-[#05070a] py-1 lg:py-1.5"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        {/* Textos — mobile 1º | desktop coluna direita */}
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
            className="mt-3 text-[1.65rem] font-extrabold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-[2.75rem]"
          >
            {mentor.titleBefore}{" "}
            <span className="text-[var(--orange)]">
              {mentor.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base"
          >
            {mentor.bio}
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-6 grid grid-cols-1 gap-5 sm:mt-8 sm:grid-cols-3 sm:gap-4"
          >
            {mentor.credentials.map((item) => {
              const Icon = credentialIcons[item.icon];
              return (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: easeOut }}
                  whileHover={{ y: -4 }}
                  className="flex flex-row items-center gap-3 sm:flex-col sm:items-center sm:gap-2.5 sm:text-center"
                >
                  <Icon
                    className="h-6 w-6 shrink-0 text-[var(--blue-glow)] sm:h-7 sm:w-7"
                    strokeWidth={1.6}
                  />
                  <span className="max-w-[16rem] text-[11px] font-bold uppercase leading-snug tracking-wide text-white sm:max-w-[11rem]">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base"
          >
            {mentor.bioClosing}
          </motion.p>

          {/* CTA no fluxo do texto só no desktop */}
          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-8 hidden lg:block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="orange"
              href={content.ctaUrl}
              className="rounded-xl px-7 py-3.5"
            >
              {mentor.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Imagem — mobile 2º (após textos) | desktop esquerda full-height */}
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
            quality={95}
            className="object-cover object-[center_20%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070a]/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#05070a]/50"
          />
        </motion.div>

        {/* CTA mobile — após a imagem */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, ease: easeOut }}
          className="order-3 px-4 pb-10 pt-5 sm:px-10 sm:pb-12 sm:pt-6 lg:hidden"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="orange"
            href={content.ctaUrl}
            className="min-h-12 w-full whitespace-normal rounded-xl px-4 py-3.5 text-center text-[11px] leading-snug sm:px-7 sm:text-sm"
          >
            <span className="flex min-w-0 items-center justify-center gap-2">
              {mentor.ctaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
