
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface AgentActionsProps {
    agentId: number
    price: number
    rentalPrice: number | null
    isForRent: boolean
    hasPurchased: boolean
    hasActiveRental: boolean
}

export function AgentActions({
    agentId,
    price,
    rentalPrice,
    isForRent,
    hasPurchased,
    hasActiveRental
}: AgentActionsProps) {
    const [isLoadingBuy, setIsLoadingBuy] = useState(false)
    const [isLoadingRent, setIsLoadingRent] = useState(false)

    const handleCheckout = async (type: 'buy' | 'rent') => {
        if (type === 'buy') setIsLoadingBuy(true)
        else setIsLoadingRent(true)

        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ agentId, type }),
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                console.error('Checkout error:', data.error)
                alert(data.error || 'Failed to start checkout. Please try again.')
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('An unexpected error occurred.')
        } finally {
            setIsLoadingBuy(false)
            setIsLoadingRent(false)
        }
    }

    if (hasPurchased) {
        return (
            <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-500 text-white" disabled>
                    ✓ Owned
                </Button>
                <Button size="lg" variant="outline" className="w-full h-12 text-lg border-white/10 bg-transparent text-white hover:bg-white/10">
                    Use Agent
                </Button>
            </div>
        )
    }

    if (hasActiveRental) {
        return (
            <div className="flex flex-col gap-4">
                <Button size="lg" className="w-full h-12 text-lg bg-sky-600 hover:bg-sky-500 text-white" disabled>
                    ✓ Renting
                </Button>
                <Button size="lg" variant="outline" className="w-full h-12 text-lg border-white/10 bg-transparent text-white hover:bg-white/10">
                    Use Agent
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <Button
                size="lg"
                className="w-full h-12 text-lg bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all"
                onClick={() => handleCheckout('buy')}
                disabled={isLoadingBuy || isLoadingRent}
            >
                {isLoadingBuy ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                ) : (
                    `Buy Now - $${price}`
                )}
            </Button>
            {isForRent && rentalPrice && (
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-12 text-lg border-white/10 bg-transparent text-white hover:bg-white/10 transition-all"
                    onClick={() => handleCheckout('rent')}
                    disabled={isLoadingBuy || isLoadingRent}
                >
                    {isLoadingRent ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : (
                        `Rent for $${rentalPrice}/mo`
                    )}
                </Button>
            )}
        </div>
    )
}
