
import { createClient } from '@/lib/supabase/server'

export type AccessResult =
    | { granted: true; type: 'purchase' | 'rental'; expiresAt?: string }
    | { granted: false; reason: 'no_record' | 'expired' | 'inactive_status' | 'unauthorized' }

/**
 * Checks if a user has access to a specific agent.
 * Handles lifetime purchases and rental expiration.
 * Lazily updates rental status to 'expired' if needed.
 */
export async function checkAgentAccess(userId: string, agentId: number): Promise<AccessResult> {
    const supabase = await createClient()

    // 1. Check for lifetime purchase first
    const { data: purchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('buyer_id', userId)
        .eq('agent_id', agentId)
        .eq('status', 'completed')
        .single()

    if (purchase) {
        return { granted: true, type: 'purchase' }
    }

    // 2. Check for rental
    const { data: rental } = await supabase
        .from('rentals')
        .select('id, status, end_date')
        .eq('renter_id', userId)
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false }) // Get latest
        .limit(1)
        .single()

    if (!rental) {
        return { granted: false, reason: 'no_record' }
    }

    // 3. Expiry Check
    if (rental.end_date) {
        const expiresAt = new Date(rental.end_date)
        const now = new Date()

        if (now > expiresAt) {
            // Auto-disable: Lazy update status to expired
            if (rental.status !== 'expired') {
                await supabase
                    .from('rentals')
                    .update({ status: 'expired' })
                    .eq('id', rental.id)
            }
            return { granted: false, reason: 'expired' }
        }
    }

    // 4. Status Check
    if (rental.status !== 'active') {
        return { granted: false, reason: 'inactive_status' }
    }

    return {
        granted: true,
        type: 'rental',
        expiresAt: rental.end_date || undefined
    }
}
