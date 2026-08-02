import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'

/**
 * Landing point for Supabase email confirmation and OAuth redirects.
 * The Supabase client reads the token from the URL automatically
 * (detectSessionInUrl), so this page only needs to wait for that to
 * resolve and then route the person to where they belong.
 */
export function AuthCallbackPage() {
  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    navigate(user ? '/dashboard' : '/login', { replace: true })
  }, [isLoading, user, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <Spinner />
    </div>
  )
}
