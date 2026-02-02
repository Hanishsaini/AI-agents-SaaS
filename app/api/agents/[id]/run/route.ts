
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkAgentAccess } from '@/lib/access'

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Awaiting params for dynamic route API (Next.js 15+)
    const { id } = await params
    const agentId = parseInt(id)

    if (isNaN(agentId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    // Middleware-like check
    const access = await checkAgentAccess(user.id, agentId)

    if (!access.granted) {
        return NextResponse.json({
            error: 'Access Denied',
            reason: access.reason
        }, { status: 403 })
    }

    // Logic to execute agent would go here
    return NextResponse.json({
        success: true,
        message: 'Agent executed successfully',
        accessType: access.type
    })
}
