import React, { useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Home, ShieldCheck, UserRound } from "lucide-react";
import { api } from "../../lib/api/client";
import { Button, Card, Field, Pill, inputClass } from "../common/Primitives";
import { SCREEN_LANDLORD } from "../../app/constants/screens";

const defaultForm = {
  title: "",
  city: "Johannesburg",
  suburb: "",
  address: "",
  priceAmount: "",
  bedrooms: "2",
  category: "residential",
  managedByType: "landlord",
  assignedAgentName: "",
  assignedAgentPhone: ""
};

const managementOptions = [
  { id: "landlord", label: "I will manage this property", text: "Messages, viewings and applications come to the owner.", icon: Home },
  { id: "agent", label: "Assign a leasing agent", text: "An agent handles tenant enquiries and viewing times.", icon: UserRound },
  { id: "property_manager", label: "Assign a property manager", text: "A manager handles the day-to-day rental process.", icon: Building2 }
];

export function NewPropertyPage({ currentUserId, onCreated, setScreen }) {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setResult(null);
    try {
      const created = await api("/properties", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          ownerId: currentUserId,
          priceAmount: Number(form.priceAmount || 0),
          bedrooms: Number(form.bedrooms || 0)
        })
      });
      setResult(created);
      onCreated?.(created);
    } catch (err) {
      setError(err.message || "We could not save this property yet. Please check the details and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-premium">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-br from-forest to-moss opacity-95 lg:block" />
        <div className="relative grid gap-6 p-6 lg:grid-cols-[1fr_360px] md:p-8">
          <div>
            <div className="flex flex-wrap gap-2"><Pill tone="gold">New listing</Pill><Pill tone="green">Landlord + agent ready</Pill></div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-forest md:text-6xl">Add a rental without confusing tenants later.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-ink/65">Create the property, choose who tenants should speak to, and keep viewings or applications routed to the right person from day one.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white p-4 shadow-soft lg:bg-white/90">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Simple setup</p>
            <div className="mt-4 grid gap-3">
              <MiniStep number="1" title="Property" text="Add the rental details." />
              <MiniStep number="2" title="Contact" text="Assign landlord, agent or manager." />
              <MiniStep number="3" title="Verify" text="Checks happen before going live." />
            </div>
          </div>
        </div>
      </section>

      {result ? (
        <Card className="border-gold/30 bg-gold/10 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-forest text-gold"><CheckCircle2 className="h-6 w-6" /></span>
              <div>
                <h3 className="text-xl font-black text-forest">Property saved</h3>
                <p className="mt-1 text-sm leading-6 text-ink/65">{result.listing?.title || "Your property"} was added as a draft. You can review it before it goes live.</p>
              </div>
            </div>
            <Button onClick={() => setScreen?.(SCREEN_LANDLORD)}>Back to workspace</Button>
          </div>
        </Card>
      ) : null}

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <Card className="p-5 md:p-6">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/15 text-gold"><Home className="h-5 w-5" /></span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Rental details</p>
              <h3 className="mt-1 text-2xl font-black text-forest">What are you listing?</h3>
              <p className="mt-1 text-sm text-ink/60">Keep the first listing step light. Documents and verification can follow after the draft is saved.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Field label="Property title"><input className={inputClass} value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Northgate Heights - 2 Bedroom Apartment" required /></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="City"><input className={inputClass} value={form.city} onChange={(e) => update({ city: e.target.value })} /></Field>
              <Field label="Suburb"><input className={inputClass} value={form.suburb} onChange={(e) => update({ suburb: e.target.value })} placeholder="Sandton, Rosebank, Umhlanga..." required /></Field>
            </div>
            <Field label="Address"><input className={inputClass} value={form.address} onChange={(e) => update({ address: e.target.value })} placeholder="Street address or building name" /></Field>
            <div className="grid gap-3 md:grid-cols-3">
              <Field label="Monthly rent"><input type="number" className={inputClass} value={form.priceAmount} onChange={(e) => update({ priceAmount: e.target.value })} placeholder="8500" required /></Field>
              <Field label="Bedrooms"><input type="number" className={inputClass} value={form.bedrooms} onChange={(e) => update({ bedrooms: e.target.value })} /></Field>
              <Field label="Type"><select className={inputClass} value={form.category} onChange={(e) => update({ category: e.target.value })}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></Field>
            </div>
          </div>
        </Card>

        <Card className="h-fit p-5 md:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-forest text-gold"><ShieldCheck className="h-5 w-5" /></span>
            <div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Tenant contact</p><h3 className="mt-1 text-xl font-black text-forest">Who should tenants speak to?</h3></div>
          </div>

          <div className="mt-5 grid gap-2">
            {managementOptions.map(({ id, label, text, icon: Icon }) => (
              <button key={id} type="button" onClick={() => update({ managedByType: id })} className={`rounded-2xl border p-3 text-left transition ${form.managedByType === id ? "border-gold bg-gold/15 shadow-soft" : "border-forest/10 bg-white hover:border-gold/40"}`}>
                <span className="flex gap-3"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${form.managedByType === id ? "bg-forest text-gold" : "bg-forest/5 text-gold"}`}><Icon className="h-5 w-5" /></span><span><span className="block font-black text-forest">{label}</span><span className="mt-1 block text-xs leading-5 text-ink/55">{text}</span></span></span>
              </button>
            ))}
          </div>

          {form.managedByType !== "landlord" ? (
            <div className="mt-5 grid gap-3 rounded-2xl bg-linen p-4">
              <p className="text-sm font-black text-forest">Assigned contact</p>
              <Field label="Name"><input className={inputClass} value={form.assignedAgentName} onChange={(e) => update({ assignedAgentName: e.target.value })} placeholder="Name of agent or manager" /></Field>
              <Field label="Phone"><input className={inputClass} value={form.assignedAgentPhone} onChange={(e) => update({ assignedAgentPhone: e.target.value })} placeholder="+27..." /></Field>
            </div>
          ) : null}

          {error ? <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p> : null}
          <Button className="mt-5 w-full" type="submit" disabled={saving}>{saving ? "Saving property..." : "Save property draft"} <ArrowRight className="ml-2 h-4 w-4" /></Button>
        </Card>
      </form>
    </div>
  );
}

function MiniStep({ number, title, text }) {
  return <div className="rounded-2xl border border-forest/10 bg-linen/70 p-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-sm font-black text-gold">{number}</span><p className="mt-3 font-black text-forest">{title}</p><p className="mt-1 text-xs leading-5 text-ink/55">{text}</p></div>;
}
