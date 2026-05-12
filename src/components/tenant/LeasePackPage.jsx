import React, { useMemo, useState } from "react";
import { CheckCircle2, Download, Eye, FileText, ReceiptText, ShieldCheck, Wallet, WalletCards } from "lucide-react";
import { apiBaseUrl } from "../../app/config/env";
import { api } from "../../lib/api/client";
import { money } from "../../lib/formatters";
import { BackButton, Button, Card, PageHero, Pill, StatCard, Surface, PageFallback } from "../common/Primitives";
import { SCREEN_DASHBOARD } from "../../app/constants/screens";
import { FinanceCalculator } from "../finance/FinanceCalculator";

const iconWrap = (ready) => ({
  backgroundColor: ready ? "#12382d" : "rgba(197,155,61,0.16)",
  color: ready ? "#ffffff" : "#8a641d"
});

const downloadTextFile = (filename, content) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export function LeasePackPage({ booking, setScreen }) {
  const [notice, setNotice] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(booking);
  const [walletBusy, setWalletBusy] = useState(false);

  if (!booking) {
    return (
      <PageFallback
        title="No lease documents yet"
        text="Your lease documents will appear here after you choose a property, apply and receive landlord approval."
        action={<Button onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to dashboard</Button>}
      />
    );
  }

  const activeBooking = currentBooking || booking;
  const generated = activeBooking.leaseContractStatus === "generated" && activeBooking.leasePdfUrl;
  const pdfUrl = generated ? `${apiBaseUrl}${activeBooking.leasePdfUrl}` : null;
  const listingTitle = activeBooking.listing?.title || "Selected property";
  const location = [activeBooking.listing?.suburb, activeBooking.listing?.city].filter(Boolean).join(", ");
  const canMockWallet = activeBooking.approvalStatus === "approved" && activeBooking.paymentStatus !== "paid";
  const quote = activeBooking.listing ? {
    depositAmount: activeBooking.depositAmount || activeBooking.listing.priceAmount || 0,
    moveInCost: (activeBooking.listing.priceAmount || 0) + (activeBooking.depositAmount || 0) + 950
  } : null;

  const fundWallet = async () => {
    setWalletBusy(true);
    setNotice(null);
    try {
      const result = await api(`/bookings/${activeBooking.id}/vodapay-wallet/mock-fund`, { method: "POST" });
      setCurrentBooking({ ...result.booking, listing: activeBooking.listing });
      setNotice(result.message);
    } catch (error) {
      setNotice(error.message || "Could not fund the mock VodaPay wallet.");
    } finally {
      setWalletBusy(false);
    }
  };

  const receiptText = useMemo(() => [
    "Listing.properties deposit protection receipt",
    `Booking: ${activeBooking.id}`,
    `Property: ${listingTitle}`,
    `Deposit: ${money(activeBooking.depositAmount || 0)}`,
    `Status: ${activeBooking.custodyStatus === "reconciled" ? "Protected" : "Waiting for confirmation"}`,
    `Reference: ${activeBooking.custodyReference || "Pending"}`,
    `Payment: ${activeBooking.paymentStatus === "paid" ? `Paid via ${activeBooking.telcoChannel || activeBooking.paymentMethod || "VodaPay"}` : "Not confirmed yet"}`
  ].join("\n"), [activeBooking, listingTitle]);

  const documents = [
    {
      id: "lease",
      icon: FileText,
      title: "Digital lease agreement",
      ready: generated,
      note: generated ? "Your lease PDF is ready to view." : "Available after landlord approval and payment confirmation.",
      actionLabel: generated ? "View lease PDF" : "Waiting for lease",
      onAction: () => {
        if (!generated) return;
        window.open(pdfUrl, "_blank", "noopener,noreferrer");
        setNotice("Your lease PDF opened in a new tab.");
      }
    },
    {
      id: "deposit",
      icon: ReceiptText,
      title: "Deposit protection receipt",
      ready: activeBooking.custodyStatus === "reconciled",
      note: activeBooking.custodyReference || "Waiting for deposit protection confirmation.",
      actionLabel: activeBooking.custodyStatus === "reconciled" ? "Download receipt" : "Waiting for receipt",
      onAction: () => {
        if (activeBooking.custodyStatus !== "reconciled") return;
        downloadTextFile(`deposit-receipt-${activeBooking.id.slice(0, 8)}.txt`, receiptText);
        setNotice("Deposit receipt downloaded.");
      }
    },
    {
      id: "payment",
      icon: Wallet,
      title: "Payment confirmation",
      ready: activeBooking.paymentStatus === "paid",
      note: activeBooking.paymentStatus === "paid" ? `Paid via ${activeBooking.telcoChannel || activeBooking.paymentMethod || "VodaPay"}.` : "Payment has not been confirmed yet.",
      actionLabel: activeBooking.paymentStatus === "paid" ? "View payment details" : "Waiting for payment",
      onAction: () => setNotice(activeBooking.paymentStatus === "paid" ? `Payment confirmed. Amount received: ${money(activeBooking.amountDue || activeBooking.depositAmount || 0)}.` : "Payment has not been confirmed yet.")
    },
    {
      id: "trust",
      icon: ShieldCheck,
      title: "Trust and verification summary",
      ready: true,
      note: "Shows the checks completed for the tenant, landlord and listing.",
      actionLabel: "View checks",
      onAction: () => setNotice("Checks completed: tenant profile, landlord account, listing details and payment record are linked to this booking.")
    }
  ];

  return (
    <div className="grid gap-5">
      <BackButton onClick={() => setScreen(SCREEN_DASHBOARD)}>Back to tenant dashboard</BackButton>
      <PageHero eyebrow="Your lease documents" title="Everything you need before move-in, in one trusted place." text="Open your lease, check your deposit protection and confirm payment from one clear page.">
        <Pill tone={generated ? "green" : "gold"}>{generated ? "Lease ready" : "Waiting for approval"}</Pill>
      </PageHero>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard icon={Wallet} label="Deposit" value={money(activeBooking.depositAmount || 0)} />
        <StatCard icon={WalletCards} label="VodaPay wallet" value={activeBooking.wallet?.status ? "Funded" : canMockWallet ? "Ready" : "Pending"} />
        <StatCard icon={ShieldCheck} label="Deposit protection" value={activeBooking.custodyStatus === "reconciled" ? "Protected" : "Pending"} />
      </div>

      {quote ? (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.85fr]">
          <FinanceCalculator listing={activeBooking.listing} quote={quote} compact />
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gold/15 text-gold"><WalletCards className="h-5 w-5" /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">VodaPay wallet</p>
                <h3 className="mt-1 text-xl font-black text-forest">{activeBooking.paymentStatus === "paid" ? "Wallet payment complete" : "Fund wallet after approval"}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/60">Mock flow: approved finance credits the tenant VodaPay wallet, then the wallet pays the deposit and fees into custody.</p>
                <Button className="mt-4" disabled={!canMockWallet || walletBusy} onClick={fundWallet}>
                  <WalletCards className="mr-2 h-4 w-4" /> {walletBusy ? "Funding wallet..." : activeBooking.paymentStatus === "paid" ? "Wallet funded" : "Mock fund VodaPay wallet"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      <Card className="grid gap-5 p-5 md:p-6 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Pill tone="gold">Booking {activeBooking.id.slice(0, 8)}</Pill>
            <Pill tone="green">Verified listing</Pill>
          </div>
          <h2 className="mt-3 text-2xl font-black text-forest">{listingTitle}</h2>
          {location ? <p className="mt-1 text-sm text-ink/60">{location}</p> : null}

          <div className="mt-5 grid gap-3">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <Surface key={document.id} className="p-4">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex items-start gap-3">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={iconWrap(document.ready)}>
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-black text-forest">{document.title}</p>
                        <p className="mt-1 text-sm leading-6 text-ink/60">{document.note}</p>
                      </div>
                    </div>
                    <Button
                      variant={document.ready ? "primary" : "secondary"}
                      onClick={document.onAction}
                      disabled={!document.ready && document.id !== "payment"}
                      className="w-full md:w-auto"
                    >
                      {document.ready ? <Eye className="mr-2 h-4 w-4" /> : null}
                      {document.actionLabel}
                    </Button>
                  </div>
                </Surface>
              );
            })}
          </div>
        </div>

        <aside className="force-white rounded-[1.5rem] bg-[#181818] p-5 text-white">
          <p className="force-muted-white text-sm font-bold text-white/60">Lease PDF</p>
          <h3 className="force-white mt-2 text-2xl font-black text-white">{generated ? "Ready to view" : "Not ready yet"}</h3>
          <p className="force-muted-white mt-3 text-sm leading-6 text-white/70">
            {generated
              ? "Open your generated lease PDF. Keep a copy for your records before move-in."
              : "The PDF becomes available after landlord approval, lease generation and payment confirmation."}
          </p>
          {generated ? (
            <Button variant="gold" className="mt-5 w-full" onClick={() => { window.open(pdfUrl, "_blank", "noopener,noreferrer"); setNotice("Your lease PDF opened in a new tab."); }}>
              <Download className="mr-2 h-4 w-4" /> View lease PDF
            </Button>
          ) : (
            <Button className="mt-5 w-full" disabled>Waiting for lease generation</Button>
          )}
          {notice ? (
            <div className="force-white mt-4 rounded-2xl bg-white/10 p-3 text-sm font-bold text-white">
              <CheckCircle2 className="mr-2 inline h-4 w-4 text-gold" /> {notice}
            </div>
          ) : null}
        </aside>
      </Card>
    </div>
  );
}
