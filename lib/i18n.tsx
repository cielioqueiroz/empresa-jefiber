"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { EN } from "./dict";

export type Lang = "pt" | "en";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "pt",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  useEffect(() => {
    const s = localStorage.getItem("jefiber-lang");
    if (s === "en" || s === "pt") setLangState(s);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("jefiber-lang", l);
    } catch {}
    document.documentElement.lang = l === "en" ? "en" : "pt-BR";
  };
  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/** Hook de tradução: t("texto em PT") -> EN quando o idioma é inglês, senão o próprio PT. */
export function useT() {
  const { lang } = useLang();
  return (s: string) => (lang === "en" ? EN[s.trim()] ?? s : s);
}
