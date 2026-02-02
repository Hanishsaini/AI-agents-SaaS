
'use client'

import { useState } from 'react'
import { Agent } from '@/types/agent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Search, Star, Zap, Cpu, Sparkles } from 'lucide-react'

interface AgentGridProps {
    initialAgents: Agent[]
}

const CATEGORIES = ['All', 'Productivity', 'Finance', 'Coding', 'Marketing']

export function AgentGrid({ initialAgents }: AgentGridProps) {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')

    const filteredAgents = initialAgents.filter((agent) => {
        const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
            agent.description?.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = category === 'All' || (agent.features && agent.features.includes(category)) || agent.category === category

        return matchesSearch && matchesCategory
    })

    return (
        <div className="space-y-10">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-card/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="relative w-full md:w-1/3 group">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Input
                        startIcon={<Search className="h-4 w-4" />}
                        placeholder="Search agents..."
                        className="relative z-10 w-full pl-10 py-6 bg-background/50 border-white/10 rounded-full focus:ring-primary/50 text-base shadow-lg transition-all hover:bg-background/80"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide px-2">
                    {CATEGORIES.map((cat) => (
                        <Button
                            key={cat}
                            variant={category === cat ? 'glow' : 'outline'}
                            size="sm"
                            onClick={() => setCategory(cat)}
                            className={cn(
                                "rounded-full px-6",
                                category !== cat && "bg-transparent border-white/10 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {filteredAgents.length === 0 ? (
                <div className="text-center py-32 flex flex-col items-center animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-card mb-6 border border-white/5 shadow-[0_0_30px_-5px_var(--color-primary)]">
                        <Search className="h-10 w-10 text-primary" />
                    </div>
                    <Typography variant="h3" className="mb-2">No agents found</Typography>
                    <Typography variant="body" className="text-muted-foreground">Try adjusting your search or filters.</Typography>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAgents.map((agent) => (
                        <Card
                            key={agent.id}
                            hoverEffect={true}
                            glass={true}
                            featured={agent.price > 50} // Example logic, or add to Agent type
                            className="group flex flex-col h-full overflow-hidden border-white/5 bg-card/40 backdrop-blur-md"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Image Section */}
                            <div className="h-52 relative overflow-hidden bg-muted">
                                {agent.image_url ? (
                                    <img
                                        src={agent.image_url}
                                        alt={agent.name}
                                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-card to-background">
                                        <Cpu className="h-16 w-16 text-muted-foreground/50 group-hover:text-primary/50 transition-colors duration-500" />
                                    </div>
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-90" />

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge variant="glass" className="backdrop-blur-xl border-white/10 px-3 py-1 text-xs">
                                        <Sparkles className="h-3 w-3 text-primary mr-1" />
                                        {agent.category || 'AI Agent'}
                                    </Badge>
                                </div>

                                {/* Price Badge Top Right */}
                                <div className="absolute top-4 right-4">
                                    <Badge variant={agent.price > 0 ? "glow" : "secondary"} className="text-xs font-bold px-3 py-1 backdrop-blur-md">
                                        {agent.price > 0 ? `$${agent.price}` : 'FREE'}
                                    </Badge>
                                </div>
                            </div>

                            {/* Content Section */}
                            <CardContent className="flex flex-col flex-1 relative z-10 p-6 pt-0">
                                <div className="mb-6 mt-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1 text-amber-400 h-5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={cn("h-3.5 w-3.5 fill-current", i < 4 ? "text-amber-400" : "text-muted-foreground/30")} />
                                            ))}
                                            <span className="text-xs text-muted-foreground ml-1 font-medium">4.2</span>
                                        </div>
                                    </div>

                                    <Typography variant="h3" className="mb-2 text-xl group-hover:text-primary transition-colors leading-tight line-clamp-1">
                                        {agent.name}
                                    </Typography>
                                    <Typography variant="body" className="text-sm line-clamp-2 leading-relaxed h-[40px] text-muted-foreground/80">
                                        {agent.description || 'A powerful AI agent ready to automate your workflow.'}
                                    </Typography>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
                                    <Link href={`/agents/${agent.id}`} className="flex-1">
                                        <Button variant={agent.price > 0 ? "glow" : "outline"} className="w-full relative group/btn h-10">
                                            <span className="relative z-10 flex items-center justify-center gap-2 font-medium">
                                                {agent.price > 0 ? 'Buy Agent' : 'Get Free'}
                                                <Zap className="h-3.5 w-3.5 group-hover/btn:fill-current transition-colors" />
                                            </span>
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

