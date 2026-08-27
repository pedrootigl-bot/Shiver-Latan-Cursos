"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { content, type ResultCarouselItem } from "@/lib/content";
import { ReviewCard } from "./results/ReviewCard";
import { TradingCard } from "./results/TradingCard";
import { ChatCard } from "./results/ChatCard";
import { WalletCard } from "./results/WalletCard";

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

export function Results() {
  const { results } = content;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 0;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, results.carousel.length - 1));
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, [results.carousel.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollTo = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 280;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 280;
    el.scrollTo({ left: index * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section
      id={results.id}
      aria-labelledby="resultados-titulo"
      className="section-fade-top relative overflow-hidden bg-[#0b0d11] pb-16 pt-14 lg:pb-24 lg:pt-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.10),transparent_68%)]"
        animate={{ opacity: [0.55, 1, 0.55], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--blue-glow)]/30 bg-[var(--blue-glow)]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--blue-glow)]">
            <Zap className="h-3.5 w-3.5 fill-[var(--blue-glow)]" />
            {results.badge}
          </span>

          <h2
            id="resultados-titulo"
            className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
          >
            {results.titleBefore}{" "}
            <span className="text-[var(--blue-soft)]">
              {results.titleHighlight}
            </span>
          </h2>

          <div className="mt-4 space-y-1 text-sm leading-relaxed text-white/50 sm:text-base">
            {results.description.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-12 lg:mt-14">
          <button
            type="button"
            onClick={() => scrollTo(-1)}
            disabled={!canScrollLeft}
            aria-label="Anterior"
            className="absolute -left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--blue-glow)]/35 bg-[#0f1218]/90 text-[var(--blue-glow)] shadow-lg backdrop-blur-sm transition hover:border-[var(--blue-glow)]/60 hover:bg-[#141820] disabled:pointer-events-none disabled:opacity-30 lg:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollTo(1)}
            disabled={!canScrollRight}
            aria-label="Próximo"
            className="absolute -right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--blue-glow)]/35 bg-[#0f1218]/90 text-[var(--blue-glow)] shadow-lg backdrop-blur-sm transition hover:border-[var(--blue-glow)]/60 hover:bg-[#141820] disabled:pointer-events-none disabled:opacity-30 lg:hidden"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none [&::-webkit-scrollbar]:hidden"
          >
            {results.carousel.map((item, index) => (
              <motion.div
                key={`${item.type}-${index}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="w-[min(85vw,280px)] shrink-0 snap-start sm:w-[300px] lg:w-auto lg:shrink"
              >
                <div className="h-[380px] sm:h-[400px]">
                  <ResultCard item={item} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
            {results.carousel.map((item, index) => (
              <button
                key={`dot-${item.type}-${index}`}
                type="button"
                aria-label={`Ir para slide ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-6 bg-[var(--blue-glow)]"
                    : "w-2 bg-white/20 hover:bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
