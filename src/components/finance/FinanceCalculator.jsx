import React, { useMemo, useState } from "react";
import { Calculator, WalletCards } from "lucide-react";
import { money } from "../../lib/formatters";
import { Button, Card, Pill } from "../common/Primitives";

export function FinanceCalculator({ listing, quote, compact = false }) {
  const [months, setMonths] = useState(6);
  const [depositPercent, setDepositPercent] = useState(100);
  const values = useMemo(() => {
    const deposit = quote?.depositAmount || listing?.priceAmount || 0;
    const financedDeposit = Math.round(deposit * (depositPercent / 100));
    const initiationFee = financedDeposit ? 165 : 0;
    const monthlyService = financedDeposit ? 69 : 0;
    const rate = 0.035;
    const instalment = financedDeposit ? Math.round((financedDeposit * (1 + rate) + initiationFee + monthlyService * months) / months) : 0;
    const totalRepayable = instalment * months;
    const walletFunding = financedDeposit;
    const tenantPaysNow = Math.max((quote?.moveInCost || 0) - financedDeposit, 0);
    return { deposit, financedDeposit, initiationFee, monthlyService, instalment, totalRepayable, walletFunding, tenantPaysNow };
  }, [depositPercent, listing, months, quote]);

  return (
    <Card className={`${compact ? "p-4" : "p-5 md:p-6"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Finance calculator</p>
          <h3 className="mt-1 text-xl font-black text-forest">Estimate deposit finance</h3>
          <p className="mt-2 text-sm leading-6 text-ink/60">Mock quote for the VodaPay wallet flow. Final terms would come from the finance partner.</p>
        </div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/15 text-gold"><Calculator className="h-5 w-5" /></span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-ink/55">
          Finance amount
          <select value={depositPercent} onChange={(event) => setDepositPercent(Number(event.target.value))} className="rounded-2xl border border-forest/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-gold focus:ring-4 focus:ring-gold/15">
            <option value={50}>50% of deposit</option>
            <option value={75}>75% of deposit</option>
            <option value={100}>100% of deposit</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-xs font-black uppercase tracking-wide text-ink/55">
          Repayment term
          <select value={months} onChange={(event) => setMonths(Number(event.target.value))} className="rounded-2xl border border-forest/10 bg-white px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-gold focus:ring-4 focus:ring-gold/15">
            <option value={3}>3 months</option>
            <option value={6}>6 months</option>
            <option value={12}>12 months</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid gap-2">
        <FinanceRow label="Deposit financed" value={money(values.financedDeposit)} />
        <FinanceRow label="Estimated monthly repayment" value={money(values.instalment)} />
        <FinanceRow label="Funds to VodaPay wallet" value={money(values.walletFunding)} />
        <FinanceRow label="Tenant pays outside finance" value={money(values.tenantPaysNow)} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#181818] p-4 text-white">
        <div>
          <p className="force-muted-white text-xs font-black uppercase tracking-wide text-white/55">Mock wallet outcome</p>
          <p className="force-white mt-1 font-black text-white">Funds are credited to VodaPay after approval.</p>
        </div>
        <Pill tone="gold"><WalletCards className="h-3.5 w-3.5" /> VodaPay wallet</Pill>
      </div>
    </Card>
  );
}

function FinanceRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-linen px-4 py-3 text-sm">
      <span className="font-bold text-ink/65">{label}</span>
      <span className="font-black text-forest">{value}</span>
    </div>
  );
}
