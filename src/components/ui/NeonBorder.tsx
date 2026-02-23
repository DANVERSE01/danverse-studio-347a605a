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
        'relative group rounded-sm border transition-all duration-500',
        'border-amber/20 hover:border-amber/50',
        'hover:shadow-[0_0_30px_hsl(var(--amber)/0.1)]',
        className
      )}
    >
      {children}
    </div>
  );
}
