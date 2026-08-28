"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Star, X } from "lucide-react";
import { content } from "@/lib/content";
import { renderHighlightedText } from "@/lib/highlight-text";
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
      preload={active ? "metadata" : "none"}
      aria-hidden
    />
  );
}

function ModuleVideoModal({
  item,
  onClose,
  autoPlay = true,
}: {
  item: ModuleItem;
  onClose: () => void;
  autoPlay?: boolean;
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
    if (!autoPlay) return;
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        /* usuário pode iniciar pelo controle nativo */
      });
    }
  }, [autoPlay, item.video]);

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
        aria-label="Cerrar modal"
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
          aria-label="Cerrar"
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
            preload="none"
          >
            Tu navegador no admite video HTML5.
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

function TestimonialsGalleryModal({
  items,
  eyebrow,
  tapHint,
  onClose,
  onSelect,
}: {
  items: readonly ModuleItem[];
  eyebrow: string;
  tapHint: string;
  onClose: () => void;
  onSelect: (item: ModuleItem) => void;
}) {
  const titleId = useId();

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

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      data-lenis-prevent
    >
      <div
        className="flex min-h-full items-center justify-center p-3 sm:p-6"
        onClick={onClose}
      >
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative z-10 my-8 w-full max-w-[min(100%,56rem)] sm:my-10"
          onClick={onClose}
        >
        <div className="relative mb-5 sm:mb-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/90 backdrop-blur-md transition hover:bg-black/75 hover:text-white sm:h-11 sm:w-11"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>

          <p
            id={titleId}
            className="mx-auto px-12 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--blue-glow)] sm:px-14 sm:text-xs"
          >
            {eyebrow}
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {items.map((item, index) => (
            <motion.button
              key={item.num}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              whileTap={{ scale: 0.98 }}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(item);
              }}
              aria-label={`${item.title}. ${item.description}`}
              className="group relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070a10] text-left shadow-[0_0_40px_rgba(47,107,255,0.12)] outline-none transition hover:border-white/20 focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)]"
            >
              <ModuleCardVideo
                src={item.preview}
                poster={item.image}
                active
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-black/80 via-black/45 to-transparent px-4 pb-7 pt-24 sm:pb-9 sm:pt-28">
                <span className="max-w-[14rem] text-center text-[11px] font-bold uppercase leading-snug tracking-wide text-white sm:text-xs">
                  {tapHint}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Modules() {
  const { modules } = content;
  const [activeModule, setActiveModule] = useState<ModuleItem | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
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
      aria-label="Testimonios en vídeo de alumnos"
      className="section-fade-top section-fade-bottom section-deferred relative -mt-16 overflow-hidden bg-[#05070a] pb-16 pt-24 sm:-mt-24 sm:pb-28 sm:pt-36 lg:-mt-32 lg:pb-36 lg:pt-44"
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
              className="max-w-md text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-white sm:max-w-lg sm:text-4xl sm:leading-tight"
            >
              {modules.title}
            </motion.h2>

            <div className="flex max-w-md flex-col gap-3 sm:max-w-lg sm:gap-3.5">
              {modules.paragraphs.map((paragraph, index) => (
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
                      : index === modules.paragraphs.length - 1
                        ? "text-[0.875rem] leading-[1.68] text-white/75 sm:text-[0.9375rem] sm:leading-[1.72]"
                        : "text-[0.875rem] leading-[1.65] text-white/62 sm:text-[0.9375rem] sm:leading-[1.7]"
                  }
                >
                  {renderHighlightedText(paragraph.text, paragraph.highlights)}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: easeOut, delay: 0.2 }}
              className="mt-2 flex w-full max-w-md flex-col items-stretch gap-3 border-t border-white/[0.08] pt-5 sm:max-w-lg sm:pt-6"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="button"
                  onClick={() => setIsGalleryOpen(true)}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#0033aa] bg-[var(--blue)] px-6 py-3.5 text-[0.8125rem] font-bold uppercase tracking-wide text-white shadow-[0_0_28px_rgba(0,102,255,0.55)] transition hover:brightness-110 sm:min-h-[3.25rem] sm:px-8 sm:text-sm"
                >
                  <Star className="h-4 w-4 shrink-0 fill-white" />
                  {modules.ctaLabel}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            <div className="relative">
              <div
                ref={scrollRef}
                className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none lg:gap-4 [&::-webkit-scrollbar]:hidden"
                data-lenis-prevent-touch
              >
                {modules.items.map((item, index) => {
                  const videoActive =
                    !activeModule &&
                    !isGalleryOpen &&
                    (visibleVideos[item.num] ?? index < 3);

                  return (
                    <motion.button
                      key={item.num}
                      type="button"
                      data-module-video={item.num}
                      onClick={() => setActiveModule(item)}
                      aria-label={`${item.title}. ${item.description}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative aspect-[2/3] w-[min(78vw,280px)] shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl bg-[#070a10] p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-glow)] sm:w-auto sm:shrink sm:snap-start"
                    >
                      <ModuleCardVideo
                        src={item.preview}
                        poster={item.image}
                        active={videoActive}
                      />

                      <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/35 opacity-100 transition-opacity duration-300 sm:bg-black/45 sm:opacity-0 sm:group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-md sm:bg-white/10 sm:px-5 sm:py-2.5 sm:text-xs">
                          <Play className="h-3.5 w-3.5 fill-white" />
                          {modules.playLabel}
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
                    aria-label={`Ir al testimonio ${item.num}`}
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
        {isGalleryOpen ? (
          <TestimonialsGalleryModal
            items={modules.items}
            eyebrow={modules.eyebrow}
            tapHint={modules.galleryTapHint}
            onClose={() => setIsGalleryOpen(false)}
            onSelect={(item) => {
              setIsGalleryOpen(false);
              setActiveModule(item);
            }}
          />
        ) : null}
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
