import React from "react";

export const brand = {
  page: "bg-[#f5f0e8] text-[#181818]",
  panel: "rounded-[1.6rem] border border-white/10 bg-[#111]/92 text-white shadow-[0_24px_80px_rgba(0,0,0,0.32)]",
  creamPanel: "rounded-[1.6rem] border border-black/8 bg-[#f5f0e8] text-[#181818] shadow-[0_18px_55px_rgba(0,0,0,0.10)]",
  redButton: "rounded-full bg-[#ed1c24] px-5 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(237,28,36,0.24)] transition hover:bg-[#ff343d]",
  ghostButton: "rounded-full border border-white/16 bg-white/5 px-5 py-3 text-sm font-black text-white transition hover:bg-white/10",
  goldEyebrow: "text-[11px] font-black uppercase tracking-[0.24em] text-[#c9a84c]",
  redEyebrow: "text-[11px] font-black uppercase tracking-[0.24em] text-[#ed1c24]",
  sectionTitleDark: "text-3xl font-black tracking-[-0.055em] text-white md:text-5xl",
  sectionTitleLight: "text-3xl font-black tracking-[-0.055em] text-[#181818] md:text-5xl",
  mutedDark: "text-sm leading-7 text-white/58",
  mutedLight: "text-sm leading-7 text-[#181818]/58"
};

export function BrandButton({ variant = "primary", className = "", children, ...props }) {
  const base = variant === "ghost" ? brand.ghostButton : brand.redButton;
  return <button className={`${base} ${className}`.trim()} {...props}>{children}</button>;
}

export function BrandCard({ tone = "dark", className = "", children }) {
  const base = tone === "light" ? brand.creamPanel : brand.panel;
  return <section className={`${base} ${className}`.trim()}>{children}</section>;
}

export function PageSection({ eyebrow, title, text, tone = "dark", className = "", children }) {
  const light = tone === "light";
  return (
    <section className={`${light ? "bg-[#f5f0e8] text-[#181818]" : "bg-[#050505] text-white"} px-4 py-12 md:px-8 md:py-16 ${className}`.trim()}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || text) ? (
          <div className="max-w-2xl">
            {eyebrow ? <p className={light ? brand.redEyebrow : brand.goldEyebrow}>{eyebrow}</p> : null}
            {title ? <h2 className={`mt-3 ${light ? brand.sectionTitleLight : brand.sectionTitleDark}`}>{title}</h2> : null}
            {text ? <p className={`mt-3 ${light ? brand.mutedLight : brand.mutedDark}`}>{text}</p> : null}
          </div>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function BrandLogo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-[#111] text-white shadow-sm">
        <svg width="28" height="28" viewBox="0 0 52 50" aria-hidden="true">
          <path d="M2 34 L26 6 L50 34" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="13" y="37" width="11" height="11" rx="2" fill="#C9A84C" />
          <rect x="28" y="37" width="11" height="11" rx="2" fill="#C9A84C" />
        </svg>
      </span>
      {!compact ? (
        <span className="min-w-0">
          <span className="block truncate text-base font-normal tracking-[-0.04em] text-white">leasing<span className="font-black text-[#c9a84c]">.</span>properties</span>
          <span className="hidden truncate text-xs text-white/45 sm:block">Verified rentals made simple</span>
        </span>
      ) : null}
    </div>
  );
}
