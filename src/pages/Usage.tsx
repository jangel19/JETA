import { useState } from "react";
import { api } from "../lib/api";

type UsageOut = { user_email: string; plan: string; used_this_month: number; quota: number | null };

export default function Usage() {
  const [email, setEmail] = useState("you+flip@test.com");
  const [data, setData] = useState<UsageOut | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsage = async () => {
    setLoading(true); setErr(null); setData(null);
    try {
      const res = await api.get<UsageOut>("/usage", { params: { user_email: email } });
      setData(res.data);
    } catch (e: any) {
      setErr(e.response?.data?.detail || "Failed to fetch usage.");
    } finally {
      setLoading(false);
    }
  };

  const pct = data?.quota ? Math.min(100, Math.round((data.used_this_month / data.quota) * 100)) : 0;

  return (
    <div className="mx-auto max-w-screen-sm px-4 md:px-8 py-10 md:py-14">
      <div className="card p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Monthly Usage</h2>
        <div className="mt-4">
          <label className="text-sm text-subtle">Email</label>
          <input className="input w-full mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <button onClick={fetchUsage} disabled={loading} className="btn btn-primary">{loading ? "Loading…" : "Check usage"}</button>
        </div>

        {err && <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">{err}</div>}

        {data && (
          <div className="mt-6">
            <div className="text-subtle text-sm">Plan: <b className="text-ink">{data.plan}</b></div>
            <div className="mt-2 h-3 w-full rounded-full bg-muted overflow-hidden border border-border">
              <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
            </div>
            <div className="text-sm text-subtle mt-2">
              Used <b>{data.used_this_month}</b>{data.quota ? <> / {data.quota}</> : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}