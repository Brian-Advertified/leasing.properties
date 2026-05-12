import React from "react";
import { ArrowRight, Bath, BedDouble, MapPin, ShieldCheck } from "lucide-react";
import { money } from "../../lib/formatters";

export function ListingCard({ listing, onClick }) {
  const leaseLabel = listing.duration === "monthly" ? "Long lease" : listing.duration || "Rental";
  return (
    <article className="group overflow-hidden rounded-[1.45rem] border border-black/10 bg-white shadow-[0_18px_55px_rgba(19,35,28,0.12)] transition hover:-translate-y-1 hover:border-[#ed1c24]/60">
      <button type="button" onClick={() => onClick(listing)} className="block w-full text-left" aria-label={`View ${listing.title}`}>
        <div className="relative h-52 overflow-hidden bg-[#f1ece3]">
          <img src={listing.lowDataImageUrl || listing.imageUrl} alt={listing.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {listing.neatStock ? <ImageBadge icon={<ShieldCheck className="h-3.5 w-3.5" />} label="Verified" /> : null}
            <ImageBadge label={leaseLabel} tone="red" />
          </div>
        </div>
      </button>

      <div className="grid gap-3 p-4">
        <button type="button" onClick={() => onClick(listing)} className="text-left" aria-label={`View details for ${listing.title}`}>
          <p className="text-xs font-black uppercase tracking-wide text-[#ed1c24]">{listing.suburb}, {listing.city}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-black leading-tight text-[#181818]">{listing.title}</h3>
            <span className="shrink-0 rounded-full bg-[#f5f0e8] px-2.5 py-1 text-xs font-black text-[#181818]">★ {Number(listing.ratingAverage || 0).toFixed(1)}</span>
          </div>
          <p className="mt-3 text-2xl font-black text-[#181818]">{money(listing.priceAmount)}<span className="text-sm text-[#181818]/45">/{listing.priceUnit}</span></p>
          <p className="mt-2 inline-flex items-center gap-1 text-sm text-[#181818]/45"><MapPin className="h-4 w-4" /> Verified location</p>
        </button>

        <div className="flex flex-wrap gap-2 text-xs font-bold text-[#181818]/55">
          {listing.bedrooms ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f0e8] px-2.5 py-1"><BedDouble className="h-3.5 w-3.5" /> {listing.bedrooms} beds</span> : null}
          {listing.bathrooms ? <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f0e8] px-2.5 py-1"><Bath className="h-3.5 w-3.5" /> {listing.bathrooms} baths</span> : null}
          <span className="rounded-full bg-[#f5f0e8] px-2.5 py-1">Available now</span>
        </div>

        <button type="button" onClick={() => onClick(listing)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ed1c24] px-4 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#ff343d] focus:outline-none focus:ring-4 focus:ring-[#ed1c24]/25" aria-label={`View rental ${listing.title}`}>
          View rental <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function ImageBadge({ label, icon, tone = "dark" }) {
  const style = tone === "red" ? "border-[#ed1c24] bg-[#ed1c24] text-white" : "border-white/20 bg-black/70 text-white";
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-lg backdrop-blur ${style}`}>{icon}{label}</span>;
}
