import { useState } from "react";

export default function NearbyHomes() {
  const [where, setWhere] = useState("");

  function openZillow() {
    const q = (where || "").trim();
    if (!q) return;
    const url =
      /^\d{5}$/.test(q)
        ? `https://www.zillow.com/homes/for_sale/${q}/`
        : `https://www.zillow.com/homes/for_sale/${encodeURIComponent(q)}/`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">Find homes near you</h3>
      <p className="mb-4 text-sm text-subtle">
        Enter a ZIP code or City, ST. We’ll open Zillow in a new tab.
      </p>
      <div className="flex gap-2">
        <input
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="e.g., 01902 or Lynn, MA"
          className="h-11 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none focus:ring-2 focus:ring-[color:rgb(var(--ring))]"
        />
        <button
          onClick={openZillow}
          className="h-11 rounded-xl bg-primary text-primary-foreground px-4 hover:opacity-90"
        >
          Browse on Zillow
        </button>
      </div>
      <div className="mt-2 text-xs text-subtle">
        * We don’t scrape Zillow — we only send you to their site.
      </div>
    </div>
  );
}
