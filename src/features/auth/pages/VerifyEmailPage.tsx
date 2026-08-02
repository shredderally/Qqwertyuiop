import { Link, useLocation } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'

export function VerifyEmailPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email

  return (
    <AuthLayout title="Confirm your email">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-11 w-11 items-center justify-center border border-neutral-300">
          <Mail className="h-5 w-5 text-neutral-700" aria-hidden="true" />
        </div>
        <p className="text-sm text-neutral-700">
          {email ? (
            <>
              We sent a confirmation link to <span className="font-medium text-neutral-950">{email}</span>.
            </>
          ) : (
            'We sent a confirmation link to your email.'
          )}{' '}
          Open it to activate your account.
        </p>
        <Link to="/login" className="mt-6 text-sm font-medium text-neutral-950 underline underline-offset-2">
          Back to log in
        </Link>
      </div>
    </AuthLayout>
  )
}
