// src/components/ResultCard.tsx
import { AnalyzeOut } from "@/lib/types";
import Stat from "@/components/Stat";
import { fmt } from "@/lib/api";

function DecisionBadge({ d }: { d: AnalyzeOut["decision"] }) {
  const base =
    "inline-flex h-8 items-center gap-2 rounded-full px-3 text-sm font-semibold";
  const styles: Record<NonNullable<AnalyzeOut["decision"]>, string> = {
    BUY:   `${base} bg-emerald-600/15 text-emerald-600 dark:text-emerald-400`,
    MAYBE: `${base} bg-amber-600/15 text-amber-600 dark:text-amber-400`,
    PASS:  `${base} bg-rose-600/15 text-rose-600 dark:text-rose-400`,
  };
  return (
    <span className={styles[d]} aria-label={`Recommendation: ${d}`}>
      {d}
    </span>
  );
}

export default function ResultCard({ data }: { data: AnalyzeOut }) {
  const { decision, explanation, arv, rehab_cost, flip, rental, usage } = data;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <DecisionBadge d={decision} />
            <h3 className="truncate text-2xl md:text-3xl font-semibold">
              Recommendation
            </h3>
          </div>
          <p className="text-subtle mt-2">{explanation}</p>
        </div>

        <div className="shrink-0 text-right text-sm text-subtle">
          {usage.quota ? (
            <>Usage: <b>{usage.used_this_month}</b> / {usage.quota}</>
          ) : (
            <>Usage: <b>{usage.used_this_month}</b></>
          )}
        </div>
      </div>

      {/* Top stats */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Stat label="ARV" value={fmt(arv)} />
        <Stat
          label="Rehab Cost"
          value={rehab_cost != null ? fmt(rehab_cost) : "—"}
        />
      </div>

      {/* Flip block */}
      {flip && (
        <>
          <h4 className="mt-8 mb-3 text-lg font-semibold">Flip Metrics</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <Stat label="Holding Costs" value={fmt(flip.holding_costs)} />
            <Stat label="Selling Costs" value={fmt(flip.selling_costs)} />
            <Stat label="Total Cost" value={fmt(flip.total_cost)} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Stat label="Profit" value={fmt(flip.profit)} />
            <Stat
              label="ROI %"
              value={
                Number.isFinite(flip.roi_pct)
                  ? `${flip.roi_pct.toFixed(1)}%`
                  : "—"
              }
            />
          </div>
        </>
      )}

      {/* Rental block */}
      {rental && (
        <>
          <h4 className="mt-8 mb-3 text-lg font-semibold">Rental Metrics</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <Stat label="Expenses / mo" value={fmt(rental.expenses_month)} />
            <Stat label="Cash Flow / mo" value={fmt(rental.cash_flow_month)} />
            <Stat label="NOI / year" value={fmt(rental.noi_year)} />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Stat
              label="Cash Flow / year"
              value={
                rental.cash_flow_year != null ? fmt(rental.cash_flow_year) : "—"
              }
            />
            <Stat
              label="Cash-on-Cash"
              value={
                Number.isFinite(rental.cash_on_cash_pct)
                  ? `${rental.cash_on_cash_pct!.toFixed(1)}%`
                  : "—"
              }
            />
            <Stat
              label="Mortgage / mo"
              value={
                rental.mortgage_month != null ? fmt(rental.mortgage_month) : "—"
              }
            />
          </div>
        </>
      )}
    </div>
  );
}