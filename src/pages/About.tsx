import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

      {/* How It Works moved to dedicated page; teaser button above */}

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-background to-card p-8 md:p-12 text-center shadow-sm">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Ready to see JETA in action?</h3>
            <p className="text-lg text-subtle mt-2 max-w-2xl mx-auto">Analyze your next property with AI-powered insights in seconds.</p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                to="/signup"
                className="h-11 inline-flex items-center rounded-xl bg-gradient-primary text-primary-foreground px-6 shadow hover:opacity-95 hover:shadow-glow hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="h-11 inline-flex items-center rounded-xl px-6 border border-border bg-background hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--ring))] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
