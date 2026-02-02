import React from "react";
import { cn } from "@/lib/utils";

type Variant = "h1" | "h2" | "h3" | "h4" | "body" | "caption" | "small";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    variant?: Variant;
    as?: React.ElementType;
    glow?: boolean;
}

export function Typography({
    variant = "body",
    as,
    className,
    glow = false,
    children,
    ...props
}: TypographyProps) {
    const Component = as || mapVariantToTag(variant);

    return (
        <Component
            className={cn(
                "text-foreground",
                {
                    "font-bold tracking-tight text-white": ["h1", "h2", "h3", "h4"].includes(variant),
                    "text-5xl md:text-6xl lg:text-7xl leading-tight": variant === "h1",
                    "text-3xl md:text-4xl leading-snug": variant === "h2",
                    "text-2xl font-semibold": variant === "h3",
                    "text-xl font-semibold": variant === "h4",
                    "text-base leading-relaxed text-slate-300": variant === "body",
                    "text-sm text-slate-400": variant === "caption",
                    "text-xs text-slate-500 uppercase tracking-wider": variant === "small",
                    "drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]": glow && ["h1", "h2"].includes(variant),
                    "drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]": glow && ["h3", "h4"].includes(variant),
                },
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}

function mapVariantToTag(variant: Variant): React.ElementType {
    switch (variant) {
        case "h1": return "h1";
        case "h2": return "h2";
        case "h3": return "h3";
        case "h4": return "h4";
        case "caption":
        case "small": return "span";
        default: return "p";
    }
}
