import React from "react";
import { List, Map, Search, SlidersHorizontal } from "lucide-react";
import { Field, inputClass } from "../common/Primitives";
import { ListingCard } from "./ListingCard";

export function Discovery({ filters, applyFilters, listings, openListing, loading, viewMode, setViewMode }) {
  const cities = ["", "Benoni", "Cape Town", "Johannesburg", "Midrand", "Randburg", "Roodepoort", "Sandton", "Soweto", "Vereeniging"];
  return (
    <div className="grid gap-5">
      <section className="rounded-[1.7rem] border border-black/10 bg-white p-4 shadow-[0_18px_55px_rgba(19,35,28,0.10)] md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ed1c24]">Rent</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#181818] md:text-4xl">Find your next rental</h1>
            <p className="mt-1 text-sm text-[#181818]/55">Search by area, budget and type. Choose long lease, short stay or workspace, then open the listing to complete the right journey.</p>
          </div>
          <button onClick={() => setViewMode(viewMode === "list" ? "map" : "list")} className="inline-flex h-11 w-fit items-center gap-2 rounded-2xl border border-black/10 bg-[#f5f0e8] px-4 text-sm font-black text-[#181818] hover:border-[#ed1c24]">
            {viewMode === "list" ? <Map className="h-4 w-4" /> : <List className="h-4 w-4" />} {viewMode === "list" ? "Map view" : "List view"}
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr]">
          <Field label="Search"><div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-ink/35" /><input className={`${inputClass} pl-10`} placeholder="Suburb, city or building" value={filters.q} onChange={(e) => applyFilters({ q: e.target.value })} /></div></Field>
          <Field label="City"><select className={inputClass} value={filters.city} onChange={(e) => applyFilters({ city: e.target.value })}>{cities.map((city) => <option key={city} value={city}>{city || "All cities"}</option>)}</select></Field>
          <Field label="Journey"><select className={inputClass} value={filters.duration} onChange={(e) => { const duration = e.target.value; applyFilters({ duration, category: duration === "hourly" ? "commercial" : "residential" }); }}><option value="">All</option><option value="monthly">Long lease</option><option value="daily">Short stay</option><option value="hourly">Workspace</option></select></Field>
          <Field label="Max rent"><input className={inputClass} placeholder="e.g. 9000" inputMode="numeric" value={filters.maxPrice} onChange={(e) => applyFilters({ maxPrice: e.target.value })} /></Field>
        </div>
        <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#181818]/55"><SlidersHorizontal className="h-4 w-4" /> We keep the first view simple. Each listing now opens the correct journey: apply, book a stay, or reserve workspace.</p>
      </section>

      {loading ? <div className="grid gap-4 md:grid-cols-3">{[1,2,3].map((i) => <div key={i} className="h-80 animate-pulse rounded-[1.7rem] bg-white/70" />)}</div> : null}
      {!loading && viewMode === "map" ? <MapPanel listings={listings} openListing={openListing} /> : null}
      {!loading && viewMode === "list" ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} onClick={openListing} />)}</div> : null}
    </div>
  );
}

function MapPanel({ listings, openListing }) {
  return <section className="grid gap-3 rounded-[1.7rem] border border-black/10 bg-white p-4 shadow-[0_18px_55px_rgba(19,35,28,0.10)] md:grid-cols-2"><div className="min-h-80 rounded-[1.4rem] bg-[radial-gradient(circle_at_30%_20%,#c59b3d33,transparent_25%),linear-gradient(135deg,#12382d,#1f5f4a)] p-5 text-white"><p className="text-sm font-bold opacity-70">Map view</p><h3 className="mt-2 text-2xl font-black">Explore rentals by area</h3><p className="mt-2 max-w-sm text-sm opacity-80">Use this view to compare nearby rentals by area, price and availability.</p></div><div className="grid gap-2">{listings.slice(0,5).map((listing) => <button key={listing.id} onClick={() => openListing(listing)} className="rounded-2xl border border-forest/10 p-3 text-left hover:border-[#ed1c24]"><p className="font-black text-[#181818]">{listing.title}</p><p className="text-sm text-[#181818]/55">{listing.suburb}, {listing.city}</p></button>)}</div></section>;
}
