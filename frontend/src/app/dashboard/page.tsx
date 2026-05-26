"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from "recharts";
import { ShieldAlert, TrendingDown, BrainCircuit, Activity, Clock, AlertTriangle, Sparkles, Coins, ArrowRight, BellRing, Target, CreditCard } from "lucide-react";

import { AnalysisResult } from "@/lib/analyze";

const COLORS = ['#c77dff', '#7b2cbf', '#3a0ca3', '#4361ee', '#4cc9f0', '#ef476f'];

export default function DashboardPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const savedAnalysis = sessionStorage.getItem("digikhata_analysis");
    if (!savedAnalysis) { router.push("/upload"); return; }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnalysis(JSON.parse(savedAnalysis));
  }, [router]);

  if (!analysis) return <div className="min-h-screen bg-[#050508] text-slate-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div></div>;

  const barData = [
    { name: 'Weekday', spend: analysis.weekdaySpend },
    { name: 'Weekend', spend: analysis.weekendSpend }
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 p-6 md:p-8 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        <header className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><BrainCircuit className="text-brand-pink" /> Behavioural Intelligence</h1>
            <p className="text-slate-400 mt-1">Deep analysis of your spending psychology.</p>
          </div>
          <button onClick={() => router.push("/upload")} className="px-5 py-2 glass-panel rounded-full text-sm hover:bg-white/5 transition-colors">Load New Profile</button>
        </header>

        {/* Predictive Intervention Hero */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`p-8 rounded-3xl border relative overflow-hidden ${analysis.predictiveIntervention.riskLevel === 'High' ? 'bg-red-900/20 border-red-500/30' : 'bg-brand-purple/20 border-brand-purple/30'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full mix-blend-overlay"></div>
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${analysis.predictiveIntervention.riskLevel === 'High' ? 'text-red-400' : 'text-brand-pink'} animate-pulse`} />
                <span className="text-sm font-bold tracking-widest uppercase text-white/70">Predictive Intervention</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">{analysis.predictiveIntervention.message}</h2>
              <p className="text-xl text-slate-300">{analysis.predictiveIntervention.impact}</p>
            </div>
            <div className="shrink-0 text-center glass-panel p-6 rounded-2xl">
              <div className="text-5xl font-black mb-1">{analysis.predictiveIntervention.confidence}%</div>
              <div className="text-sm text-slate-400">AI Confidence</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Detailed Analysis Panel */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl"><div className="text-slate-400 text-sm mb-2">Total Scanned</div><div className="text-2xl font-bold">₹{analysis.totalSpent.toLocaleString('en-IN')}</div></div>
            <div className="glass-panel p-5 rounded-2xl"><div className="text-slate-400 text-sm mb-2">Peak Time</div><div className="text-2xl font-bold">{analysis.highestSpendingTime}</div></div>
            <div className="glass-panel p-5 rounded-2xl"><div className="text-slate-400 text-sm mb-2">Impulse Score</div><div className="text-2xl font-bold text-brand-pink">{analysis.impulseScore}/100</div></div>
            <div className="glass-panel p-5 rounded-2xl"><div className="text-slate-400 text-sm mb-2">Monthly Leakage</div><div className="text-2xl font-bold text-red-400">₹{analysis.subscriptionLeakage}</div></div>
          </div>

          <div className="glass-panel p-5 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-transparent flex flex-col justify-center">
            <div className="text-slate-400 text-sm mb-2 flex items-center gap-2"><Target className="w-4 h-4"/> Top Category</div>
            <div className="text-2xl font-bold">{analysis.topCategory}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/5 h-[350px]">
              <h3 className="font-semibold mb-6 flex items-center gap-2"><Activity className="text-blue-400"/> Spend Velocity</h3>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={analysis.timelineData}>
                  <defs><linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7b2cbf" stopOpacity={0.5}/><stop offset="95%" stopColor="#7b2cbf" stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="date" hide />
                  <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #333' }} />
                  <Area type="monotone" dataKey="amount" stroke="#c77dff" strokeWidth={3} fillOpacity={1} fill="url(#colorA)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-6 h-[250px]">
              <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col">
                <h3 className="font-semibold mb-4">Weekend vs Weekday</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #333' }} />
                    <Bar dataKey="spend" fill="#ef476f" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col">
                <h3 className="font-semibold mb-4">Category Burn</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={analysis.categoryBreakdown.slice(0,4)} innerRadius={40} outerRadius={60} dataKey="value" stroke="none">
                      {analysis.categoryBreakdown.map((_cat, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#0a0a0f', border: '1px solid #333' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/5">
              <h3 className="font-semibold mb-6 flex items-center gap-2"><BellRing className="text-orange-400"/> AI Insight Timeline</h3>
              <div className="space-y-4">
                {analysis.insights.map((insight: string, i: number) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 relative overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-pink"></div>
                    <p className="text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-brand-purple/30 bg-brand-purple/5">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard className="text-brand-pink"/> Anakin Intelligence</h3>
              <p className="text-sm text-slate-400 mb-4">Anakin converts messy transaction data into structured financial signals.</p>
              <div className="p-3 bg-black/40 rounded-xl text-xs font-mono text-green-400 overflow-hidden">
                {`{\n  "recurring": [${analysis.recurringMerchants.map((m: string) => `"${m}"`).join(',')}],\n  "leakage": ${analysis.subscriptionLeakage}\n}`}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5"><h3 className="font-semibold">Transaction Intelligence</h3></div>
          <div className="overflow-x-auto max-h-[400px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 sticky top-0 text-slate-400">
                <tr><th className="p-4">Merchant</th><th className="p-4">Category</th><th className="p-4">Tag</th><th className="p-4 text-right">Amount</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {analysis.transactions?.slice(0, 20).map((txn, i) => (
                  <tr key={i} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-medium">{txn.merchant}</td>
                    <td className="p-4 text-slate-400">{txn.category || 'Unknown'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${txn.riskTag === 'Impulse' ? 'bg-brand-pink/20 text-brand-pink' : txn.riskTag === 'High Risk' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {txn.riskTag || 'Healthy'}
                      </span>
                    </td>
                    <td className="p-4 text-right font-medium text-white">₹{txn.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
