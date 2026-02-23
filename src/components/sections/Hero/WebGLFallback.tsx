export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Rotating conic mesh gradient */}
      <div
        className="absolute inset-[-50%] animate-[mesh-rotate_20s_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, hsl(var(--cyan)) 0deg, hsl(var(--purple)) 120deg, hsl(var(--magenta)) 240deg, hsl(var(--cyan)) 360deg)',
          opacity: 0.12,
          filter: 'blur(80px)',
        }}
      />

      {/* Radial pulse layers */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full animate-[mesh-pulse-1_8s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--cyan) / 0.4) 0%, hsl(var(--cyan) / 0) 70%)',
          top: '0%',
          left: '10%',
        }}
      />
      <div
        className="absolute w-[700px] h-[700px] rounded-full animate-[mesh-pulse-2_10s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--magenta) / 0.3) 0%, hsl(var(--magenta) / 0) 70%)',
          top: '20%',
          right: '-5%',
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full animate-[mesh-pulse-3_12s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(circle, hsl(var(--purple) / 0.35) 0%, hsl(var(--purple) / 0) 70%)',
          bottom: '-10%',
          left: '30%',
        }}
      />

      {/* Traveling light streak */}
      <div
        className="absolute w-[200%] h-[1px] animate-[light-streak_6s_ease-in-out_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, hsl(var(--cyan) / 0.6) 30%, hsl(var(--magenta) / 0.6) 70%, transparent 100%)',
          top: '40%',
          left: '-50%',
          transform: 'rotate(-15deg)',
          filter: 'blur(2px)',
          opacity: 0.4,
        }}
      />
      <div
        className="absolute w-[200%] h-[1px] animate-[light-streak-2_8s_ease-in-out_infinite_2s]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, hsl(var(--purple) / 0.5) 40%, hsl(var(--cyan) / 0.5) 60%, transparent 100%)',
          top: '65%',
          left: '-50%',
          transform: 'rotate(10deg)',
          filter: 'blur(3px)',
          opacity: 0.3,
        }}
      />

      {/* Fine grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--cyan) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--cyan) / 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
