
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, FolderOpen } from "lucide-react"

export default function SuccessPage({
    searchParams,
}: {
    searchParams: { session_id: string }
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-fade-in-up">
            <div className="bg-emerald-500/10 p-5 rounded-full mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Payment Successful!</h1>
            <p className="text-gray-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Your transaction has been confirmed. You can now access your agent from your Studio dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/studio">
                    <Button size="lg" className="h-12 px-6 bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 transition-all hover:scale-105">
                        <FolderOpen className="mr-2 h-5 w-5" /> Go to Studio
                    </Button>
                </Link>
                <Link href="/agents">
                    <Button variant="outline" size="lg" className="h-12 px-6 border-white/10 bg-transparent text-white hover:bg-white/10 transition-all">
                        Browse More Agents <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>

            <p className="text-xs text-gray-600 mt-12">
                Transaction ID: <span className="text-gray-500">{searchParams.session_id || 'N/A'}</span>
            </p>
        </div>
    )
}
