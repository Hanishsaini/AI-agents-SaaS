
import Link from "next/link"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-gray-50 md:grid md:grid-cols-[220px_1fr]">
            <aside className="hidden border-r bg-white md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <span className="">AI Marketplace</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/overview"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                            >
                                Overview
                            </Link>
                            <Link
                                href="/agents"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                            >
                                My Agents
                            </Link>
                            <Link
                                href="/billing"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                            >
                                Billing
                            </Link>
                            <Link
                                href="/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                            >
                                Settings
                            </Link>

                            <div className="my-2 border-t" />

                            <Link
                                href="/studio"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-blue-600 transition-all hover:text-blue-700 hover:bg-blue-50 font-medium"
                            >
                                Creator Studio
                            </Link>
                        </nav>
                        <div className="mt-auto p-4">
                            <form action={async () => {
                                'use server'
                                const { signout } = await import('@/app/(auth)/actions')
                                await signout()
                            }}>
                                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:text-red-600 hover:bg-red-50">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
            </main>
        </div>
    )
}
