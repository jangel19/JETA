import { ReactNode } from "react";

export default function Stat({
  label,
  value,
  help,
}: { label: string; value: ReactNode; help?: string }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="text-xs uppercase tracking-wide text-subtle">{label}</div>
      <div className="mt-1 text-xl md:text-2xl font-semibold tabular-nums">
        {value}
      </div>
      {help && <div className="mt-1 text-xs text-subtle">{help}</div>}
    </div>
  );
}