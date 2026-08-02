import type { ReactNode } from 'react'
import { LogOut } from 'lucide-react'
import { Wordmark } from './Wordmark'
import { Button } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Wordmark className="text-xl" />
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-600 sm:inline">
              {user?.user_metadata?.full_name ?? user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  )
}
