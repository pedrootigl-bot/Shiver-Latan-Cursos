export function PhoneStatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className="flex items-center justify-between bg-black px-3 py-[5px]">
      <span className="text-[9px] font-semibold tabular-nums text-white/90">
        {time}
      </span>
      <div className="flex items-center gap-[5px] text-white/75">
        <svg viewBox="0 0 18 12" className="h-[9px] w-[14px]" aria-hidden>
          <rect x="0" y="8" width="2.5" height="4" rx="0.6" fill="currentColor" opacity="0.5" />
          <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.6" fill="currentColor" opacity="0.7" />
          <rect x="8" y="3" width="2.5" height="9" rx="0.6" fill="currentColor" opacity="0.85" />
          <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.6" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-[9px] w-[14px]" aria-hidden>
          <path
            d="M8 2.5c2.2 0 4.2 1 5.5 2.6L15 4C13.4 2 10.8.8 8 .8S2.6 2 1 4l1.5 1.1C3.8 3.5 5.8 2.5 8 2.5z"
            fill="currentColor"
            opacity="0.45"
          />
          <path
            d="M8 5.2c1.3 0 2.5.6 3.3 1.5l1.2-.9C11.2 4.3 9.7 3.6 8 3.6S4.8 4.3 3.5 5.8l1.2.9c.8-.9 2-1.5 3.3-1.5z"
            fill="currentColor"
            opacity="0.75"
          />
          <circle cx="8" cy="9.5" r="1.4" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 22 11" className="h-[9px] w-[18px]" aria-hidden>
          <rect x="0.5" y="0.5" width="18" height="10" rx="2.2" stroke="currentColor" fill="none" strokeWidth="1" />
          <rect x="2" y="2" width="13" height="7" rx="1" fill="currentColor" />
          <rect x="19.5" y="3.5" width="2" height="4" rx="0.8" fill="currentColor" opacity="0.65" />
        </svg>
      </div>
    </div>
  );
}

export function PhoneHomeIndicator() {
  return (
    <div className="flex justify-center bg-black py-[7px]">
      <div className="h-[3px] w-[52px] rounded-full bg-white/30" />
    </div>
  );
}
