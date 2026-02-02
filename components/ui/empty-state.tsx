
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: LucideIcon
    title: string
    description: string
    action?: React.ReactNode
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
    className,
    ...props
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center text-center p-12 border border-dashed border-slate-700 rounded-2xl bg-slate-900/30",
                className
            )}
            {...props}
        >
            {Icon && (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/50 mb-4">
                    <Icon className="h-8 w-8 text-slate-500" />
                </div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400 mb-6 max-w-sm mx-auto">{description}</p>
            {action && <div>{action}</div>}
        </div>
    )
}
