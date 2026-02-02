
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Agent } from '@/types/agent'
import { AgentActions } from './AgentActions'

export default async function AgentDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()

    // Awaiting params is required in newer Next.js versions for dynamic routes
    const { id } = await params

    // Fetch agent
    const { data: agent, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !agent) {
        notFound()
    }

    const agentData = agent as Agent

    // Fetch current user & their access status
    const { data: { user } } = await supabase.auth.getUser()

    let hasPurchased = false
    let hasActiveRental = false

    if (user) {
        // Check for existing purchase
        const { data: purchaseData } = await supabase
            .from('purchases')
            .select('id')
            .eq('buyer_id', user.id)
            .eq('agent_id', agentData.id)
            .eq('status', 'completed')
            .single()

        hasPurchased = !!purchaseData

        // Check for active rental
        if (!hasPurchased) {
            const { data: rentalData } = await supabase
                .from('rentals')
                .select('id')
                .eq('renter_id', user.id)
                .eq('agent_id', agentData.id)
                .eq('status', 'active')
                .single()

            hasActiveRental = !!rentalData
        }
    }

    return (
        <div className="container mx-auto py-12 px-4 animate-fade-in-up">
            <Link href="/agents" className="text-sm text-gray-400 hover:text-white mb-6 inline-flex items-center transition-colors">
                &larr; Back to Agents
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <div className="aspect-square bg-zinc-900 border border-white/10 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden group">
                        {agentData.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={agentData.image_url || ""} alt={agentData.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                            <span className="text-gray-500 text-xl font-medium">Agent Preview</span>
                        )}
                    </div>
                </div>

                <div>
                    <div className="mb-2 text-sm text-sky-400 font-medium uppercase tracking-wider">
                        {agentData.category || "Uncategorized"}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{agentData.name}</h1>
                    <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                        {agentData.description || "No description provided."}
                    </p>

                    <div className="mb-8 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <div className="flex items-baseline justify-between mb-2">
                            <span className="text-sm font-medium text-gray-400">Purchase Price</span>
                            <span className="text-3xl font-bold text-white">${agentData.price}</span>
                        </div>

                        {agentData.rental_price && (
                            <div className="flex items-baseline justify-between mb-8">
                                <span className="text-sm font-medium text-gray-400">Monthly Rental</span>
                                <span className="text-xl font-semibold text-sky-300">${agentData.rental_price}/mo</span>
                            </div>
                        )}

                        <AgentActions
                            agentId={agentData.id}
                            price={agentData.price}
                            rentalPrice={agentData.rental_price}
                            isForRent={agentData.is_for_rent}
                            hasPurchased={hasPurchased}
                            hasActiveRental={hasActiveRental}
                        />
                    </div>

                    <div className="border-t border-white/10 pt-8">
                        <h3 className="font-semibold mb-4 text-lg text-white">Features</h3>
                        {agentData.features && agentData.features.length > 0 ? (
                            <ul className="space-y-3">
                                {agentData.features?.map((feature, index) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                            ✓
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">No specific features listed.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-20 border-t border-white/10 pt-12">
                <h2 className="text-2xl font-bold mb-8 text-white">Customer Reviews</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Placeholder Reviews */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-xl hover:border-white/10 transition-colors">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-zinc-800 rounded-full mr-3 border border-white/5"></div>
                                <div>
                                    <div className="font-semibold text-white">User {i}</div>
                                    <div className="text-xs text-gray-500">Verified Buyer</div>
                                </div>
                            </div>
                            <div className="flex text-amber-500 mb-3 space-x-1">
                                {"★".repeat(5)}
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                "Great agent! It really helped streamline my workflow. Highly recommended for anyone looking to automate tasks."
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
