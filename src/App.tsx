import { Navigate, Route, Routes } from 'react-router-dom'
import { SignUpPage } from '@/features/auth/pages/SignUpPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage'
import { VerifyEmailPage } from '@/features/auth/pages/VerifyEmailPage'
import { AuthCallbackPage } from '@/features/auth/pages/AuthCallbackPage'
import { DashboardHome } from '@/features/dashboard/pages/DashboardHome'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
