// src/components/OfferGuidance.tsx
import { useMemo } from "react";
import { fmt } from "@/lib/api";

export default function OfferGuidance() {
  // simple example calculation — mirror your backend thresholds
  const targetRoi = 0.12;
  const example = { arv: 560000, rehab: 64000, holding: 19360, selling: 33600 };

  const maxOffer = useMemo(() => {
    const targetProfit = example.arv * targetRoi;
    const spend = example.rehab + example.holding + example.selling + targetProfit;
    return example.arv - spend; // naive: ignores closing/soft costs you might add later
  }, []);

  return (
    <div className="card p-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Offer price guidance</h2>
        <div className="text-sm text-subtle">Target ROI: {Math.round(targetRoi * 100)}%</div>
      </div>
      <p className="mt-2 text-subtle">What’s the most you can pay and still hit your ROI target?</p>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Stat label="ARV" value={fmt(example.arv)} />
        <Stat label="Rehab" value={fmt(example.rehab)} />
        <Stat label="Holding + Selling" value={fmt(example.holding + example.selling)} />
        <Stat label="Max offer (≈)" value={fmt(maxOffer)} emphasize />
      </div>
    </div>
  );
}

function Stat({ label, value, emphasize = false }: { label: string; value: string; emphasize?: boolean }) {
  return (
    <div className={`rounded-xl border bg-white p-4 ${emphasize ? "ring-1 ring-primary/20" : ""}`}>
      <div className="text-xs uppercase tracking-wide text-subtle">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}