import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { api } from "../lib/api";
import type { AnalyzeOut } from "../lib/types";
import ResultCard from "../components/ResultCard";

const flipSchema = z.object({
  user_email: z.string().email(),
  address: z.string().min(3),
  strategy: z.literal("flip"),
  purchase_price: z.number().positive(),
  sqft: z.number().positive(),
  rehab_level: z.enum(["light", "medium", "heavy"]).default("medium"),
  holding_pct: z.number().min(0).default(0.04),
  selling_pct: z.number().min(0).default(0.06),
  comp_arvs: z.array(z.number().positive()).optional(),
});

const rentalSchema = z.object({
  user_email: z.string().email(),
  address: z.string().min(3),
  strategy: z.literal("rental"),
  purchase_price: z.number().positive(),
  rent_month: z.number().positive(),
  taxes_year: z.number().min(0).default(0),
  insurance_year: z.number().min(0).default(0),
  mortgage_month: z.number().min(0).optional(),
  down_payment_pct: z.number().min(0).max(100).default(20),
  interest_rate_pct: z.number().min(0).max(30).default(6.75),
  term_years: z.number().min(1).max(40).default(30),
  closing_costs_pct: z.number().min(0).max(20).default(3),
  rehab_cash_in: z.number().min(0).default(0),
});

type FlipForm = z.infer<typeof flipSchema>;
type RentalForm = z.infer<typeof rentalSchema>;

