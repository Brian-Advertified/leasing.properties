import React from "react";
import { ArrowLeft, BadgeCheck, Star } from "lucide-react";

export const Button = ({ children, variant = "primary", className = "", type = "button", style = {}, ...props }) => {
  const styles = {
    primary: "border shadow-soft hover:brightness-95",
    secondary: "border hover:brightness-95",
    ghost: "border border-transparent hover:brightness-95",
    gold: "border shadow-soft hover:brightness-95",
    glass: "border backdrop-blur hover:brightness-110"
  };
  const inlineStyles = {
    primary: { backgroundColor: "#12382d", color: "#ffffff", borderColor: "#12382d" },
    secondary: { backgroundColor: "#ffffff", color: "#12382d", borderColor: "rgba(18,56,45,0.18)" },
    ghost: { backgroundColor: "transparent", color: "#12382d" },
    gold: { backgroundColor: "#c59b3d", color: "#13231c", borderColor: "#c59b3d" },
    glass: { backgroundColor: "rgba(255,255,255,0.12)", color: "#ffffff", borderColor: "rgba(255,255,255,0.18)" }
  };
  return (
    <button type={type} style={{ ...(inlineStyles[variant] || inlineStyles.primary), ...style }} className={`inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-3 text-sm font-black transition focus:outline-none focus:ring-4 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant] || styles.primary} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Card = ({ children, className = "", style = {}, ...props }) => (
  <section style={style} className={`rounded-[1.7rem] border border-forest/10 bg-white shadow-soft ${className}`} {...props}>{children}</section>
);

export const Surface = ({ children, className = "" }) => (
  <section className={`rounded-[1.7rem] border border-forest/10 bg-linen/70 ${className}`}>{children}</section>
);

export const Pill = ({ children, tone = "green" }) => {
  const styles = {
    green: "bg-forest/8 text-forest ring-forest/10",
    gold: "bg-gold/15 text-ink ring-gold/25",
    sand: "bg-sand/60 text-ink ring-forest/10",
    danger: "bg-red-50 text-red-700 ring-red-100",
    blue: "bg-sky-50 text-sky-800 ring-sky-100",
    white: "bg-white/12 text-white ring-white/20"
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ring-1 ${styles[tone]}`}>{children}</span>;
};

export const Rating = ({ rating = 0, count = 0 }) => (
  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-black text-ink">
    <Star className="h-4 w-4 fill-gold text-gold" /> {Number(rating).toFixed(1)} <span className="font-semibold text-ink/45">({count})</span>
  </span>
);

export const Verified = ({ label = "Verified" }) => (
  <Pill tone="green"><BadgeCheck className="h-3.5 w-3.5" /> {label}</Pill>
);

export const EmptyState = ({ title, text, action }) => (
  <Card className="p-8 text-center">
    <h3 className="text-xl font-black text-forest">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/65">{text}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </Card>
);

export const SectionTitle = ({ eyebrow, title, text, action }) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div>
      {eyebrow ? <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-gold">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black tracking-tight text-forest md:text-4xl">{title}</h2>
      {text ? <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65 md:text-base">{text}</p> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);

export const PageHero = ({ eyebrow, title, text, children, compact = false }) => (
  <section
    className={`force-white relative overflow-hidden rounded-[2rem] border border-white/10 text-white shadow-premium ${compact ? "p-5" : "p-6 md:p-8"}`}
    style={{
      background:
        "radial-gradient(circle at 92% 8%, rgba(197,155,61,0.22), transparent 22rem), linear-gradient(135deg, #050505 0%, #181818 56%, #3a3324 100%)"
    }}
  >
    <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
    <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        {eyebrow ? <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{eyebrow}</p> : null}
        <h1 className="force-white mt-3 max-w-3xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">{title}</h1>
        {text ? <p className="force-muted-white mt-4 max-w-2xl text-sm leading-6 text-white/78 md:text-base">{text}</p> : null}
      </div>
      {children ? <div>{children}</div> : null}
    </div>
  </section>
);

export const BackButton = ({ children = "Back", onClick }) => (
  <button type="button" onClick={onClick} className="inline-flex w-fit items-center gap-2 rounded-full border border-forest/10 bg-white px-4 py-2 text-sm font-black text-forest shadow-sm hover:bg-forest/5">
    <ArrowLeft className="h-4 w-4" /> {children}
  </button>
);

export const StatCard = ({ icon: Icon, label, value, text, tone = "light" }) => {
  const isDark = tone === "dark";
  const bg = isDark ? "#181818" : tone === "green" ? "rgba(18,56,45,0.06)" : tone === "gold" ? "rgba(197,155,61,0.16)" : "#ffffff";
  return (
    <Card className="p-4" style={{ backgroundColor: bg }}>
      {Icon ? <span className={`grid h-10 w-10 place-items-center rounded-2xl ${isDark ? "bg-white/10 text-gold" : "bg-gold/15 text-gold"}`}><Icon className="h-5 w-5" /></span> : null}
      <p className={`mt-3 text-xs font-black uppercase tracking-wide ${isDark ? "force-muted-white text-white/45" : "text-ink/40"}`}>{label}</p>
      <p className={`mt-1 text-2xl font-black capitalize ${isDark ? "force-white text-white" : "text-forest"}`}>{value}</p>
      {text ? <p className={`mt-1 text-xs leading-5 ${isDark ? "force-muted-white text-white/60" : "text-ink/55"}`}>{text}</p> : null}
    </Card>
  );
};

export const ActionTile = ({ icon: Icon, title, text, meta, onClick, active = false }) => (
  <button type="button" onClick={onClick} className={`w-full rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-soft ${active ? "border-gold bg-gold/10" : "border-forest/10 bg-white hover:border-gold/40"}`}>
    <div className="flex gap-3">
      {Icon ? <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${active ? "bg-gold text-ink" : "bg-forest/5 text-gold"}`}><Icon className="h-5 w-5" /></span> : null}
      <span>
        <span className="block font-black text-forest">{title}</span>
        {text ? <span className="mt-1 block text-xs leading-5 text-ink/55">{text}</span> : null}
        {meta ? <span className="mt-2 block text-xs font-black uppercase tracking-wide text-gold">{meta}</span> : null}
      </span>
    </div>
  </button>
);

export const Field = ({ label, children }) => (
  <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-ink/55">
    {label}
    {children}
  </label>
);

export const inputClass = "w-full rounded-2xl border border-forest/10 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-gold focus:ring-4 focus:ring-gold/15";

export const PageFallback = ({ title = "This page needs a booking first", text = "Start from your dashboard or choose a verified property so we can show the right details.", action }) => (
  <Card className="p-8 text-center">
    <h2 className="text-2xl font-black text-forest">{title}</h2>
    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-ink/60">{text}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </Card>
);
