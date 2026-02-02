import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
    logo?: React.ReactNode
}

export function Navbar({ className, logo, children, ...props }: NavbarProps) {
    return (
        <nav
            className={cn(
                "sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
                className
            )}
            {...props}
        >
            <div className="container flex h-16 items-center px-4">
                <div className="mr-8 hidden md:flex">
                    {logo ? logo : <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">AI Nexus</span>}
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    {children}
                    <div className="flex items-center gap-4">
                        <Link href="/agents" className="text-sm font-medium transition-colors hover:text-primary">
                            Marketplace
                        </Link>
                        <Link href="/sell" className="text-sm font-medium transition-colors hover:text-primary">
                            Sell Agent
                        </Link>
                        <Button variant="glow" size="sm">
                            Connect Wallet
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
