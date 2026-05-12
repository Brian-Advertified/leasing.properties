import React, { useEffect, useState } from "react";
import { Building2, ShieldCheck, UserRound, X } from "lucide-react";
import { api } from "../../lib/api/client";
import { Button, Card, Field, inputClass } from "../common/Primitives";

const accountTypes = [
  {
    role: "tenant",
    label: "I want to rent",
    helper: "Find a place, apply, sign and manage your lease.",
    icon: UserRound,
    demo: { phoneNumber: "+27821234567", displayName: "Amina Dlamini", city: "Johannesburg" }
  },
  {
    role: "landlord",
    label: "I am a landlord",
    helper: "List owned properties and manage lease approvals.",
    icon: Building2,
    demo: { phoneNumber: "+27110888000", displayName: "AFHCO Property Management", city: "Johannesburg" }
  },
  {
    role: "agent",
    label: "I am an agent",
    helper: "List and manage properties for landlords or agencies.",
    icon: Building2,
    demo: { phoneNumber: "+27825550111", displayName: "Sarah Mokoena", city: "Johannesburg" }
  },
  {
    role: "admin",
    label: "I manage support",
    helper: "Help with checks, payments and customer support.",
    icon: ShieldCheck,
    demo: { phoneNumber: "+27119990000", displayName: "Support Team", city: "Johannesburg" }
  }
];

export function AuthModal({ mode, setMode, completeAuth }) {
  const defaultForm = { phoneNumber: "+27821234567", displayName: "Amina Dlamini", city: "Johannesburg", otp: "123456", role: "tenant" };
  const [step, setStep] = useState("details");
  const [form, setForm] = useState(defaultForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mode) return;
    setStep("details");
    setForm(defaultForm);
    setMessage("");
    setError("");
  }, [mode]);

  const chooseRole = (role) => {
    const selected = accountTypes.find((item) => item.role === role);
    setForm({ ...form, ...selected.demo, role });
    setMessage("");
    setError("");
  };

  const requestOtp = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const result = await api("/auth/otp/request", { method: "POST", body: JSON.stringify({ phoneNumber: form.phoneNumber }) });
      setMessage(result.message);
      setStep("otp");
    } catch (err) { setError(err.message); }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const result = await api("/auth/otp/verify", { method: "POST", body: JSON.stringify(form) });
      completeAuth(result);
    } catch (err) { setError(err.message); }
  };

  if (!mode) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 px-4 backdrop-blur-sm">
      <Card className="w-full max-w-lg p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-forest">{mode === "register" ? "Create your profile" : "Sign in with phone"}</h2>
            <p className="mt-1 text-sm text-ink/60">Choose the profile that matches what you need to do. Each profile only sees the right tools.</p>
          </div>
          <button onClick={() => { setStep("details"); setMode(null); }} className="rounded-full p-2 hover:bg-forest/5"><X className="h-5 w-5" /></button>
        </div>

        {step === "details" ? (
          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            {accountTypes.map(({ role, label, helper, icon: Icon }) => {
              const active = form.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => chooseRole(role)}
                  style={active ? { backgroundColor: "#12382d", borderColor: "#12382d", color: "#ffffff" } : { backgroundColor: "#ffffff", borderColor: "rgba(18,56,45,0.12)", color: "#13231c" }}
                  className={`rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm`}
                >
                  <Icon className="mb-2 h-5 w-5" />
                  <span className="block text-sm font-black">{label}</span>
                  <span style={{ color: active ? "rgba(255,255,255,0.76)" : "rgba(19,35,28,0.58)" }} className="mt-1 block text-xs leading-5">{helper}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        <form onSubmit={step === "details" ? requestOtp : verifyOtp} className="grid gap-3">
          <Field label="Phone number"><input className={inputClass} value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} /></Field>
          {mode === "register" && step === "details" ? <>
            <Field label="Display name"><input className={inputClass} value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} /></Field>
            <Field label="City"><input className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          </> : null}
          {step === "otp" ? <Field label="Demo OTP"><input className={inputClass} value={form.otp} onChange={(e) => setForm({ ...form, otp: e.target.value })} /></Field> : null}
          {message ? <p className="rounded-2xl bg-forest/5 p-3 text-sm text-forest">{message}</p> : null}
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
          <Button type="submit">{step === "details" ? "Send OTP" : "Verify and continue"}</Button>
        </form>
      </Card>
    </div>
  );
}
