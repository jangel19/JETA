import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Add these classes in your tailwind.config.js if missing:
// animation: { 'spin-slow': 'spin 7s linear infinite', 'scale-in': 'scaleIn 0.6s ease-out' },
// keyframes: { scaleIn: { '0%': { transform: 'scale(0.95)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' }, }, },

export default function HeroLogoMark() {
  const { resolvedTheme } = useTheme();
  const [animating, setAnimating] = useState(false);
  const isLight = resolvedTheme === "light";
  const glowOpacity = isLight ? "opacity-15" : "opacity-25";
  const ringClass = isLight ? "ring-black/10" : "ring-white/20";
  const borderClass = isLight ? "border-black/10" : "border-white/10";

  // One-time expanding animation, reverts to "J"
  useEffect(() => {
    const expandTimer = setTimeout(() => setAnimating(true), 500);
    const collapseTimer = setTimeout(() => setAnimating(false), 3000);
    return () => {
      clearTimeout(expandTimer);
      clearTimeout(collapseTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Glow behind */}
        <div
          className={`pointer-events-none absolute -inset-6 rounded-lg bg-gradient-primary ${glowOpacity} blur-2xl transition-all duration-1000`}
        />

        {/* Logo main */}
        <div
          className={`relative flex h-36 md:h-44 items-center justify-center rounded-lg bg-gradient-primary shadow-glow overflow-hidden animate-scale-in transition-all duration-700 ease-out ${
            animating ? "w-64 md:w-80 px-7" : "w-36 md:w-44"
          }`}
        >
          {/* Centered text */}
          <div className="flex items-center justify-center w-full transition-all">
            <span className="text-white font-extrabold text-5xl md:text-6xl select-none">J</span>
            {/* Animated letters for JETA (enter once, then collapse out) */}
            <span
              className={`flex transition-all duration-500 ${animating ? "ml-1" : "w-0 overflow-hidden ml-0"}`}
              aria-hidden={!animating}
            >
              <span
                className={`text-white font-extrabold text-5xl md:text-6xl select-none transition-all duration-500 ${
                  animating ? "opacity-100 translate-x-0 scale-100 ml-1" : "opacity-0 -translate-x-3 scale-90 ml-0"
                }`}
                style={{ transitionDelay: animating ? "150ms" : "0ms" }}
              >
                E
              </span>
              <span
                className={`text-white font-extrabold text-5xl md:text-6xl select-none transition-all duration-500 ${
                  animating ? "opacity-100 translate-x-0 scale-100 ml-1" : "opacity-0 -translate-x-3 scale-90 ml-0"
                }`}
                style={{ transitionDelay: animating ? "260ms" : "0ms" }}
              >
                T
              </span>
              <span
                className={`text-white font-extrabold text-5xl md:text-6xl select-none transition-all duration-500 ${
                  animating ? "opacity-100 translate-x-0 scale-100 ml-1" : "opacity-0 -translate-x-3 scale-90 ml-0"
                }`}
                style={{ transitionDelay: animating ? "370ms" : "0ms" }}
              >
                A
              </span>
            </span>
          </div>
        </div>

        {/* Static ring highlight */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-lg ring-1 ${ringClass} transition-all duration-700`}
        />

        {/* Animated spinning border */}
        <div
          className={`pointer-events-none absolute -inset-1 rounded-lg ${borderClass} border animate-spin-slow transition-all duration-700`}
        />
      </div>
    </div>
  );
}
