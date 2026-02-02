
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Bot, Zap, Shield, Globe, Cpu, Sparkles } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-white overflow-hidden selection:bg-indigo-500/30">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 md:pt-48 md:pb-32 text-center animate-fade-in-up">
        <div className="container mx-auto max-w-5xl space-y-8">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 backdrop-blur-md mb-4 hover:bg-white/10 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Marketplace Beta Live
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] md:leading-[1.1]">
            The App Store for <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
              AI Agents
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed delay-100 animate-fade-in-up">
            Discover, rent, and sell intelligent agents. Automate your entire workflow with vetted AI workers that never sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 delay-200 animate-fade-in-up">
            <Link href="/agents">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Browse Agents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 text-white transition-all">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof (Optional Placeholder) */}
      <section className="relative z-10 py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Agents", value: "500+" },
              { label: "Transactions", value: "$1M+" },
              { label: "Builders", value: "2K+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-32 delay-300 animate-fade-in-up">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Built for the future of work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to deploy enterprise-grade AI agents in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-indigo-400" />}
              title="Vetted Quality"
              description="Every agent passes a rigourous 50-point inspection before listing. Reliability guaranteed."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-emerald-400" />}
              title="Secure Sandbox"
              description="Agents run in isolated environments. Your data never leaks, and code execution is 100% safe."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-yellow-400" />}
              title="Instant Deploy"
              description="One-click rental. No configuration, no API keys. Just start using the agent immediately."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8 text-blue-400" />}
              title="Global Payments"
              description="Crypto & Fiat supported. Sellers get paid instantly in their preferred currency."
            />
            <FeatureCard
              icon={<Cpu className="h-8 w-8 text-pink-400" />}
              title="Scalable Compute"
              description="We handle the GPU infrastructure. Scale from 1 to 10,000 requests without lifting a finger."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-purple-400" />}
              title="Custom Fine-tuning"
              description="Rent base agents and fine-tune them on your specific private data securely."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 delay-500 animate-fade-in-up">
        <div className="container px-6 mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-indigo-900/20 to-black p-12 md:p-24 text-center">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to automate everything?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Join the fastest growing marketplace for synthetic labor. Start free today.
            </p>
            <Link href="/agents">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:scale-105">
                Start Browsing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  )
}
