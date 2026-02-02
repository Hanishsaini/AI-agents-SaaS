
import { Button } from "@/components/ui/button"
import { createAgent } from "./actions"

export default function SellPage() {
    return (
        <div className="container mx-auto py-12 px-4 max-w-2xl min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-white">Sell Your AI Agent</h1>

            <form action={createAgent} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Agent Name</label>
                    <input name="name" required className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="e.g. Finance Wizard" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                    <select name="category" className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white">
                        <option value="Productivity">Productivity</option>
                        <option value="Finance">Finance</option>
                        <option value="Coding">Coding</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Writing">Writing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
                    <textarea name="description" required className="w-full p-3 bg-black/50 border border-white/10 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="Describe what your agent does..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Purchase Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="49.99" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Monthly Rental Price ($) <span className="text-gray-500 font-normal">(Optional)</span></label>
                        <input name="rental_price" type="number" step="0.01" className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="9.99" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Image URL</label>
                    <input name="image_url" type="url" className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="https://..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Features <span className="text-gray-500 font-normal">(Comma separated)</span></label>
                    <input name="features" className="w-full p-3 bg-black/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-600" placeholder="Auto-reply, PDF analysis, 24/7 uptime" />
                </div>

                <Button type="submit" size="lg" className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                    List Agent for Sale
                </Button>
            </form>
        </div>
    )
}
