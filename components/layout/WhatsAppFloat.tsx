import { CONTATO } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONTATO.whatsapp}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center overflow-hidden rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(37,211,102,.6)]"
    >
      <span className="grid h-14 w-14 shrink-0 place-items-center transition-transform duration-300 group-hover:scale-110 motion-safe:animate-pulse motion-safe:group-hover:animate-none">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
          <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.18c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.34.07.13.07.7-.18 1.4Z"/>
        </svg>
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-body text-sm font-bold text-white transition-all duration-300 group-hover:max-w-[200px] group-hover:pr-5">
        Fale no WhatsApp
      </span>
    </a>
  );
}
