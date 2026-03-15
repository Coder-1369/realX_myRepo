import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from '../../auth'
import { vendorQueryOptions } from '@/queries'

export const Route = createFileRoute('/(vendor-panel)/_vendor/pin')({
    component: PinPage,
})

function PinPage() {
    const { user } = useAuth()
    const vendorId = user?.uid ?? ''

    const { data: vendor, isLoading, error } = useQuery(vendorQueryOptions(vendorId))

    const pin = vendor?.pin ?? ''

    return (
        <div className="flex flex-1 flex-col p-8 md:p-12">
            <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Vendor PIN for your brand</h1>
                <p className="text-muted-foreground md:text-lg">Your brand&apos;s unique PIN is required to verify redemption.</p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-8 py-20">
                {error ? (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-6 py-4 text-sm text-destructive text-center max-w-sm">
                        Failed to load your PIN. Please try again later.
                    </div>
                ) : isLoading ? (
                    <div className="flex gap-4 md:gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem]" />
                        ))}
                    </div>
                ) : (
                    <InputOTP maxLength={4} value={pin} readOnly>
                        <div className="flex gap-4 md:gap-6">
                            <InputOTPGroup>
                                <InputOTPSlot index={0} className="h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem] border bg-card text-3xl md:text-5xl shadow-sm transition-all" />
                            </InputOTPGroup>
                            <InputOTPGroup>
                                <InputOTPSlot index={1} className="h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem] border bg-card text-3xl md:text-5xl shadow-sm transition-all" />
                            </InputOTPGroup>
                            <InputOTPGroup>
                                <InputOTPSlot index={2} className="h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem] border bg-card text-3xl md:text-5xl shadow-sm transition-all" />
                            </InputOTPGroup>
                            <InputOTPGroup>
                                <InputOTPSlot index={3} className="h-16 w-16 md:h-24 md:w-24 rounded-[1.5rem] md:rounded-[2rem] border bg-card text-3xl md:text-5xl shadow-sm transition-all" />
                            </InputOTPGroup>
                        </div>
                    </InputOTP>
                )}

                <p className="max-w-md text-center text-sm font-medium leading-relaxed md:text-base">
                    This PIN is exclusive to your brand. Ensure all staff know the PIN, but it must remain confidential from students.*
                </p>
            </div>
        </div>
    )
}
