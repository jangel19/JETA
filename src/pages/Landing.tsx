import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ZillowCarousel from "@/components/ZillowCarousel";
import NearbyHomes from "@/components/NearbyHomes";
import { featuredHomes } from "@/data/featuredHomes";


export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-background to-muted">
      {/* Hero */}
      <section className="mx-auto max-w-screen-xl px-4 md:px-8 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Underwrite deals <span className="text-primary">in seconds</span>.
          </h1>
          <p className="mt-4 text-lg text-subtle">
            JETA AI helps small developers and investors decide: BUY, MAYBE, or PASS — with crystal-clear math.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/signup" className="btn btn-primary">Start Free Trial</Link>
            <Link to="/pricing" className="btn btn-ghost">View Pricing</Link>
          </div>
        </motion.div>
      </section>
      

      {/* Sales section moved into HomeIntroScene on home page */}
      

      {/* Listings at bottom */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground">Explore listings</h2>
          <p className="text-subtle text-sm">Tap a card to view on Zillow</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <ZillowCarousel items={featuredHomes} />
          <NearbyHomes />
        </div>
      </section>
    </div>
  );
}
