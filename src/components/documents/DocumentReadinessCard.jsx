import React from "react";
import { CheckCircle2, UploadCloud } from "lucide-react";
import { APPROVAL_DOCUMENTS } from "../../features/applications/approvalPack";
import { Card } from "../common/Primitives";

export function DocumentReadinessCard({ approvalPack, setDoc, missing = [] }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Documents</p><h3 className="mt-1 text-xl font-black text-forest">Get your application ready</h3><p className="mt-2 text-sm leading-6 text-ink/60">Upload only what is needed for a long-term rental application.</p></div><span className="text-sm font-black text-forest">{APPROVAL_DOCUMENTS.length - missing.length}/{APPROVAL_DOCUMENTS.length}</span></div>
      <div className="mt-4 grid gap-2">
        {APPROVAL_DOCUMENTS.map((document) => {
          const uploaded = Boolean(approvalPack[document.id]);
          return (
            <label key={document.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3 text-sm transition hover:border-gold ${uploaded ? "border-forest/20 bg-forest/5" : "border-forest/10 bg-linen"}`}>
              <span>
                <span className="font-bold text-forest">{document.label}</span>
                <span className="block text-xs text-ink/45">{approvalPack[document.id]?.name || "PDF, image or scan"}</span>
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-2 text-xs font-black ${uploaded ? "bg-forest text-white" : "bg-white text-forest ring-1 ring-line"}`}>
                {uploaded ? <CheckCircle2 className="mr-1.5 h-4 w-4" /> : <UploadCloud className="mr-1.5 h-4 w-4" />}
                {uploaded ? "Uploaded" : "Upload document"}
              </span>
              <input type="file" className="hidden" onChange={(e) => setDoc(document.id, e.target.files?.[0])} />
            </label>
          );
        })}
      </div>
    </Card>
  );
}
