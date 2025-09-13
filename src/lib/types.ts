export type Decision = "BUY" | "MAYBE" | "PASS";

export type AnalyzeFlipIn = {
  user_email: string;
  address: string;
  strategy: "flip";
  purchase_price: number;
  sqft: number;
  rehab_level: "light" | "medium" | "heavy";
  holding_pct?: number;
  selling_pct?: number;
  comp_arvs?: number[];
};

export type AnalyzeRentalIn = {
  user_email: string;
  address: string;
  strategy: "rental";
  purchase_price: number;
  rent_month: number;
  taxes_year?: number;
  insurance_year?: number;
  mortgage_month?: number;
  down_payment_pct?: number;
  interest_rate_pct?: number;
  term_years?: number;
  closing_costs_pct?: number;
  rehab_cash_in?: number;
};

export type AnalyzeOut = {
  decision: Decision;
  explanation: string;
  arv: number;
  rehab_cost?: number | null;
  flip?: {
    holding_costs: number;
    selling_costs: number;
    total_cost: number;
    profit: number;
    roi_pct: number;
  } | null;
  rental?: {
    expenses_month: number;
    cash_flow_month: number;
    noi_year: number;
    cash_flow_year?: number;
    cash_on_cash_pct?: number;
    mortgage_month?: number;
  } | null;
  usage: { used_this_month: number; quota: number | null };
};