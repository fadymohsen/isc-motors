export default function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs font-medium tracking-wide text-red">
      <span className="text-white/30">[</span>
      {children}
      <span className="text-white/30">]</span>
    </span>
  );
}
