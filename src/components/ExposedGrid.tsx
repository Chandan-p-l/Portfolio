export function ExposedGrid({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      id="exposed-grid-overlay"
      className="fixed inset-0 pointer-events-none z-30 flex justify-center max-w-7xl mx-auto px-4 sm:px-8 md:px-12"
    >
      <div className="w-full h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4 border-x border-[#FF2A2A]/20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full border-r border-[#FF2A2A]/15 relative bg-[#FF2A2A]/[0.015]"
          >
            <span className="absolute top-2 left-1 font-tech text-[8px] text-[#FF2A2A]/40 select-none">
              COL_{String(i + 1).padStart(2, '0')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
