import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  words: string[];
  typingSpeed?: number; // ms per character
  deletingSpeed?: number; // ms per character when deleting
  pauseTime?: number; // ms to pause at a full word
  loop?: boolean;
  className?: string;
  cursor?: boolean;
}

export default function TypingText({
  words,
  typingSpeed = 100, // Smooth natural typing (100ms per char)
  deletingSpeed = 100, // Faster deleting
  pauseTime = 4000, // Pause 4 seconds at full word
  loop = true,
  className,
  cursor = true,
}: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const current = words[index % words.length] ?? "";
    const isComplete = text === current;
    const isEmpty = text === "";

    const schedule = (fn: () => void, delay: number) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(fn, delay);
    };

    if (!deleting && !isComplete) {
      // Typing forward - add slight randomness for natural feel
      const variance = Math.random() * 30 - 15; // ±15ms variance
      schedule(() => setText(current.slice(0, text.length + 1)), typingSpeed + variance);
    } else if (!deleting && isComplete) {
      // Pause at complete word
      schedule(() => setDeleting(true), pauseTime);
    } else if (deleting && !isEmpty) {
      // Deleting - slightly faster and more consistent
      schedule(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
    } else if (deleting && isEmpty) {
      // Move to next word
      if (!loop && index + 1 >= words.length) return; // stop if not looping
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pauseTime, loop]);

  // Reset text when moving to next word
  useEffect(() => {
    if (!deleting && text === "") {
      // Small initial delay before starting new word
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const current = words[index % words.length] ?? "";
        if (current) setText(current[0]);
      }, 200);
    }
  }, [index, deleting]);

  return (
    <span className={className}>
      {text}
      {cursor && (
        <span className="ml-1 inline-block w-0.5 h-[1em] bg-current animate-pulse align-middle" />
      )}
    </span>
  );
}
