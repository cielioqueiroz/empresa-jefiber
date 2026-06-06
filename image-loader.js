// Loader custom do next/image para export estático com basePath (GitHub Pages).
// Prefixa o basePath nas imagens locais; URLs absolutas passam direto.
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (/^https?:\/\//.test(src)) return src;
  return `${base}${src}`;
}
