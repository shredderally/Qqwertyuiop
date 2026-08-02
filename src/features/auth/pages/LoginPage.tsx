import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button, Input, Label, FieldError } from '@/components/ui'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { loginSchema, type LoginValues } from '@/lib/validators'

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginValues) => {
    setFormError(null)
    const { error } = await signIn(values.email, values.password)
    if (error) {
      setFormError(error === 'Invalid login credentials' ? 'Incorrect email or password.' : error)
      return
    }
    const redirectTo = (location.state as { from?: string } | null)?.from ?? '/dashboard'
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthLayout
      title="Log in"
      footer={
        <>
          No account yet?{' '}
          <Link to="/signup" className="font-medium text-neutral-950 underline underline-offset-2">
            Create one
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="mb-0">Password</Label>
            <Link to="/forgot-password" className="mb-1.5 text-xs text-neutral-600 underline underline-offset-2 hover:text-neutral-950">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            hasError={!!errors.password}
            {...register('password')}
          />
          <FieldError message={errors.password?.message} />
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
    }
