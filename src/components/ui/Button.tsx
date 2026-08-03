import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-neutral-950 text-white hover:bg-neutral-800 disabled:bg-neutral-300',
  secondary:
    'bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-950 disabled:text-neutral-400 disabled:border-neutral-200',
  ghost: 'bg-transparent text-neutral-700 hover:text-neutral-950 disabled:text-neutral-300',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading, fullWidth, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded font-medium tracking-tight transition-colors duration-150 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
