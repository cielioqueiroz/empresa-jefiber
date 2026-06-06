"use client";
import { useLang, type Lang } from "@/lib/i18n";

/** Alternador de idioma PT | EN (segmentado). PT é o padrão. */
export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  const opts: { code: Lang; label: string }[] = [
    { code: "pt", label: "PT" },
    { code: "en", label: "EN" },
  ];
  return (
    <div className={`flex items-center overflow-hidden rounded-lg border border-line/15 ${className}`}>
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-label={o.code === "pt" ? "Português" : "English"}
          aria-pressed={lang === o.code}
          className={`px-2 py-1.5 font-mono-tech text-[11px] font-bold uppercase transition-colors ${
            lang === o.code ? "bg-papoula text-white" : "text-ink/70 hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
