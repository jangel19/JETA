import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  withCredentials: false,
  timeout: 20000
});

export function fmt(num?: number, currency = true) {
  if (num === undefined || num === null || Number.isNaN(num)) return "—";
  return currency
    ? num.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    : num.toLocaleString();
}