// src/components/FAQ.tsx
export default function FAQ() {
  const items = [
    {
      q: "Is this legal with Zillow?",
      a: "Yes. We don’t scrape Zillow or use their data directly. Our listings section links you out to Zillow in a new tab.",
    },
    {
      q: "How accurate are the numbers?",
      a: "JETA uses your comps and your cost assumptions. That keeps the model conservative and aligned to your market.",
    },
    {
      q: "Can I export a report?",
      a: "Yes. You can save a summary card now; PDF export is on the way.",
    },
    {
      q: "What happens after my 3 free reports?",
      a: "Upgrade any time for more monthly reports and advanced features.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-2xl font-semibold tracking-tight">Questions, answered</h2>
      <div className="mt-6 divide-y rounded-2xl border bg-white">
        {items.map((x) => (
          <details key={x.q} className="group p-5 open:bg-muted/30">
            <summary className="cursor-pointer list-none text-[15px] font-medium">
              {x.q}
              <span className="float-right text-subtle transition group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-subtle">{x.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}