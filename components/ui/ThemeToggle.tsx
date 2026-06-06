"use client";
import { useEffect, useState } from "react";

const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
);

/** Alterna tema claro/escuro (escuro é o padrão). Persiste em localStorage. */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(false);
  useEffect(() => setLight(document.documentElement.classList.contains("light")), []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try { localStorage.setItem("jefiber-theme", next ? "light" : "dark"); } catch {}
  };

  return (
    <button type="button" onClick={toggle} aria-label={light ? "Tema escuro" : "Tema claro"} title={light ? "Tema escuro" : "Tema claro"}
      className={`grid h-9 w-9 place-items-center rounded-lg border border-line/15 text-ink/80 transition-colors hover:border-papoula hover:text-papoula ${className}`}>
      {light ? <Moon /> : <Sun />}
    </button>
  );
}
