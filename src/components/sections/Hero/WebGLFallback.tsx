export default function WebGLFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 animate-blob-1"
        style={{
          background: 'hsl(var(--cyan))',
          filter: 'blur(120px)',
          top: '10%',
          left: '20%',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 animate-blob-2"
        style={{
          background: 'hsl(var(--magenta))',
          filter: 'blur(100px)',
          top: '30%',
          right: '10%',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-25 animate-blob-3"
        style={{
          background: 'hsl(var(--purple))',
          filter: 'blur(80px)',
          bottom: '10%',
          left: '40%',
        }}
      />
    </div>
  );
}
