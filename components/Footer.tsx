"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { content } from "@/lib/content";
import { easeOut, fadeUp, viewportOnce } from "@/lib/motion";

export function Footer() {
  const { footer } = content;

  return (
    <footer
      aria-label="Rodapé do site"
      className="border-t border-white/[0.06] bg-[#05070a]"
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.55, ease: easeOut }}
      >
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            <h3 className="text-sm font-bold text-white">{footer.riskTitle}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/45">
              {footer.riskWarning}
            </p>
          </div>

          <motion.div
            className="flex max-w-none items-center gap-3 sm:max-w-[220px] lg:justify-self-end"
            whileHover={{ scale: 1.02 }}
          >
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-white/20"
                animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                aria-hidden
                className="absolute inset-1.5 rounded-full border border-white/15"
              />
              <Shield
                className="relative h-5 w-5 text-white/70 sm:h-6 sm:w-6"
                strokeWidth={1.5}
              />
            </span>
            <p className="text-xs leading-snug text-white/50">
              {footer.secureLabel}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: 0.1, ease: easeOut }}
          className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-5 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-6"
        >
          <p className="text-xs text-white/40">{footer.copyright}</p>
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/45">
            {footer.links.map((link, index) => (
              <span key={link.label} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden className="text-white/25">
                    ·
                  </span>
                ) : null}
                <Link
                  href={link.href}
                  className="transition hover:text-white/70"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </motion.div>
      </motion.div>
    </footer>
  );
}
