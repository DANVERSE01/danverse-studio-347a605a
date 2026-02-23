import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'magenta' | 'purple';
}

export default function NeonBorder({ children, className, color = 'cyan' }: NeonBorderProps) {
  const glowMap = {
    cyan: 'shadow-[0_0_20px_hsl(var(--cyan)/0.2)] hover:shadow-[0_0_40px_hsl(var(--cyan)/0.35)] border-cyan/30 hover:border-cyan/60',
    magenta: 'shadow-[0_0_20px_hsl(var(--magenta)/0.2)] hover:shadow-[0_0_40px_hsl(var(--magenta)/0.35)] border-magenta/30 hover:border-magenta/60',
    purple: 'shadow-[0_0_20px_hsl(var(--purple)/0.2)] hover:shadow-[0_0_40px_hsl(var(--purple)/0.35)] border-purple/30 hover:border-purple/60',
  };

  return (
    <div
      className={cn(
        'rounded-lg border transition-all duration-300',
        glowMap[color],
        className
      )}
    >
      {children}
    </div>
  );
}
