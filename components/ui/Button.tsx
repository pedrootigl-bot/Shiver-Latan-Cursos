import Link from "next/link";

type Variant = "blue" | "orange" | "outline";

const styles: Record<Variant, string> = {
  blue: "bg-[var(--blue)] text-white shadow-[0_0_24px_rgba(47,107,255,0.45)] hover:brightness-110",
  orange:
    "bg-[var(--orange)] text-white shadow-[0_0_24px_rgba(255,122,26,0.4)] hover:brightness-110",
  outline:
    "border border-[var(--blue)] text-[var(--blue)] bg-transparent hover:bg-[var(--blue)]/10",
};

export function Button({
  variant,
  href,
  children,
  className = "",
}: {
  variant: Variant;
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