export default function Analyze() {
  const [tab, setTab] = useState<"flip" | "rental">("flip");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeOut | null>(null);
  const [error, setError] = useState<string | null>(null);

  const flipForm = useForm<FlipForm>({
    resolver: zodResolver(flipSchema),
    defaultValues: {
      user_email: "you+flip@test.com",
      address: "123 Main St, Lynn, MA",
      strategy: "flip",
      purchase_price: 420000,
      sqft: 1600,
      rehab_level: "medium",
      holding_pct: 0.04,
      selling_pct: 0.06,
      comp_arvs: [560000, 575000, 545000],
    },
  });

  const rentalForm = useForm<RentalForm>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      user_email: "you+rent@test.com",
      address: "25 Test Ave, Lynn, MA",
      strategy: "rental",
      purchase_price: 450000,
      rent_month: 3200,
      taxes_year: 4800,
      insurance_year: 1800,
      down_payment_pct: 20,
      interest_rate_pct: 6.75,
      term_years: 30,
      closing_costs_pct: 3,
      rehab_cash_in: 10000,
    },
  });

  const onSubmit = async (data: FlipForm | RentalForm) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.post<AnalyzeOut>("/analyze", data);
      setResult(res.data);
    } catch (e: any) {
      if (e.response?.status === 402) {
        setError("You've reached your free limit (3/month). Try a different email or upgrade.");
      } else {
        setError(e.response?.data?.detail || "Something went wrong.");
      }
    } finally {
      setLoading(false);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <div className="relative mx-auto max-w-screen-xl px-4 md:px-8 py-10 md:py-14">
        <div className="flex items-center gap-2">
          <button
            className={`btn ${tab === "flip" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setTab("flip")}
          >
            Flip
          </button>
          <button
            className={`btn ${tab === "rental" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setTab("rental")}
          >
            Rental
          </button>
        </div>

        <div className="card bg-white/85 border border-black/10 backdrop-blur-xl dark:bg-slate-900/70 dark:border-white/10 p-6 md:p-8 mt-6">
          {tab === "flip" ? (
            <form onSubmit={flipForm.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
              <Field f={flipForm} name="user_email" label="Email" type="email" />
              <Field f={flipForm} name="address" label="Address" />
              <Field f={flipForm} name="purchase_price" label="Purchase Price" type="number" />
              <Field f={flipForm} name="sqft" label="Square Feet" type="number" />
              <Select f={flipForm} name="rehab_level" label="Rehab Level" options={["light", "medium", "heavy"]} />
              <Field f={flipForm} name="holding_pct" label="Holding % (0.04 = 4%)" type="number" step="0.01" />
              <Field f={flipForm} name="selling_pct" label="Selling % (0.06 = 6%)" type="number" step="0.01" />
              <ArrayCSV f={flipForm} name="comp_arvs" label="Comp ARVs (CSV)" />
              <div className="md:col-span-2 flex items-center gap-3 mt-2">
                <button disabled={loading} className="btn btn-primary">
                  {loading ? "Analyzing…" : "Analyze deal"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => flipForm.reset()}>
                  Reset
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={rentalForm.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
              <Field f={rentalForm} name="user_email" label="Email" type="email" />
              <Field f={rentalForm} name="address" label="Address" />
              <Field f={rentalForm} name="purchase_price" label="Purchase Price" type="number" />
              <Field f={rentalForm} name="rent_month" label="Monthly Rent" type="number" />
              <Field f={rentalForm} name="taxes_year" label="Property Taxes / year" type="number" />
              <Field f={rentalForm} name="insurance_year" label="Insurance / year" type="number" />
              <Field f={rentalForm} name="down_payment_pct" label="Down Payment %" type="number" step="0.1" />
              <Field f={rentalForm} name="interest_rate_pct" label="Interest Rate %" type="number" step="0.01" />
              <Field f={rentalForm} name="term_years" label="Term (years)" type="number" />
              <Field f={rentalForm} name="closing_costs_pct" label="Closing Costs %" type="number" step="0.1" />
              <Field f={rentalForm} name="rehab_cash_in" label="Rehab Cash-In" type="number" />
              <Field f={rentalForm} name="mortgage_month" label="Override: Mortgage / month (optional)" type="number" />
              <div className="md:col-span-2 flex items-center gap-3 mt-2">
                <button disabled={loading} className="btn btn-primary">
                  {loading ? "Analyzing…" : "Analyze deal"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => rentalForm.reset()}>
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-xl border border-red-200/60 bg-red-500/10 text-red-200 dark:text-red-300">
            {error}
          </div>
        )}
        {result && (
          <div className="mt-6">
            <ResultCard data={result} />
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ f, name, label, type = "text", step }: any) {
  const {
    register,
    formState: { errors },
  } = f;
  return (
    <div>
      <label className="text-sm text-slate-600 dark:text-slate-200">{label}</label>
      <input
        type={type}
        step={step}
        {...register(name, { valueAsNumber: ["number"].includes(type) })}
        className="input w-full mt-1 bg-white/80 text-slate-900 border-black/10 focus:ring-primary/30 dark:bg-slate-900/40 dark:text-white dark:border-white/10"
      />
      {errors[name] && <div className="text-sm text-red-500 dark:text-red-300 mt-1">{errors[name].message as string}</div>}
    </div>
  );
}

function Select({ f, name, label, options }: any) {
  const {
    register,
    formState: { errors },
  } = f;
  return (
    <div>
      <label className="text-sm text-slate-600 dark:text-slate-200">{label}</label>
      <select
        {...register(name)}
        className="input w-full mt-1 bg-white/80 text-slate-900 border-black/10 focus:ring-primary/30 dark:bg-slate-900/40 dark:text-white dark:border-white/10"
      >
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o[0].toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
      {errors[name] && <div className="text-sm text-red-500 dark:text-red-300 mt-1">{errors[name].message as string}</div>}
    </div>
  );
}

function ArrayCSV({ f, name, label }: any) {
  const { setValue, watch } = f;
  const raw = (watch(name) || []).join(", ");
  return (
    <div className="md:col-span-2">
      <label className="text-sm text-slate-600 dark:text-slate-200">{label}</label>
      <input
        className="input w-full mt-1 bg-white/80 text-slate-900 border-black/10 focus:ring-primary/30 dark:bg-slate-900/40 dark:text-white dark:border-white/10"
        defaultValue={raw}
        onChange={(e) => {
          const arr = e.target.value
            .split(",")
            .map((s) => Number(String(s).trim()))
            .filter((n) => !Number.isNaN(n));
          setValue(name, arr, { shouldValidate: true });
        }}
      />
      <div className="text-xs text-slate-500 dark:text-slate-300 mt-1">Example: 560000, 575000, 545000</div>
    </div>
  );
}
