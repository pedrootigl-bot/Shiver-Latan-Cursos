"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { content } from "@/lib/content";
import { easeOut, fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { startLenis, stopLenis } from "@/lib/lenis-instance";

type ModuleItem = (typeof content.modules.items)[number];

function ModuleCardVideo({
  src,
  poster,
  active,
}: {
  src: string;
  poster: string;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          /* autoplay pode ser bloqueado; poster cobre */
        });
      }
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [active]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-[1.02]"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload={active ? "auto" : "metadata"}
      aria-hidden
    />
  );
}

function ModuleVideoModal({
  item,
  onClose,
}: {
  item: ModuleItem;
  onClose: () => void;
}) {
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleColor =
    item.accent === "orange"
      ? "text-[var(--orange)]"
      : "text-[var(--blue-glow)]";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    stopLenis();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      startLenis();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        /* usuário pode iniciar pelo controle nativo */
      });
    }
  }, [item.video]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
    >
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        className="relative z-10 w-full max-w-[min(100%,380px)] overflow-hidden rounded-3xl border border-white/10 bg-[#070a10] shadow-[0_0_80px_rgba(47,107,255,0.22)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 backdrop-blur-md transition hover:bg-black/75 hover:text-white"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[9/16] max-h-[min(78vh,760px)] w-full bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={item.video}
            poster={item.image}
            controls
            playsInline
            preload="metadata"
          >
            Seu navegador não suporta vídeo HTML5.
          </video>
        </div>

        <div className="border-t border-white/10 bg-gradient-to-b from-[#0a0f1a] to-[#070a10] px-5 py-4 sm:px-6 sm:py-5">
          <h3
            id={titleId}
            className={`text-base font-extrabold uppercase leading-snug tracking-wide sm:text-lg ${titleColor}`}
          >
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">
            {item.description}
          </p>
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
  const [visibleVideos, setVisibleVideos] = useState<Record<string, boolean>>(
    {},
  );
  const mobileGap = 12;

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = el.firstElementChild?.clientWidth ?? 0;
    const index = Math.round(
      el.scrollLeft / Math.max(cardWidth + mobileGap, 1),
    );
    setActiveIndex(Math.min(index, modules.items.length - 1));
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

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const cards = root.querySelectorAll<HTMLElement>("[data-module-video]");
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleVideos((prev) => {
          const next = { ...prev };
          for (const entry of entries) {
            const key = entry.target.getAttribute("data-module-video");
            if (!key) continue;
            next[key] = entry.isIntersecting && entry.intersectionRatio > 0.45;
          }
          return next;
        });
      },
      { root: null, threshold: [0, 0.45, 0.7] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [modules.items.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 280;
    el.scrollTo({
      left: index * (cardWidth + mobileGap),
      behavior: "smooth",
    });
  };

  return (
    <section
      id={modules.id}
      aria-labelledby="modulos-titulo"
      className="section-fade-top section-fade-bottom relative -mt-16 overflow-hidden bg-[#05070a] pb-16 pt-24 sm:-mt-24 sm:pb-28 sm:pt-36 lg:-mt-32 lg:pb-36 lg:pt-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/50 via-[#05070a]/30 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.55fr)] lg:gap-12">
          <motion.div
            className="flex flex-col items-start gap-4 sm:gap-5 md:sticky md:top-28"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)] sm:text-xs"
            >
              {modules.eyebrow}
            </motion.p>
            <motion.h2
              id="modulos-titulo"
              variants={fadeUp}
              transition={{ duration: 0.55, ease: easeOut }}
              className="max-w-md text-[1.65rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl"
            >
              {modules.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOut }}
              className="max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
            >
              {modules.description}
            </motion.p>
          </motion.div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <div className="relative">
              <div
                ref={scrollRef}
                className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:gap-4 [&::-webkit-scrollbar]:hidden"
                data-lenis-prevent-touch
              >
                {modules.items.map((item, index) => {
                  const titleColor =
                    item.accent === "orange"
                      ? "text-[var(--orange)]"
                      : "text-[var(--blue-glow)]";
                  const videoActive =
                    !activeModule && (visibleVideos[item.num] ?? index < 3);

                  return (
                    <motion.button
                      key={item.num}
                      type="button"
                      data-module-video={item.num}
                      onClick={() => setActiveModule(item)}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex aspect-[2/3] w-[min(78vw,280px)] shrink-0 snap-center cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#070a10] p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)] sm:w-auto sm:shrink sm:snap-start"
                    >
                      <span className="relative block min-h-0 w-full flex-[1.35] overflow-hidden">
                        <ModuleCardVideo
                          src={item.video}
                          poster={item.image}
                          active={videoActive}
                        />
                      </span>

                      <span className="relative z-10 flex flex-col gap-2 bg-gradient-to-t from-[#070a10] via-[#070a10] to-[#070a10]/92 px-4 pb-5 pt-3 sm:px-5 sm:pb-6">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-bold text-white/70">
                          {item.num}
                        </span>
                        <span
                          className={`text-[0.95rem] font-extrabold uppercase leading-tight tracking-wide sm:text-base ${titleColor}`}
                        >
                          {item.title}
                        </span>
                        <span className="text-[12px] leading-snug text-white/70 sm:text-[13px]">
                          {item.description}
                        </span>
                      </span>

                      <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/35 opacity-100 transition-opacity duration-300 sm:bg-black/45 sm:opacity-0 sm:group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-md sm:bg-white/10 sm:px-5 sm:py-2.5 sm:text-xs">
                          <Play className="h-3.5 w-3.5 fill-white" />
                          Assistir
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
                {modules.items.map((item, index) => (
                  <button
                    key={`dot-${item.num}`}
                    type="button"
                    aria-label={`Ir para módulo ${item.num}`}
                    onClick={() => scrollToIndex(index)}
                    className={`h-2.5 min-w-2.5 rounded-full transition-all ${
                      activeIndex === index
                        ? "w-7 bg-[var(--blue-glow)]"
                        : "w-2.5 bg-white/25"
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
