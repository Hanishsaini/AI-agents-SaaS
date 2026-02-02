
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="container mx-auto py-12 px-4">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <Skeleton className="h-12 w-full md:w-1/3 rounded-full" />
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rounded-3xl border border-white/5 bg-[#0f172a]/60 p-6 h-[400px] flex flex-col">
                        <Skeleton className="h-48 w-full rounded-xl mb-6" />
                        <div className="space-y-3 flex-1">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                        <div className="pt-6 mt-auto flex justify-between items-center">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
