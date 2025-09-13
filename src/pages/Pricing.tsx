export default function Pricing() {
  const plans = [
    { name: "Free", price: "$0", details: ["3 reports / month", "Flip & Rental"], cta: "Current plan" },
    { name: "Starter", price: "$29", details: ["15 reports / month", "Priority queue"], cta: "Coming soon" },
    { name: "Pro", price: "$79", details: ["Unlimited", "Priority support"], cta: "Coming soon" },
  ];
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8 py-10 md:py-14">
      <h2 className="text-3xl font-semibold">Pricing</h2>
      <p className="text-subtle mt-2">Start free. Upgrade when you’re ready.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        {plans.map(p => (
          <div key={p.name} className="card p-6">
            <div className="text-lg font-semibold">{p.name}</div>
            <div className="text-3xl font-semibold mt-2">{p.price}<span className="text-subtle text-base font-normal">/mo</span></div>
            <ul className="mt-4 text-sm text-subtle space-y-2">
              {p.details.map(d => <li key={d}>• {d}</li>)}
            </ul>
            <button className={`btn mt-6 ${p.name === "Free" ? "btn-ghost" : "btn-primary"}`}>{p.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}