import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button, Input, Label, FieldError } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { forgotPasswordSchema, type ForgotPasswordValues } from '@/lib/validators'

export function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth()
  const [sentTo, setSentTo] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = async (values: ForgotPasswordValues) => {
    await sendPasswordReset(values.email)
    // Always show the same confirmation, whether or not the address has an
    // account. Confirming existence here would leak which emails are registered.
    setSentTo(values.email)
  }

  if (sentTo) {
    return (
      <AuthLayout title="Check your email">
        <div className="flex items-start gap-2.5 text-sm text-neutral-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neutral-950" aria-hidden="true" />
          <p>
            If an account exists for <span className="font-medium text-neutral-950">{sentTo}</span>, a reset
            link is on its way.
          </p>
        </div>
        <Link to="/login" className="mt-6 block text-center text-sm font-medium text-neutral-950 underline underline-offset-2">
          Back to log in
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/login" className="font-medium text-neutral-950 underline underline-offset-2">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            hasError={!!errors.email}
            {...register('email')}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Send reset link
        </Button>
      </form>
    </AuthLayout>
  )
}
