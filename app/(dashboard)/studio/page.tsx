
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Package, Key, Clock, AlertCircle, ExternalLink, Play } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function StudioPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // --- Fetch Created Agents (for sellers) ---
    const { data: createdAgents } = await supabase
        .from('agents')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

    // --- Fetch Purchased Agents ---
    const { data: purchasedAgents } = await supabase
        .from('purchases')
        .select('*, agent:agents(*)')
        .eq('buyer_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })

    // --- Fetch Rented Agents ---
    const { data: rentedAgents } = await supabase
        .from('rentals')
        .select('*, agent:agents(*)')
        .eq('renter_id', user.id)
        .order('created_at', { ascending: false })

    // Check rental expiry
    const now = new Date()
    const activeRentals = rentedAgents?.filter(r => r.status === 'active' && (!r.end_date || new Date(r.end_date) > now)) || []
    const expiredRentals = rentedAgents?.filter(r => r.status !== 'active' || (r.end_date && new Date(r.end_date) <= now)) || []

    // --- Calculate Stats ---
    const { data: myAgentPurchases } = await supabase
        .from('purchases')
        .select('amount, agent!inner(owner_id)')
        .eq('agent.owner_id', user.id)
        .eq('status', 'completed')

    const totalRevenue = myAgentPurchases?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">My Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/sell">
                        <Button className="bg-sky-500 text-white hover:bg-sky-400 transition-all">Create New Agent</Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Owned Agents</CardTitle>
                        <Package className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{purchasedAgents?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Active Rentals</CardTitle>
                        <Key className="h-4 w-4 text-sky-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{activeRentals.length}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Listed Agents</CardTitle>
                        <Clock className="h-4 w-4 text-amber-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{createdAgents?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
                        <span className="text-lg">$</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Owned Agents */}
            <Card className="bg-zinc-900 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><Package className="h-5 w-5 text-emerald-400" /> Owned Agents</CardTitle>
                    <CardDescription className="text-gray-400">Agents you've purchased outright.</CardDescription>
                </CardHeader>
                <CardContent>
                    {purchasedAgents?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>You don't own any agents yet.</p>
                            <Link href="/agents"><Button variant="link" className="text-sky-400 mt-2">Browse Marketplace</Button></Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {purchasedAgents?.map((purchase) => (
                                <div key={purchase.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                                            {purchase.agent?.image_url ? (
                                                <img src={purchase.agent.image_url} alt={purchase.agent.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <Package className="h-5 w-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{purchase.agent?.name}</p>
                                            <p className="text-xs text-emerald-400">Owned</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-sky-500 hover:bg-sky-400 text-white">
                                            <Play className="h-4 w-4 mr-1" /> Use
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="border-white/10 hover:bg-white/5 text-gray-300">
                                            <Link href={`/agents/${purchase.agent_id}`}><ExternalLink className="h-4 w-4" /></Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Rented Agents */}
            <Card className="bg-zinc-900 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2"><Key className="h-5 w-5 text-sky-400" /> Rented Agents</CardTitle>
                    <CardDescription className="text-gray-400">Agents you're currently renting.</CardDescription>
                </CardHeader>
                <CardContent>
                    {activeRentals.length === 0 && expiredRentals.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <p>You don't have any active rentals.</p>
                            <Link href="/agents"><Button variant="link" className="text-sky-400 mt-2">Browse Marketplace</Button></Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeRentals.map((rental) => (
                                <div key={rental.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                                            {rental.agent?.image_url ? (
                                                <img src={rental.agent.image_url} alt={rental.agent.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <Key className="h-5 w-5 text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{rental.agent?.name}</p>
                                            <p className="text-xs text-sky-400">Active Subscription</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="bg-sky-500 hover:bg-sky-400 text-white">
                                            <Play className="h-4 w-4 mr-1" /> Use
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="border-white/10 hover:bg-white/5 text-gray-300">
                                            <Link href={`/agents/${rental.agent_id}`}><ExternalLink className="h-4 w-4" /></Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {expiredRentals.map((rental) => (
                                <div key={rental.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0 opacity-60">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                                            {rental.agent?.image_url ? (
                                                <img src={rental.agent.image_url} alt={rental.agent.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <AlertCircle className="h-5 w-5 text-red-500" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{rental.agent?.name}</p>
                                            <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Expired</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" disabled className="bg-gray-700 text-gray-400 cursor-not-allowed">
                                            Access Disabled
                                        </Button>
                                        <Button variant="outline" size="sm" asChild className="border-white/10 hover:bg-white/5 text-gray-300">
                                            <Link href={`/agents/${rental.agent_id}`}>Renew</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Created Agents (For Sellers) */}
            {createdAgents && createdAgents.length > 0 && (
                <Card className="bg-zinc-900 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white">My Listed Agents</CardTitle>
                        <CardDescription className="text-gray-400">Agents you've created and listed for sale.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {createdAgents.map((agent) => (
                                <div key={agent.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white/5 rounded-lg flex items-center justify-center overflow-hidden border border-white/10">
                                            {agent.image_url ? (
                                                <img src={agent.image_url} alt={agent.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <span className="text-xs text-gray-500">Img</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{agent.name}</p>
                                            <p className="text-xs text-gray-500">
                                                ${agent.price} {agent.rental_price ? ` / $${agent.rental_price}/mo` : ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild className="border-white/10 hover:bg-white/5 hover:text-white text-gray-300">
                                            <Link href={`/agents/${agent.id}`}>View</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
