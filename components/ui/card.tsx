import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hoverEffect?: boolean;
    activeEffect?: boolean;
    glass?: boolean;
    featured?: boolean;
}

export function Card({
    className,
    hoverEffect = true,
    activeEffect = false,
    glass = false,
    featured = false,
    children,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border transition-all duration-300 ease-out",
                "bg-card text-card-foreground border-white/5",
                {
                    "glass-panel": glass,
                    "hover:border-primary/50 hover:shadow-[0_0_30px_-5px_var(--color-primary)] hover:translate-y-[-2px]": hoverEffect,
                    "active:scale-[0.98]": activeEffect,
                    "border-primary/50 bg-primary/5 shadow-[0_0_30px_-10px_var(--color-primary)]": featured,
                },
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={cn("text-2xl font-semibold leading-none tracking-tight text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
