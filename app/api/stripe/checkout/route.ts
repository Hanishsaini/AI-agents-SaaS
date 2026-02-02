
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
    try {
        const { agentId, type } = await request.json()

        // Get authenticated user
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch agent details from DB to ensure accurate pricing
        const { data: agent, error } = await supabase
            .from('agents')
            .select('*')
            .eq('id', agentId)
            .single()

        if (error || !agent) {
            return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
        }

        const isSubscription = type === 'rent'
        const price = isSubscription ? agent.rental_price : agent.price

        if (!price) {
            return NextResponse.json({ error: 'Price not available for this option' }, { status: 400 })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: agent.name,
                            description: agent.description,
                            images: agent.image_url ? [agent.image_url] : [],
                            metadata: {
                                agentId: agent.id,
                                type: type // 'buy' or 'rent'
                            }
                        },
                        unit_amount: Math.round(price * 100), // Stripe expects cents
                        ...(isSubscription && {
                            recurring: {
                                interval: 'month',
                            },
                        }),
                    },
                    quantity: 1,
                },
            ],
            mode: isSubscription ? 'subscription' : 'payment',
            success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.headers.get('origin')}/agents/${agent.id}`,
            metadata: {
                userId: user.id,
                agentId: agent.id,
                type: type
            },
            customer_email: user.email // Pre-fill email
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error: any) {
        console.error('Stripe error:', error)
        return NextResponse.json({ error: error.message || 'Error creating checkout session' }, { status: 500 })
    }
}
