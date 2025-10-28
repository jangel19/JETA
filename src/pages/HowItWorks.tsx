// src/pages/HowItWorks.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-subtle shadow-sm">
      {children}
    </span>
  );
}

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm hover:shadow-glow transition">
      <div className="text-xs uppercase tracking-wide text-subtle">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {sub && <div className="mt-1 text-xs text-subtle">{sub}</div>}
    </div>
  );
}

function Card({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-xl border border-border bg-card shadow-sm"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-2 text-[15px] leading-relaxed text-subtle">{children}</div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted text-foreground">
      {/* HERO */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5">
            Learn the Pipeline
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">How JETA Works</h1>
          <p className="mt-4 text-lg text-subtle">
            JETA is a trained algorithm for real estate investors. It turns your basic inputs into a transparent,
            investor-grade verdict: <span className="font-medium">BUY, MAYBE, or PASS</span> with supporting metrics you can trust.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
            <Pill>ARV Engine</Pill>
            <Pill>Rehab Estimator</Pill>
            <Pill>Flip ROI</Pill>
            <Pill>Rental Cash Flow</Pill>
            <Pill>Explainable Outputs</Pill>
          </div>
          <div className="mt-8">
            <Link
              to="/analyze"
              className="h-12 inline-flex items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-95 hover:shadow-glow hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Run your first 3 deals free
            </Link>
          </div>
        </motion.div>
      </section>

      {/* KPIs */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Kpi label="Time to decision" value="15–30 sec" sub="Typical for a complete first pass" />
          <Kpi label="Deals screened / wk" value="5–10×" sub="Versus spreadsheet-only workflow" />
          <Kpi label="Rehab ranges" value="$20–$110 / sqft" sub="Scope-based, editable by you" />
          <Kpi label="ARV discipline" value="Median-focused" sub="Cuts outliers & optimism bias" />
        </div>
      </section>

      {/* PIPELINE */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          <Card title="1) Property Inputs">
            Provide address, price, size, beds/baths, and strategy (flip or rental). Built for speed.
          </Card>
          <Card title="2) Comparable Analysis" delay={0.05}>
            JETA analyzes your comps and centers on a disciplined ARV to avoid cherry-picking and false precision.
          </Card>
          <Card title="3) Assumptions" delay={0.1}>
            Choose conservative defaults or set your own for rehab scope, holding, selling, taxes, insurance, rent, and financing.
          </Card>
          <Card title="4) Verdict & Metrics" delay={0.15}>
            Get a clear decision plus ARV, rehab, profit/ROI, or rental cash flow, NOI, and cash-on-cash indicators.
          </Card>
        </div>
      </section>

      {/* METHODS (high-level) */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 pb-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="ARV: Robust Valuation">
            JETA’s valuation is designed to reduce outliers and over-optimism by focusing on a stable center of your comparable set.
            You get a credible number fast, and you can override it any time.
          </Card>
          <Card title="Rehab: Scope × Size">
            Renovation costs are derived from trained ranges for light, medium, and heavy scopes that scale with square footage.
            Edit the ranges to match contractor quotes in your market.
          </Card>
          <Card title="Flip: Profit & ROI">
            JETA weighs purchase, rehab, holding, and selling to produce a conservative profit estimate and ROI%.
            You’ll understand your floor, ceiling, and breakeven before you write an offer.
          </Card>
          <Card title="Rental: Cash Flow & NOI">
            For buy-and-hold, JETA projects monthly cash flow and NOI, with optional cash-on-cash based on your financing inputs.
            It’s built to screen dozens of addresses per hour without spreadsheets.
          </Card>
        </div>
      </section>

      {/* TRUST & BENEFITS */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <Card title="Speed, without sloppiness">
            Screen significantly more deals weekly while keeping the math conservative and repeatable.
          </Card>
          <Card title="Consistency beats emotion">
            Every deal runs through the same discipline: inputs + assumptions + model + verdict. Less bias, fewer bad buys.
          </Card>
          <Card title="Share-ready outputs">
            Results are clean and lender-friendly. Save analyses, share summaries, and align your team quickly.
          </Card>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-subtle shadow-sm">
          <span className="font-medium text-foreground">Transparency:</span> JETA is a decision-support tool,
          not appraisal, legal, or tax advice. Validate assumptions with local professionals.
        </div>
      </section>

      {/* LIGHT SOCIAL PROOF */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Kpi label="User satisfaction" value="92%" sub="Early users rating clarity & speed" />
          <Kpi label="Avg inputs per deal" value="< 60 sec" sub="Typical time to first verdict" />
          <Kpi label="Iteration rate" value="2–3×" sub="Investors tweak assumptions per deal" />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 pb-20">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">The bottom line</h3>
          <p className="mt-3 text-lg text-subtle max-w-2xl mx-auto">
            JETA is your deal-flow engine — built to save time, protect downside, and sharpen every offer.
          </p>
          <Link
            to="/analyze"
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-90 hover:shadow-glow transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Try JETA - 3 free reports
          </Link>
        </div>
      </section>
    </div>
  );
}


