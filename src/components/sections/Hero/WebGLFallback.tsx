export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Warm ambient orb */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full animate-float-1"
        style={{
          background: 'radial-gradient(circle, hsl(var(--amber) / 0.08) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-float-2"
        style={{
          background: 'radial-gradient(circle, hsl(var(--burnt) / 0.06) 0%, transparent 70%)',
          bottom: '-10%',
          left: '10%',
        }}
      />
      {/* Subtle horizontal line accents */}
      <div
        className="absolute top-1/3 left-0 right-0 h-px opacity-[0.06]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--amber)), transparent)' }}
      />
      <div
        className="absolute top-2/3 left-0 right-0 h-px opacity-[0.04]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--cream)), transparent)' }}
      />
    </div>
  );
}
