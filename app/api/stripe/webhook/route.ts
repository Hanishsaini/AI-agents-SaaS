
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`)
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    // Create a Supabase admin client to bypass RLS
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object

                const userId = session.metadata?.userId
                const agentId = session.metadata?.agentId
                const type = session.metadata?.type // 'buy' or 'rent'

                if (!userId || !agentId || !type) {
                    console.error('Missing metadata in Stripe session')
                    return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
                }

                if (type === 'buy') {
                    // Create purchase record
                    const { error } = await supabaseAdmin
                        .from('purchases')
                        .insert({
                            buyer_id: userId,
                            agent_id: parseInt(agentId),
                            amount: session.amount_total ? session.amount_total / 100 : 0,
                            stripe_payment_id: session.payment_intent as string,
                            status: 'completed'
                        })

                    if (error) throw error
                    console.log(`Purchase recorded for agent ${agentId} by user ${userId}`)

                } else if (type === 'rent') {
                    // Create rental record
                    const { error } = await supabaseAdmin
                        .from('rentals')
                        .insert({
                            renter_id: userId,
                            agent_id: parseInt(agentId),
                            stripe_subscription_id: session.subscription as string,
                            status: 'active',
                            start_date: new Date().toISOString(),
                            // End date will be null for active subscriptions until cancelled
                        })

                    if (error) throw error
                    console.log(`Rental started for agent ${agentId} by user ${userId}`)
                }
                break

            case 'invoice.payment_succeeded':
                // Logic to extend rental end_date or log payment could go here
                break;

            default:
                console.log(`Unhandled event type ${event.type}`)
        }
    } catch (error: any) {
        console.error('Error processing webhook:', error)
        return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 })
    }

    return NextResponse.json({ received: true })
}
