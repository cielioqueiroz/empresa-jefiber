import { REDES, type Rede } from "@/lib/constants";

const PATHS: Record<Rede, React.ReactNode> = {
  instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" ry="5.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </>
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.4 8.75 22 11 22 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21h-4V9Z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.6 2.1 15.6 2 14.5 2 12 2 10.3 3.5 10.3 6.3v2.2H7.5V12h2.8v9h3.4v-9h2.6l.4-3.5H14Z"
    />
  ),
};

/** Ícones das redes sociais (clicáveis, abrindo em nova aba). */
export default function SocialIcons({
  size = 40,
  className = "",
  variant = "chip",
}: {
  size?: number;
  className?: string;
  variant?: "chip" | "plain";
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {REDES.map((r) => (
        <a
          key={r.rede}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={r.nome}
          title={r.nome}
          style={{ width: size, height: size }}
          className={
            variant === "chip"
              ? "grid place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-papoula hover:text-papoula"
              : "grid place-items-center text-white/80 transition-colors duration-200 hover:text-papoula"
          }
        >
          <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} aria-hidden="true">
            {PATHS[r.rede]}
          </svg>
        </a>
      ))}
    </div>
  );
}
