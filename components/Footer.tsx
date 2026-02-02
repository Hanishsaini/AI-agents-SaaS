
import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-[#020617] pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-bold text-xl mb-4 text-white">Agent<span className="text-sky-400">Market</span></h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            The premier marketplace for autonomous AI agents.
                            Buy, sell, and rent the future of work.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Platform</h4>
                        <ul className="space-y-4">
                            <li><Link href="/agents" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Browse Agents</Link></li>
                            <li><Link href="/sell" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Sell Agent</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Enterprise</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Documentation</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">API Reference</Link></li>
                            <li><Link href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Stay Updated</h4>
                        <div className="flex space-x-4 mb-4">
                            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-sky-500 hover:text-white transition-all text-slate-400">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-lime-500 hover:text-black transition-all text-slate-400">
                                <Github className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-lg hover:bg-sky-500 hover:text-white transition-all text-slate-400">
                                <Linkedin className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} AI Agent Marketplace. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="text-xs text-slate-500 hover:text-sky-400 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-slate-500 hover:text-sky-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
