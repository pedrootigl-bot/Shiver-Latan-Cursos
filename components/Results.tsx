"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { content, type ResultCarouselItem } from "@/lib/content";
import { renderHighlightedText } from "@/lib/highlight-text";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { ReviewCard } from "./results/ReviewCard";
import { TradingCard } from "./results/TradingCard";
import { ChatCard } from "./results/ChatCard";
import { WalletCard } from "./results/WalletCard";

const cardTypeLabels: Record<ResultCarouselItem["type"], string> = {
  review: "Testimonio",
  trading: "Operaciones",
  chat: "Sala en vivo",
  wallet: "Resultado",
};

function ResultCard({ item }: { item: ResultCarouselItem }) {
  switch (item.type) {
    case "review":
      return <ReviewCard data={item} />;
    case "trading":
      return <TradingCard data={item} />;
    case "chat":
      return <ChatCard data={item} />;
    case "wallet":
      return <WalletCard data={item} />;
    default: {
      const _exhaustive: never = item;
      return _exhaustive;
    }
  }
}

function ResultsCta({
  ctaUrl,
  ctaLabel,
  supportText,
  className = "",
}: {
  ctaUrl: string;
  ctaLabel: string;
  supportText: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-stretch gap-3 border-t border-white/[0.08] pt-6 sm:pt-7 ${className}`}
    >
      <motion.a
        href={ctaUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#0033aa] bg-[var(--blue)] px-6 py-3.5 text-[0.8125rem] font-bold uppercase tracking-wide text-white transition hover:brightness-110 sm:min-h-[3.25rem] sm:px-8 sm:text-sm"
      >
        <Star className="h-4 w-4 shrink-0 fill-white" />
        {ctaLabel}
      </motion.a>
      <p className="text-center text-xs leading-relaxed tracking-[0.02em] text-white/55 lg:text-left">
        {supportText}
      </p>
    </div>
  );
}

export function Results() {
  const { results, ctaUrl } = content;

  return (
    <section
      id={results.id}
      aria-labelledby="resultados-titulo"
      aria-label="Accesos a la sala y resultados de alumnos"
      className="section-fade-top section-deferred relative bg-[#0b0d11] pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-28 lg:pt-20"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(280px,0.92fr)_minmax(0,1.35fr)] lg:gap-12 xl:gap-14">
          {/* Coluna esquerda — altura da linha = cards; sticky só no bloco de texto */}
          <div className="relative min-w-0 lg:self-stretch">
            <div className="lg:sticky lg:top-24">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="flex max-w-lg flex-col gap-4 sm:gap-5"
              >
                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)] sm:text-xs"
                >
                  {results.badge}
                </motion.p>

                <motion.h2
                  id="resultados-titulo"
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: easeOut }}
                  className="text-[1.65rem] font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl sm:leading-[1.12]"
                >
                  {results.title}
                </motion.h2>

                <div className="flex flex-col gap-3.5 sm:gap-4">
                  {results.paragraphs.map((paragraph, index) => (
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
                      {renderHighlightedText(
                        paragraph.text,
                        paragraph.highlights,
                      )}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
                  className="w-full rounded-2xl border border-[var(--blue-glow)]/20 bg-[var(--blue-glow)]/[0.06] px-4 py-4 sm:px-5 sm:py-4"
                >
                  <p className="text-[0.9375rem] font-semibold leading-[1.55] text-white sm:text-base">
                    {results.subheading}
                  </p>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: easeOut, delay: 0.14 }}
                  className="text-sm leading-relaxed text-white/52 sm:text-[0.9375rem]"
                >
                  {results.carouselIntro}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.55, ease: easeOut, delay: 0.18 }}
                  className="hidden lg:block"
                >
                  <ResultsCta
                    ctaUrl={ctaUrl}
                    ctaLabel={results.ctaLabel}
                    supportText={results.supportText}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Coluna direita — cards em fluxo normal */}
          <ul className="relative flex min-w-0 flex-col gap-4 sm:gap-5 lg:border-l lg:border-white/[0.08] lg:pl-8">
            {results.carousel.map((item, index) => (
              <motion.li
                key={`${item.type}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: easeOut }}
                className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none"
              >
                <span
                  aria-hidden
                  className="absolute -left-[2.125rem] top-7 hidden h-2.5 w-2.5 rounded-full border-2 border-[#0b0d11] bg-[var(--blue-glow)] lg:block"
                />

                <div className="mb-2.5 flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--blue-glow)] sm:text-[11px]">
                    {cardTypeLabels[item.type]}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.08]" />
                </div>

                <div className="h-[360px] overflow-hidden rounded-2xl sm:h-[390px]">
                  <ResultCard item={item} />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-10 max-w-lg lg:hidden"
        >
          <ResultsCta
            ctaUrl={ctaUrl}
            ctaLabel={results.ctaLabel}
            supportText={results.supportText}
          />
        </motion.div>
      </div>
    </section>
  );
}
