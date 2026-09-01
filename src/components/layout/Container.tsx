import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /**
   * `default` — the standard measure used by most sections.
   * `wide`    — edge-to-edge feel for the hero and process rail.
   * `text`    — constrained measure for long-form reading.
   */
  width?: 'default' | 'wide' | 'text';
};

const widths = {
  default: 'max-w-[82rem]',
  wide: 'max-w-[96rem]',
  text: 'max-w-[46rem]',
} as const;

export function Container({
  children,
  as: Tag = 'div',
  className,
  width = 'default',
}: ContainerProps) {
  return <Tag className={cn('mx-auto w-full px-gutter', widths[width], className)}>{children}</Tag>;
}
