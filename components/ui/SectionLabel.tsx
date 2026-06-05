export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-3 w-1 bg-papoula" />
      <span className="font-mono-tech text-xs uppercase text-papoula">{children}</span>
    </div>
  );
}
