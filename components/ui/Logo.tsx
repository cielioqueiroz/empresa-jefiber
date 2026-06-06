import Image from "next/image";
import Link from "next/link";

/**
 * Logo da JE FIBER — sempre clicável para a HOME (`/`), funcionando também a
 * partir das subpáginas. Usa dimensões intrínsecas (width/height) + `h-* w-auto`,
 * evitando o modo `fill` (que pode colapsar/sumir em telas muito largas).
 */
export default function Logo({
  className = "h-9",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link href="/" aria-label="JE FIBER — voltar para a página inicial" className="inline-block shrink-0">
      <Image
        src="/images/logo-jefiber.png"
        alt="JE FIBER"
        width={512}
        height={166}
        priority={priority}
        className={`${className} logo-img w-auto object-contain`}
      />
    </Link>
  );
}
