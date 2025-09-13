import { useRef } from "react";
import { motion } from "framer-motion";

type Item = {
  id: string;
  img: string;
  address: string;
  price?: string;
  beds?: string;
  sqft?: string;
  zillowUrl: string; // external link (no scraping)
};

export default function ZillowCarousel({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full">
      <div className="relative">
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
        >
          {items.map((h) => (
            <motion.a
              key={h.id}
              href={h.zillowUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${h.address} on Zillow`}
              whileHover={{ y: -2 }}
              className="snap-start w-[280px] shrink-0 card hover:shadow-md transition-shadow"
            >
              <div className="h-44 w-full overflow-hidden rounded-t-2xl bg-muted">
                <img
                  src={h.img}
                  alt={h.address}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-3">
                <div className="text-base font-semibold">
                  {h.price ?? ""}
                </div>

                <div className="text-sm text-subtle">
                  {h.address}
                </div>

                <div className="mt-1 text-xs text-subtle">
                  {[h.beds, h.sqft].filter(Boolean).join(" • ")}
                </div>

                <div className="mt-2 inline-flex items-center text-[13px] font-medium text-primary">
                  View on Zillow →
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}