import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      onClick={() => setIsDark(v => !v)}
      className={
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-sm hover:opacity-90 " +
        className
      }
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}