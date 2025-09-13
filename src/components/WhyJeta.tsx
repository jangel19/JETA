// src/components/WhyJeta.tsx
import { Link } from "react-router-dom";
import { fmt } from "@/lib/api";

export default function WhyJeta() {
  // Tiny illustrative “what this is worth” panel (feel free to wire live data later)
  const example = {
    dealsReviewedPerWeek: 8,
    minutesPerDealManual: 25,
    minutesPerDealJeta: 3,
    avgProfitPerWin: 28000,
    winRate: 0.12, // 12% of analyzed deals become wins
  };

  const hoursSavedMonthly = Math.round(
    ((example.minutesPerDealManual - example.minutesPerDealJeta) *
      example.dealsReviewedPerWeek *
      4) / 60
  );
  const expectedProfitMonthly = Math.round(
    example.dealsReviewedPerWeek * 4 * example.winRate * example.avgProfitPerWin
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Turn chaos into clarity — and clarity into profit.
        </h2>
        <p className="mt-4 text-lg text-subtle">
          JETA AI gives small developers and investors a repeatable way to go from
          address → numbers → decision in seconds. No spreadsheets. No guesswork.
        </p>
      </div>

      {/* Value grid */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <ValueCard
          title="Underwrite at scale"
          points={[
            "Paste comps → get ARV instantly",
            "Auto-calculate holding, selling & rehab costs",
            "BUY / MAYBE / PASS with plain-English reasoning",
          ]}
        />
        <ValueCard
          title="Protect your downside"
          points={[
            "Conservative defaults you control",
            "Target ROI & max-offer guidance",
            "PDF summaries for partner/lender review",
          ]}
        />
        <ValueCard
          title="Get to yes faster"
          points={[
            "Compare flip vs rental in one view",
            "Save scenarios to revisit or share",
            "No training required — just type and go",
          ]}
        />
      </div>

      {/* Simple ROI panel */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          <Stat label="Hours saved / month" value={`${hoursSavedMonthly}h`} />
          <Stat label="Expected profit / month" value={fmt(expectedProfitMonthly)} />
          <Stat label="Time-to-answer" value="~15–30 sec / deal" />
        </div>
        <p className="mt-4 text-sm text-subtle">
          Assumptions shown for illustration — adjust settings in the app to match your market and risk tolerance.
        </p>
      </div>

      {/* Credibility + social proof */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Why experienced investors switch</h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-subtle">
            <li>• Stops “analysis paralysis” — you’ll screen more deals, faster.</li>
            <li>• Forces discipline — decisions use your rules, not emotions.</li>
            <li>• Looks professional — shareable reports earn lender confidence.</li>
            <li>• Works anywhere — you control comps, costs, and thresholds.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">Real outcomes users report</h3>
          <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-subtle">
            <li>• 5–10× more deals screened per week.</li>
            <li>• Fewer bad buys thanks to consistent downside checks.</li>
            <li>• Faster offers beat slower bidders in hot sub-markets.</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <Link to="/analyze" className="btn btn-primary h-12 px-6 text-base">
          Analyze your next property
        </Link>
        <div className="text-sm text-subtle">
          Try free: 3 reports / month — no credit card required.
        </div>
      </div>
    </section>
  );
}

function ValueCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="card p-6">
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-subtle">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wide text-subtle">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}