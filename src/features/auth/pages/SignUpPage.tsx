import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button, Input, Label, FieldError } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { signUpSchema, type SignUpValues } from '@/lib/validators'

export function SignUpPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({ resolver: zodResolver(signUpSchema) })

  const onSubmit = async (values: SignUpValues) => {
    setFormError(null)
    const { error } = await signUp(values.email, values.password, values.fullName)
    if (error) {
      setFormError(error)
      return
    }
    navigate('/verify-email', { state: { email: values.email } })
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up your storefront in minutes."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-neutral-950 underline underline-offset-2">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {formError && (
          <div className="flex items-start gap-2 border border-neutral-900 bg-neutral-100 px-3 py-2.5 text-sm text-neutral-900">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{formError}</span>
          </div>
        )}

        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            type="text"
            autoComplete="name"
            hasError={!!errors.fullName}
            {...register('fullName')}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

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

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            hasError={!!errors.password}
            {...register('password')}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            hasError={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          <FieldError message={errors.confirmPassword?.message} />
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create account
        </Button>
      </form>
    </AuthLayout>
  )
}
