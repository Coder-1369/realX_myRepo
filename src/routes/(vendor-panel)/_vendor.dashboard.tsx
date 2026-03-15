import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { VendorOffersTable } from "@/components/vendor-offers-table"
import { useAuth } from '../../auth'
import { vendorQueryOptions, offersQueryOptions } from '@/queries'

export const Route = createFileRoute('/(vendor-panel)/_vendor/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { user } = useAuth()
  const vendorId = user?.uid ?? ''

  const {
    data: offers = [],
    isLoading: offersLoading,
    error: offersError,
  } = useQuery(offersQueryOptions(vendorId))

  const { isLoading: vendorLoading } = useQuery(vendorQueryOptions(vendorId))

  const isLoading = offersLoading || vendorLoading

  const totalRedemptions = offers.reduce((sum, o) => sum + (o.totalRedemptions ?? 0), 0)
  const totalViews = offers.reduce((sum, o) => sum + (o.viewsCount ?? 0), 0)
  const activeOffers = offers.filter((o) => o.status === 'active').length
  const totalOffers = offers.length

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            totalRedemptions={totalRedemptions}
            activeOffers={activeOffers}
            totalViews={totalViews}
            totalOffers={totalOffers}
            isLoading={isLoading}
          />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <VendorOffersTable
            offers={offers}
            isLoading={offersLoading}
            error={offersError}
          />
        </div>
      </div>
    </div>
  )
}
