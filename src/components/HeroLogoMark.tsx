import { useTheme } from "next-themes";

export default function HeroLogoMark() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";
  const glowOpacity = isLight ? "opacity-15" : "opacity-25";
  const ringClass = isLight ? "ring-black/10" : "ring-white/20";
  const borderClass = isLight ? "border-black/10" : "border-white/10";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className={`pointer-events-none absolute -inset-16 rounded-full bg-gradient-primary ${glowOpacity} blur-3xl`} />
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-primary shadow-glow flex items-center justify-center animate-scale-in">
          <span className="text-white font-extrabold text-5xl md:text-6xl select-none">J</span>
        </div>
        <div className={`pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ${ringClass}`} />
        <div className={`pointer-events-none absolute -inset-6 rounded-[2rem] ${borderClass} border animate-spin-slow`} />
      </div>
    </div>
  );
}
