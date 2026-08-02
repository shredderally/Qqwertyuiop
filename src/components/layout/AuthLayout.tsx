import type { ReactNode } from 'react'
import { Wordmark } from './Wordmark'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-16">
      <div className="w-full max-w-auth">
        <div className="mb-8 flex justify-center">
          <Wordmark />
        </div>

        <div className="border border-neutral-200 bg-white p-8">
          <h1 className="font-display text-xl text-neutral-950">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-neutral-600">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>

        {footer && <div className="mt-6 text-center text-sm text-neutral-600">{footer}</div>}
      </div>
    </div>
  )
}
