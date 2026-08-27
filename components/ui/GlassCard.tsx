type Accent = "blue" | "orange";

const accentBorder: Record<Accent, string> = {
  blue: "border-[var(--blue)]/40 shadow-[0_0_30px_rgba(47,107,255,0.15)]",
  orange: "border-[var(--orange)]/40 shadow-[0_0_30px_rgba(255,122,26,0.15)]",
};

export function GlassCard({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: Accent;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white/5 backdrop-blur-md ${
        accent ? accentBorder[accent] : "border-white/10"
      } ${className}`}
    >
      {children}
    </div>
  );
}
