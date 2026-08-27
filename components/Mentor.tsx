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
      className="section-fade-top relative overflow-hidden bg-[#05070a] py-1 lg:py-1.5"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative min-h-[560px] w-full self-stretch overflow-hidden rounded-r-2xl border-y border-r border-[var(--orange)]/40 sm:min-h-[640px] lg:min-h-0 lg:h-full"
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

        <motion.div
          className="relative flex flex-col justify-center px-6 py-14 sm:px-10 lg:max-w-none lg:px-12 lg:py-20 xl:px-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.45, ease: easeOut }}
            className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)]"
          >
            {mentor.eyebrow}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.55, ease: easeOut }}
            className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {mentor.titleBefore}{" "}
            <span className="text-[var(--orange)]">
              {mentor.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80"
          >
            {mentor.bio}
          </motion.p>

          <motion.ul
            variants={staggerContainer}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4"
          >
            {mentor.credentials.map((item) => {
              const Icon = credentialIcons[item.icon];
              return (
                <motion.li
                  key={item.label}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: easeOut }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-start gap-2.5 sm:items-center sm:text-center"
                >
                  <Icon
                    className="h-7 w-7 text-[var(--blue-glow)]"
                    strokeWidth={1.6}
                  />
                  <span className="max-w-[11rem] text-[11px] font-bold uppercase leading-snug tracking-wide text-white">
                    {item.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/80"
          >
            {mentor.bioClosing}
          </motion.p>

          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-8"
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
      </div>
    </section>
  );
}
