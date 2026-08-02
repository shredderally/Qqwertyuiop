import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'solid' | 'outline'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'outline', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-wide',
        tone === 'solid' ? 'bg-neutral-950 text-white' : 'border border-neutral-300 text-neutral-700',
        className,
      )}
      {...props}
    />
  )
}
