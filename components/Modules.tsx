"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { content } from "@/lib/content";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type ModuleItem = (typeof content.modules.items)[number];

function ModuleVideoModal({
  item,
  onClose,
}: {
  item: ModuleItem;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f1a] shadow-[0_0_60px_rgba(47,107,255,0.25)]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--blue-glow)]">
              Módulo {item.num}
            </p>
            <h3 id={titleId} className="mt-1 text-lg font-extrabold text-white">
              {item.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Fechar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Área de vídeo — pronta para URL futura */}
        <div className="relative aspect-video w-full bg-black">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_center,rgba(47,107,255,0.18),transparent_60%)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--blue)]/40 bg-[var(--blue)]/20 text-white shadow-[0_0_30px_rgba(47,107,255,0.35)]">
              <Play className="h-7 w-7 fill-white" />
            </div>
            <div className="px-6 text-center">
              <p className="text-base font-semibold text-white">
                Vídeo em breve
              </p>
              <p className="mt-1 max-w-md text-sm text-white/55">
                {item.description} O player será conectado aqui quando o
                conteúdo estiver disponível.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Modules() {
  const { modules } = content;
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 0;
    const gap = 16;
    const index = Math.round(el.scrollLeft / Math.max(cardWidth + gap, 1));
    setActiveIndex(Math.min(index, modules.items.length - 1));
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, [modules.items.length]);

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
    const cardWidth = el.firstElementChild?.clientWidth ?? 260;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 260;
    el.scrollTo({ left: index * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <section
      id={modules.id}
      aria-labelledby="modulos-titulo"
      className="section-fade-top section-fade-bottom relative -mt-24 overflow-hidden bg-[#05070a] pb-28 pt-36 lg:-mt-32 lg:pb-36 lg:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 via-[#05070a]/30 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.55fr)] lg:gap-12">
          <motion.div
            className="flex flex-col items-start gap-5 md:sticky md:top-28"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)]"
            >
              {modules.eyebrow}
            </motion.p>
            <motion.h2
              id="modulos-titulo"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: easeOut }}
              className="max-w-md text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {modules.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="max-w-md text-base leading-relaxed text-white/60"
            >
              {modules.description}
            </motion.p>
          </motion.div>

          <div className="flex min-w-0 flex-col gap-5">
            <div className="relative">
              <button
                type="button"
                onClick={() => scrollTo(-1)}
                disabled={!canScrollLeft}
                aria-label="Módulo anterior"
                className="absolute -left-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--blue-glow)]/35 bg-[#0f1218]/90 text-[var(--blue-glow)] shadow-lg backdrop-blur-sm transition hover:border-[var(--blue-glow)]/60 disabled:pointer-events-none disabled:opacity-30 sm:hidden"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo(1)}
                disabled={!canScrollRight}
                aria-label="Próximo módulo"
                className="absolute -right-1 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--blue-glow)]/35 bg-[#0f1218]/90 text-[var(--blue-glow)] shadow-lg backdrop-blur-sm transition hover:border-[var(--blue-glow)]/60 disabled:pointer-events-none disabled:opacity-30 sm:hidden"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div
                ref={scrollRef}
                className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:gap-4 [&::-webkit-scrollbar]:hidden"
              >
                {modules.items.map((item, index) => (
                  <motion.button
                    key={item.num}
                    type="button"
                    onClick={() => setActiveModule(item)}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative aspect-[2/3] w-[min(72vw,260px)] shrink-0 snap-start cursor-pointer overflow-hidden rounded-2xl border border-white/10 p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)] sm:w-auto sm:shrink"
                  >
                    <Image
                      src={item.image}
                      alt={`${item.num} ${item.title}`}
                      fill
                      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110"
                      sizes="(max-width: 640px) 72vw, 33vw"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-md">
                        <Play className="h-3.5 w-3.5 fill-white" />
                        Assistir
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
                {modules.items.map((item, index) => (
                  <button
                    key={`dot-${item.num}`}
                    type="button"
                    aria-label={`Ir para módulo ${item.num}`}
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

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: 0.25, ease: easeOut }}
              className="text-center text-xs font-medium tracking-wide text-white/55 sm:text-sm"
            >
              {modules.cardsHint}
            </motion.p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeModule ? (
          <ModuleVideoModal
            item={activeModule}
            onClose={() => setActiveModule(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
