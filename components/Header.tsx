import Link from "next/link";
import { content } from "@/lib/content";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center px-6 py-5 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--blue)] text-xs font-extrabold lowercase tracking-tight text-white">
            {content.brand.logoMark}
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            {content.brand.logoText}
          </span>
        </Link>
      </div>
    </header>
  );
}
