import { createClient } from '@/lib/supabase/server'
import { AgentGrid } from './AgentGrid'
import { Agent } from '@/types/agent'
import { Typography } from '@/components/ui/typography'

export default async function AgentsPage() {
    const supabase = await createClient()
    const { data: agents } = await supabase
        .from('agents')
        .select('*')
        .eq('is_for_sale', true)
        .order('created_at', { ascending: false })

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-12">
                <div className="space-y-4">
                    <Typography variant="h1" glow className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-accent">
                        Browse Agents
                    </Typography>
                    <Typography variant="h3" className="text-muted-foreground font-light max-w-2xl">
                        Discover intelligent workers for every task.
                    </Typography>
                </div>
            </div>

            <AgentGrid initialAgents={(agents as unknown as Agent[]) || []} />
        </div>
    )
}
