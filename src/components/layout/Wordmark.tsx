import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        'font-display text-2xl tracking-tightest text-neutral-950 select-none',
        className,
      )}
    >
      Omnivo
    </Link>
  )
}
