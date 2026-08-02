import { Store } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui'

export function DashboardHome() {
  return (
    <DashboardLayout>
      <h1 className="font-display text-2xl text-neutral-950">Your businesses</h1>
      <p className="mt-1 text-sm text-neutral-600">Everything you publish on Omnivo starts here.</p>

      <Card className="mt-8 flex flex-col items-center px-6 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center border border-neutral-300">
          <Store className="h-5 w-5 text-neutral-600" aria-hidden="true" />
        </div>
        <p className="max-w-sm text-sm text-neutral-600">
          You don&apos;t have a business set up yet. The setup wizard, where you&apos;ll add your first one,
          ships in the next build.
        </p>
      </Card>
    </DashboardLayout>
  )
}
