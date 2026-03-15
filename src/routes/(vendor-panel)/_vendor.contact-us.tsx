import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from '../../auth'
import { vendorQueryOptions } from '@/queries'

export const Route = createFileRoute('/(vendor-panel)/_vendor/contact-us')({
    component: ContactUsPage,
})

function ContactUsPage() {
    const { user } = useAuth()
    const vendorId = user?.uid ?? ''

    const { data: vendor, isLoading, error } = useQuery(vendorQueryOptions(vendorId))

    const accountManager = vendor?.accountManager

    return (
        <div className="flex flex-1 flex-col p-6 lg:p-10">
            <div className="max-w-3xl space-y-8">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold tracking-tight text-[#020817]">Contact Account Manager</h1>
                    <p className="text-[#020817] text-lg font-medium leading-relaxed max-w-2xl">
                        Please contact your Account Manager using the info below for any inquiries or assistance
                    </p>
                </div>

                {error ? (
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-6 py-4 text-sm text-destructive">
                        Failed to load contact information. Please try again later.
                    </div>
                ) : (
                    <div className="space-y-8 mt-10">
                        <div className="space-y-3">
                            <Label className="text-base font-bold text-[#020817]">Full Name</Label>
                            <div className="bg-[#E5E7EB] h-14 flex items-center px-6 rounded-3xl text-[#020817] font-semibold text-lg">
                                {isLoading ? (
                                    <Skeleton className="h-5 w-48" />
                                ) : accountManager?.name ?? (
                                    <span className="text-muted-foreground font-normal text-base">Not assigned</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base font-bold text-[#020817]">Phone Number</Label>
                            <div className="bg-[#E5E7EB] h-14 flex items-center px-6 rounded-3xl text-[#020817] font-semibold text-lg">
                                {isLoading ? (
                                    <Skeleton className="h-5 w-40" />
                                ) : accountManager?.phone ?? (
                                    <span className="text-muted-foreground font-normal text-base">Not available</span>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-base font-bold text-[#020817]">Email</Label>
                            <div className="bg-[#E5E7EB] h-14 flex items-center px-6 rounded-3xl text-[#020817] font-semibold text-lg">
                                {isLoading ? (
                                    <Skeleton className="h-5 w-56" />
                                ) : accountManager?.email ?? (
                                    <span className="text-muted-foreground font-normal text-base">Not available</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
