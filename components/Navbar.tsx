
import Link from 'next/link'
import { Button } from './ui/button'
import { Zap } from 'lucide-react'

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
            <div className="flex h-16 items-center px-6 container mx-auto">
                <Link href="/" className="mr-8 flex items-center space-x-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity group">
                    <div className="bg-gradient-to-br from-sky-400 to-blue-600 p-1.5 rounded-lg group-hover:shadow-[0_0_15px_rgba(14,165,233,0.5)] transition-shadow duration-300">
                        <Zap className="h-5 w-5 text-white fill-white" />
                    </div>
                    <span>Agent<span className="text-sky-400">Market</span></span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/agents" className="text-sm font-medium text-slate-300 transition-all hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(14,165,233,0.4)] relative group">
                        Explore Agents
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="/sell" className="text-sm font-medium text-slate-300 transition-all hover:text-lime-400 hover:drop-shadow-[0_0_8px_rgba(132,204,22,0.4)] relative group">
                        Sell Your Agent
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="ml-auto flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-white/5">
                        Sign In
                    </Button>
                    <Button size="sm" className="bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] transition-all transform hover:-translate-y-0.5 duration-300 border border-sky-400/20">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    )
}
