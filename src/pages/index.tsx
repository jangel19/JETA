import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TypingText from "@/components/TypingText";
import Features from "@/components/Features";
import ZillowCarousel from "@/components/ZillowCarousel";
import NearbyHomes from "@/components/NearbyHomes";
import { featuredHomes } from "@/data/featuredHomes";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import DemoModal from "@/components/DemoModal";
import Newsletter from "@/components/Newsletter";
import HomeIntroScene from "@/components/HomeIntroScene";
import HeroLogoMark from "@/components/HeroLogoMark";

const Index = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Navbar />
      <DemoModal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm backdrop-blur bg-slate-900/5 text-slate-700 shadow-sm dark:bg-white/10 dark:text-white">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-primary font-medium">Trusted by 10,000+ teams worldwide</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Build the Future with{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  <TypingText words={["JETA", "AI", "Speed", "Security"]} />
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed max-w-xl text-slate-600 dark:text-slate-200">
                The all-in-one platform that combines powerful AI, lightning-fast performance,
                and enterprise-grade security to accelerate your team's success.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-6 group"
                >
                  <Link to="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 bg-white/70 text-slate-900 hover:bg-white/90 dark:bg-white/5 dark:text-white dark:border-white/20 dark:hover:bg-white/10"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4 text-slate-700 dark:text-white/80">
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm">Uptime</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm">Active Users</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-white/10" />
                <div>
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-sm">Rating</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative h-[420px]">
              <div className="absolute inset-0 rounded-3xl border border-slate-200/60 bg-white/70 shadow-[0_40px_120px_-45px_rgba(99,102,241,0.35)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-[0_40px_120px_-45px_rgba(99,102,241,0.6)]" />
              <HeroLogoMark />
            </div>
          </div>
        </div>

        {/* Removed background 3D overlay to avoid covering UI */}
      </section>

      {/* Small spacer before scroll scene */}
      <div className="h-10 md:h-16" />

      {/* Immersive scroll-driven intro scene */}
      <HomeIntroScene />

      {/* Smooth transition back */}
      <div className="h-24 bg-gradient-to-b from-slate-950/5 to-background dark:from-slate-950 dark:to-background" />

      {/* Features Section */}
      <Features />

      {/* Testimonials */}
      <Testimonials />

      {/* Zillow Listings Section */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Explore listings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Tap a card to view on Zillow</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <ZillowCarousel items={featuredHomes} />
          <NearbyHomes />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
