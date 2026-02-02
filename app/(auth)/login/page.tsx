
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { login } from "../actions"

export default function LoginPage() {
    return (
        <div className="bg-white py-10 px-8 shadow-xl rounded-2xl border border-gray-100 w-full max-w-md">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Sign in to access your dashboard and agents. <br />
                    Or <Link href="/signup" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">create a new account</Link>
                </p>
            </div>

            <form action={login} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email address</label>
                    <div className="mt-1">
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="mt-1">
                        <input
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <Button type="submit" className="w-full h-11 text-base shadow-lg hover:shadow-xl transition-all">
                    Sign in
                </Button>
            </form>
        </div>
    )
}
