
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function BillingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    // Fetch Payments
    const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Billing & History</h3>
                <p className="text-sm text-muted-foreground">
                    View your transaction history and payment details.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Recent payments made to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Description</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {payments?.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-gray-500">No transactions found.</td>
                                    </tr>
                                ) : (
                                    payments?.map((payment) => (
                                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">
                                                {new Date(payment.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 align-middle">
                                                Payment via Stripe
                                            </td>
                                            <td className="p-4 align-middle capitalize">
                                                {payment.status}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                ${payment.amount}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
