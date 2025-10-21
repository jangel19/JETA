import { useEffect, useRef } from "react";

export function useScrollParallax(multiplier: number) {
  const target = useRef(0);
  const value = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      target.current = window.scrollY * multiplier;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [multiplier]);

  return { target, value };
}

