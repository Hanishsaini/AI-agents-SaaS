
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function OverviewPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch Purchases
    const { data: purchases } = await supabase
        .from('purchases')
        .select('*, agent:agents(*)')
        .eq('buyer_id', user.id)
        .eq('status', 'completed')

    // Fetch Rentals
    const { data: rentals } = await supabase
        .from('rentals')
        .select('*, agent:agents(*)')
        .eq('renter_id', user.id)
        .neq('status', 'cancelled')

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/agents">
                        <Button>Browse Agents</Button>
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${purchases?.reduce((acc, curr) => acc + Number(curr.amount), 0).toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">Lifetime value</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{rentals?.filter(r => r.status === 'active').length || 0}</div>
                        <p className="text-xs text-muted-foreground">Agents rented</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Owned Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{purchases?.length || 0}</div>
                        <p className="text-xs text-muted-foreground">Lifetime access</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Your Agents</CardTitle>
                        <CardDescription>
                            Agents you have purchased lifetime access to.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {purchases?.length === 0 && <p className="text-sm text-gray-500">No agents purchased yet.</p>}
                            {purchases?.map((purchase: any) => (
                                <div key={purchase.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                            {purchase.agent.image_url ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={purchase.agent.image_url} alt={purchase.agent.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <span className="text-xs text-gray-500">Img</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{purchase.agent.name}</p>
                                            <p className="text-xs text-gray-500">Purchased on {new Date(purchase.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/agents/${purchase.agent.id}`}>View</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Active Rentals</CardTitle>
                        <CardDescription>
                            Agents you are currently renting.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {rentals?.length === 0 && <p className="text-sm text-gray-500">No active rentals.</p>}
                            {rentals?.map((rental: any) => (
                                <div key={rental.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium">{rental.agent.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Status: <span className={rental.status === 'active' ? 'text-green-600' : 'text-red-600 capitalize'}>{rental.status}</span>
                                        </p>
                                        {rental.end_date && (
                                            <p className="text-xs text-orange-600">Expires: {new Date(rental.end_date).toLocaleDateString()}</p>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={`/agents/${rental.agent.id}`}>Manage</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
