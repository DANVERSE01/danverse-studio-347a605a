export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Crystal blue ambient */}
      <div
        className="absolute w-[1000px] h-[1000px] rounded-full animate-float-1"
        style={{
          background: 'radial-gradient(circle, hsl(var(--coral) / 0.06) 0%, transparent 65%)',
          top: '-30%',
          right: '-20%',
        }}
      />
      {/* Teal glow */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full animate-float-2"
        style={{
          background: 'radial-gradient(circle, hsl(var(--sage) / 0.05) 0%, transparent 60%)',
          bottom: '-20%',
          left: '-10%',
        }}
      />
      {/* Prismatic shimmer */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float-1"
        style={{
          background: 'radial-gradient(circle, hsl(var(--lavender) / 0.04) 0%, transparent 55%)',
          top: '40%',
          left: '50%',
        }}
      />
      {/* Crystal rotating ring */}
      <svg
        className="absolute top-[15%] right-[12%] w-[300px] h-[300px] animate-rotate-slow opacity-[0.05]"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="hsl(var(--coral))" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="150" cy="150" r="100" stroke="hsl(var(--sage))" strokeWidth="0.5" strokeDasharray="2 12" />
        <circle cx="150" cy="150" r="60" stroke="hsl(var(--lavender))" strokeWidth="0.3" strokeDasharray="1 16" />
      </svg>
      {/* Dot grid */}
      <div className="absolute bottom-[20%] left-[8%] grid grid-cols-5 gap-4 opacity-[0.04]">
        {Array.from({ length: 25 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ background: 'hsl(var(--coral))' }} />
        ))}
      </div>
      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" preserveAspectRatio="none">
        <line x1="70%" y1="0" x2="30%" y2="100%" stroke="hsl(var(--coral))" strokeWidth="0.5" />
        <line x1="75%" y1="0" x2="35%" y2="100%" stroke="hsl(var(--sage))" strokeWidth="0.3" />
        <line x1="80%" y1="0" x2="40%" y2="100%" stroke="hsl(var(--lavender))" strokeWidth="0.2" />
      </svg>
    </div>
  );
}
