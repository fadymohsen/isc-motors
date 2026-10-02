export default function Tag({ children }: { children: string }) {
  return (
    <span className="label inline-flex items-center gap-1 font-medium text-white">
      <span className="text-white/60">[</span>
      {children}
      <span className="text-white/60">]</span>
    </span>
  );
}
