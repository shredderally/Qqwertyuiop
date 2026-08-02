import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-11 w-full rounded border bg-white px-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors duration-150',
          'focus:outline-none focus-visible:outline-none focus:border-neutral-950',
          hasError ? 'border-neutral-900' : 'border-neutral-300',
          props.disabled && 'bg-neutral-100 text-neutral-400',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
