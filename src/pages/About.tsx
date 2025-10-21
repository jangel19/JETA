import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're committed to empowering teams with cutting-edge technology",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make starts with understanding your needs",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries to deliver breakthrough solutions",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Maintaining the highest standards in everything we build",
  },
];

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-muted text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero -z-10" />
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5 animate-fade-in">
            About JETA
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-fade-in bg-gradient-primary bg-clip-text text-transparent">
            Building the Future of Work
          </h1>
          <p className="text-xl text-subtle max-w-3xl mx-auto animate-fade-in">
            We make powerful technology accessible to every team with speed, security, and delightful UX.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto">
            {[
              { k: "10k+", v: "Teams served" },
              { k: "99.9%", v: "Uptime" },
              { k: "SOC2", v: "Security" },
              { k: "Global", v: "Coverage" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm text-center"
              >
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">{s.k}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="rounded-2xl border border-border bg-gradient-to-br from-background to-card p-6 md:p-8 shadow-sm">
              <div className="prose prose-lg max-w-none text-subtle space-y-6">
                <p>
                  Founded in 2020, JETA emerged from a simple observation: teams were struggling with
                  fragmented tools, security concerns, and slow performance. We knew there had to be a better way.
                </p>
                <p>
                  Our founders, a team of engineers and designers from leading tech companies, came together
                  to build a platform that combines AI-powered intelligence, enterprise-grade security, and
                  lightning-fast performance in one seamless experience.
                </p>
                <p>
                  Today, we're proud to serve over 10,000 teams worldwide, helping them work smarter,
                  faster, and more securely. But we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn How It Works teaser */}
      <section className="py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Learn How JETA Works</h2>
          <p className="mt-3 text-lg text-subtle max-w-2xl mx-auto">
            Explore our pipeline, assumptions, and decision model. See why investors trust JETA for fast, disciplined screening.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              to="/how-it-works"
              className="h-11 inline-flex items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-95 hover:shadow-glow hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See How It Works
            </Link>
            <Link
              to="/analyze"
              className="h-11 inline-flex items-center rounded-xl px-6 border border-border bg-background hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Analyze a Deal
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center animate-fade-in border border-border bg-gradient-to-br from-background to-card hover:shadow-glow transition"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-primary/10">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-subtle">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — integrated */}
      <HowItWorksSections />

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-background to-card p-8 md:p-12 text-center shadow-sm">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Ready to see JETA in action?</h3>
            <p className="text-lg text-subtle mt-2 max-w-2xl mx-auto">Analyze your next property with AI-powered insights in seconds.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <a
                href="/analyze"
                className="h-11 inline-flex items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-95 hover:shadow-glow hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get Started Free
              </a>
              <a
                href="/"
                className="h-11 inline-flex items-center rounded-xl px-6 border border-border bg-background hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

// Local interactive sections adapted from HowItWorks page
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-subtle">
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

function HowCard({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
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

function HowItWorksSections() {
  return (
    <div className="bg-transparent">
      {/* HERO-like intro for the section */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-block px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-3">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How JETA Works</h2>
          <p className="mt-3 text-lg text-subtle">
            JETA is a trained algorithm for real estate investors. It turns your basic inputs into a transparent,
            investor-grade verdict: <span className="font-medium">BUY, MAYBE, or PASS</span> with supporting metrics you can trust.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
            <Pill>ARV Engine</Pill>
            <Pill>Rehab Estimator</Pill>
            <Pill>Flip ROI</Pill>
            <Pill>Rental Cash Flow</Pill>
            <Pill>Explainable Outputs</Pill>
          </div>
          <div className="mt-7">
            <Link to="/analyze" className="h-12 inline-flex items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-95 hover:shadow-glow hover:-translate-y-0.5 transition-all">
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
          <HowCard title="1) Property Inputs">
            Provide address, price, size, beds/baths, and strategy (flip or rental). Built for speed.
          </HowCard>
          <HowCard title="2) Comparable Analysis" delay={0.05}>
            JETA analyzes your comps and centers on a disciplined ARV to avoid cherry-picking and false precision.
          </HowCard>
          <HowCard title="3) Assumptions" delay={0.1}>
            Choose conservative defaults or set your own for rehab scope, holding, selling, taxes, insurance, rent, and financing.
          </HowCard>
          <HowCard title="4) Verdict & Metrics" delay={0.15}>
            Get a clear decision plus ARV, rehab, profit/ROI, or rental cash flow, NOI, and cash-on-cash indicators.
          </HowCard>
        </div>
      </section>

      {/* METHODS */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 pb-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <HowCard title="ARV: Robust Valuation">
            JETA’s valuation is designed to reduce outliers and over-optimism by focusing on a stable center of your comparable set.
            You get a credible number fast, and you can override it any time.
          </HowCard>
          <HowCard title="Rehab: Scope × Size">
            Renovation costs are derived from trained ranges for light, medium, and heavy scopes that scale with square footage.
            Edit the ranges to match contractor quotes in your market.
          </HowCard>
          <HowCard title="Flip: Profit & ROI">
            JETA weighs purchase, rehab, holding, and selling to produce a conservative profit estimate and ROI%.
            You’ll understand your floor, ceiling, and breakeven before you write an offer.
          </HowCard>
          <HowCard title="Rental: Cash Flow & NOI">
            For buy-and-hold, JETA projects monthly cash flow and NOI, with optional cash-on-cash based on your financing inputs.
            It’s built to screen dozens of addresses per hour without spreadsheets.
          </HowCard>
        </div>
      </section>

      {/* TRUST & BENEFITS */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <HowCard title="Speed, without sloppiness">
            Screen significantly more deals weekly while keeping the math conservative and repeatable.
          </HowCard>
          <HowCard title="Consistency beats emotion">
            Every deal runs through the same discipline: inputs + assumptions + model + verdict. Less bias, fewer bad buys.
          </HowCard>
          <HowCard title="Share-ready outputs">
            Results are clean and lender-friendly. Save analyses, share summaries, and align your team quickly.
          </HowCard>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm text-subtle shadow-sm">
          <span className="font-medium text-foreground">Transparency:</span> JETA is a decision-support tool, not appraisal, legal, or tax advice. Validate assumptions with local professionals.
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

      {/* CTA from How It Works */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 pb-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">The bottom line</h3>
          <p className="mt-3 text-lg text-subtle max-w-2xl mx-auto">
            JETA is your deal-flow engine — built to save time, protect downside, and sharpen every offer.
          </p>
          <Link to="/analyze" className="mt-6 inline-block px-6 py-3 rounded-xl bg-primary text-white shadow hover:opacity-90 hover:shadow-glow transition">
            Try JETA — 3 free reports
          </Link>
        </div>
      </section>
    </div>
  );
}
