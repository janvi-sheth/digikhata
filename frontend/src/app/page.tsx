"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { 
  ArrowRight, 
  BrainCircuit, 
  TrendingUp, 
  Wallet,
  BellRing,
  LineChart,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 selection:bg-brand-purple selection:text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple opacity-[0.07] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-pink opacity-[0.05] blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-600 opacity-[0.04] blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled ? "glass-panel border-white/5 py-3" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Digi<span className="text-white/60">Khata</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</button>
            <button className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-slate-200 transition-colors">
              Get Early Access
            </button>
          </div>

          <button 
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-xl pt-24 px-6"
        >
          <nav className="flex flex-col gap-6 text-xl font-medium">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <div className="h-px bg-white/10 w-full my-2"></div>
            <button className="text-left">Log in</button>
            <button className="px-6 py-3 rounded-full bg-white text-black text-center font-semibold mt-4">
              Get Early Access
            </button>
          </nav>
        </motion.div>
      )}

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-white/10 mb-8 text-xs font-medium text-slate-300">
              <span className="flex h-2 w-2 rounded-full bg-brand-pink"></span>
              DigiKhata v1.0 is now in private beta
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
              Stop wondering where <br className="hidden md:block" />
              <span className="text-gradient">your salary disappeared.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              The AI spending coach that intercepts your impulses <i>before</i> you swipe. 
              Built for India&apos;s first-time earners to build bulletproof financial habits.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/upload" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                Upload Spending Data <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel font-semibold text-lg hover:bg-white/5 transition-all text-white">
                View Live Demo
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Animated UI Preview Showcase */}
        <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f] to-transparent pointer-events-none z-[-1]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {/* Card 1: Impulse Alert */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-red-500/10 hover:border-red-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-all"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <BellRing className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">30-Second Warning</h3>
                  <p className="text-xs text-slate-400">Intervention Layer</p>
                </div>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5">
                <p className="text-sm font-medium mb-1">⚠️ High-Risk Window</p>
                <p className="text-xs text-slate-400 mb-4">You&apos;re ordering Swiggy at 2 AM for the 3rd time this week. Cook instead and save ₹350.</p>
                <button className="w-full py-2 bg-white/10 rounded-lg text-xs font-semibold hover:bg-white/20 transition-colors">
                  Ignore & Spend
                </button>
              </div>
            </div>

            {/* Card 2: AI Prediction */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-brand-pink/10 hover:border-brand-pink/30 transition-colors md:-translate-y-8">
              <div className="absolute top-0 left-0 w-32 h-32 bg-brand-pink/10 blur-3xl rounded-full group-hover:bg-brand-pink/20 transition-all"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Behaviour Engine</h3>
                  <p className="text-xs text-slate-400">Pattern Recognition</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-xs text-slate-400">Impulse Probability</span>
                  <span className="text-sm font-bold text-brand-pink">84%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "84%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-brand-purple to-brand-pink"
                  ></motion.div>
                </div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-4">Triggers detected</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px]">Post-payday surge</span>
                  <span className="px-2 py-1 bg-white/5 rounded text-[10px]">Friday night</span>
                </div>
              </div>
            </div>

            {/* Card 3: Dashboard */}
            <div className="glass-panel p-6 rounded-3xl relative overflow-hidden group border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Weekly Pulse</h3>
                  <p className="text-xs text-slate-400">Insights Dashboard</p>
                </div>
              </div>
              <div className="bg-black/40 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Savings Streak</p>
                  <p className="text-xl font-bold flex items-center gap-2">🔥 14 Days</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Saved</p>
                  <p className="text-xl font-bold text-emerald-400">₹4,200</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the way <br className="hidden md:block"/> you actually spend.</h2>
            <p className="text-slate-400 text-lg">Traditional finance apps show you pie charts at the end of the month. We intercept your spending before it happens.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={<BrainCircuit className="w-6 h-6 text-blue-400" />}
              title="Future Spend Prediction"
              desc="Anakin, our context scraper, watches for upcoming sales, festivals, and your personal payday surges to warn you before the money burns."
            />
            <FeatureCard 
              icon={<BellRing className="w-6 h-6 text-orange-400" />}
              title="Impulse Spending Alerts"
              desc="Real-time push notifications when you're about to make a purchase that breaks your historical patterns or depletes a category budget too fast."
            />
            <FeatureCard 
              icon={<LineChart className="w-6 h-6 text-purple-400" />}
              title="Weekly Financial Coaching"
              desc="No complex dashboards. Get a 60-second summary every Sunday with exactly one action item to improve your financial health."
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="Smart Savings Nudges"
              desc="Contextual alternatives. Instead of 'Don't spend ₹500', we suggest 'Cook dinner tonight, transfer ₹500 to savings, and hit a 5-day streak'."
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-32 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto bg-gradient-to-br from-brand-purple/20 to-brand-pink/10 border border-brand-purple/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1/2 bg-brand-pink/20 blur-[100px] rounded-full pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Ready to own your <br />financial identity?</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 relative z-10">
              Join 500+ early adopters who are breaking the paycheck-to-paycheck cycle without giving up their lifestyle.
            </p>
            <button className="relative z-10 px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 active:scale-95 transition-all">
              Claim Your Spot
            </button>
          </motion.div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center">
                <Wallet className="w-3 h-3 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">DigiKhata</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm">
              The AI-powered spending coach for India&apos;s first-time earners. 
              Own your financial identity at 23, control it for 40 years.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Waitlist</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">© 2026 DigiKhata Inc. All rights reserved.</p>
          <div className="flex gap-4 text-slate-600 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="glass-panel p-8 rounded-3xl hover:bg-white/[0.04] transition-colors border border-white/5 hover:border-white/10"
    >
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
