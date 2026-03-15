import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"
import type { Offer } from "@/queries"

interface VendorOffersTableProps {
  offers: Offer[]
  isLoading?: boolean
  error?: Error | null
}

export function VendorOffersTable({ offers, isLoading = false, error = null }: VendorOffersTableProps) {
  return (
    <Card className="mx-4 lg:mx-6">
      <CardHeader>
        <CardTitle>Your Offers</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {error ? (
          <div className="px-6 py-10 text-center text-sm text-destructive">
            Failed to load offers: {error.message}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Redemptions</TableHead>
                <TableHead className="text-right">Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : offers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No offers found. Create your first offer from the admin panel.
                  </TableCell>
                </TableRow>
              ) : (
                offers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium max-w-[200px] truncate">
                      {offer.titleEn}
                    </TableCell>
                    <TableCell>
                      {offer.mainCategory ? (
                        <Badge variant="outline">{offer.mainCategory}</Badge>
                      ) : offer.categories.length > 0 ? (
                        <Badge variant="outline">{offer.categories[0]}</Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {offer.discountType === "percentage"
                        ? `${offer.discountValue}%`
                        : `${offer.discountValue} off`}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground px-1.5"
                      >
                        {offer.status === "active" ? (
                          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
                        ) : (
                          <IconLoader />
                        )}
                        {offer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {(offer.totalRedemptions ?? 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {(offer.viewsCount ?? 0).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
