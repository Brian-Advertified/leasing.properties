import React from "react";
import { Gauge, Search } from "lucide-react";
import { AFFORDABILITY_EXPENSES, getQualificationEstimate } from "../../features/qualification/qualificationEngine";
import { money } from "../../lib/formatters";
import { Button, Card, Pill } from "../common/Primitives";

export function QualificationPanel({ listing, quote, affordability, setAffordability, checked, setChecked, onShowAlternatives }) {
  const estimate = getQualificationEstimate({ listing, quote, affordability });
  const updateIncome = (value) => setAffordability((current) => ({ ...current, netIncome: value }));
  const updateExpense = (id, value) => setAffordability((current) => ({ ...current, expenses: { ...(current.expenses || {}), [id]: value } }));

  return (
    <Card className="overflow-hidden">
      <div className="bg-[#181818] p-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Before you apply</p>
        <h3 className="mt-2 text-2xl font-black">Check if this home fits your budget</h3>
        <p className="mt-2 text-sm leading-6 text-white/70">This does not guarantee approval. It estimates affordability from net income, living costs and existing credit commitments.</p>
      </div>
      <div className="grid gap-4 p-5">
        <label className="grid gap-2 text-sm font-black text-forest">
          Estimated net monthly income
          <input value={affordability.netIncome} onChange={(e) => updateIncome(e.target.value)} inputMode="numeric" placeholder="Example: 28000" className="rounded-2xl border border-forest/10 px-4 py-3 text-sm outline-none focus:border-gold focus:ring-4 focus:ring-gold/15" />
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          {AFFORDABILITY_EXPENSES.map((expense) => (
            <label key={expense.id} className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-ink/55">
              {expense.label}
              <input value={affordability.expenses?.[expense.id] || ""} onChange={(event) => updateExpense(expense.id, event.target.value)} inputMode="numeric" placeholder="0" className="rounded-2xl border border-forest/10 px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-gold focus:ring-4 focus:ring-gold/15" />
            </label>
          ))}
        </div>
        <div className="rounded-2xl bg-linen p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-ink/40">Approval estimate</p>
              <p className="mt-1 text-3xl font-black text-forest">{estimate.score}%</p>
            </div>
            <Pill tone={estimate.tone}>{estimate.label}</Pill>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-gold" style={{ width: `${estimate.score}%` }} /></div>
          <p className="mt-3 text-sm leading-6 text-ink/65">{estimate.guidance}</p>
          <div className="mt-3 grid gap-2 text-xs font-bold text-ink/55 sm:grid-cols-3">
            <span>Income guide: {money(estimate.requiredIncome)}</span>
            <span>Expenses: {money(estimate.totalExpenses)}</span>
            <span>Disposable: {money(estimate.disposableIncome)}</span>
          </div>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button onClick={() => setChecked(true)}><Gauge className="mr-2 h-4 w-4" /> {checked ? "Affordability checked" : "Check affordability"}</Button>
          {estimate.score < 60 ? <Button variant="secondary" onClick={onShowAlternatives}><Search className="mr-2 h-4 w-4" /> Show easier options</Button> : null}
        </div>
      </div>
    </Card>
  );
}
