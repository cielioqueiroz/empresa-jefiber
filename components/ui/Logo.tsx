import Image from "next/image";

/**
 * Logo da JE FIBER — sempre clicável para o topo da página.
 * Usa dimensões intrínsecas (width/height) + `h-* w-auto`, evitando o modo
 * `fill` (que pode colapsar/sumir em telas muito largas).
 */
export default function Logo({
  className = "h-9",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <a href="#topo" aria-label="JE FIBER — ir para o início" className="inline-block shrink-0">
      <Image
        src="/images/logo-jefiber.png"
        alt="JE FIBER"
        width={512}
        height={166}
        priority={priority}
        className={`${className} w-auto object-contain brightness-0 invert`}
      />
    </a>
  );
}
