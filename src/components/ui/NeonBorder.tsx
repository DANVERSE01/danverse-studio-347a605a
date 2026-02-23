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
        'relative rounded-sm glass-btn gradient-border-spin btn-shimmer',
        className
      )}
    >
      {children}
    </div>
  );
}
