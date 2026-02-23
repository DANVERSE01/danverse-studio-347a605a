import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface NeonBorderProps {
  children: ReactNode;
  className?: string;
}

export default function NeonBorder({ children, className }: NeonBorderProps) {
  return (
    <div
      className={cn(
        'relative group rounded-sm border transition-all duration-500 shimmer-cta',
        'border-coral/20 hover:border-coral/50',
        'hover:shadow-[0_0_40px_hsl(var(--coral)/0.12),0_0_80px_hsl(var(--lavender)/0.06)]',
        className
      )}
    >
      {children}
    </div>
  );
}
