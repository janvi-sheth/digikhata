"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { UploadCloud, CheckCircle, AlertCircle, Loader2, Sparkles, UserCircle, Coffee, ShoppingBag, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Transaction } from "@/lib/analyze";

const LOADING_STATES = [
  "Analyzing behavioural patterns...",
  "Detecting emotional spending triggers...",
  "Comparing pricing intelligence from Anakin...",
  "Generating predictive intervention..."
];

export default function UploadPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState(LOADING_STATES[0]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedData: Transaction[] = (results.data as Record<string, unknown>[]).map((row) => {
            const rawAmount = row.Amount || row.amount || row.Credit || row.Debit || row["Transaction Amount"];
            const amount = parseFloat(String(rawAmount).replace(/[^0-9.-]+/g, ""));
            const merchant = row.Merchant || row.merchant || row.Description || row.description || "Unknown";
            const timestamp = row.Timestamp || row.timestamp || row.Date || row.date || new Date().toISOString().split("T")[0];
            const isDebit = amount < 0 || row.Debit;
            return {
              amount: Math.abs(amount) || 0,
              merchant: String(merchant).trim(),
              timestamp: String(timestamp).trim(),
              type: (isDebit ? "debit" : "credit") as "credit" | "debit"
            };
          }).filter(t => t.amount > 0);
          setTransactions(parsedData);
          handleAnalyze(parsedData);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : "Failed to parse the file.");
        }
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "text/csv": [".csv"] }, maxFiles: 1 });

  const handleAnalyze = async (dataToAnalyze: Transaction[]) => {
    setIsAnalyzing(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if(step < LOADING_STATES.length) setLoadingText(LOADING_STATES[step]);
    }, 800);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transactions: dataToAnalyze })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      sessionStorage.setItem("digikhata_analysis", JSON.stringify(data.analysis));
      clearInterval(interval);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsAnalyzing(false);
      clearInterval(interval);
    }
  };

  const loadPersona = (type: "salary" | "latenight" | "weekend") => {
    const mock: Transaction[] = [];
    const now = new Date();
    
    if (type === "latenight") {
      for(let i=0; i<15; i++) {
        const d = new Date(now.getTime() - Math.random() * 10 * 86400000);
        d.setHours(23 + Math.random() * 3); // late night
        mock.push({ amount: 400 + Math.random()*500, merchant: ["Swiggy", "Zomato", "Blinkit"][i%3], timestamp: d.toISOString(), type: "debit" });
      }
    } else if (type === "weekend") {
      for(let i=0; i<10; i++) {
        const d = new Date(now.getTime() - Math.random() * 14 * 86400000);
        d.setDate(d.getDate() + (6 - d.getDay())); // force weekend
        mock.push({ amount: 2000 + Math.random()*3000, merchant: ["Zara", "Myntra", "Amazon", "BookMyShow"][i%4], timestamp: d.toISOString(), type: "debit" });
      }
    } else {
      mock.push({ amount: 45000, merchant: "Salary Credit", timestamp: new Date(now.getTime() - 2*86400000).toISOString(), type: "credit" });
      for(let i=0; i<8; i++) {
        const d = new Date(now.getTime() - Math.random() * 2 * 86400000);
        mock.push({ amount: 1500 + Math.random()*2000, merchant: ["Apple", "Amazon", "Nike"][i%3], timestamp: d.toISOString(), type: "debit" });
      }
    }
    
    setTransactions(mock);
    handleAnalyze(mock);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 p-6 md:p-12 font-sans relative overflow-hidden flex flex-col items-center justify-center">
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-md flex flex-col items-center justify-center">
            <div className="w-32 h-32 relative mb-8">
              <div className="absolute inset-0 border-4 border-brand-purple/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-pink border-t-transparent rounded-full animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
            </div>
            <motion.h2 key={loadingText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {loadingText}
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl w-full relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Intelligence Ingestion</h1>
          <p className="text-slate-400 text-lg">Load a dataset to generate a behavioural profile.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => loadPersona("latenight")} className="glass-panel p-6 rounded-2xl text-left hover:border-brand-purple/50 transition-all group">
            <Clock className="w-8 h-8 text-brand-purple mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Late-Night Loop</h3>
            <p className="text-sm text-slate-400">High frequency post-10PM food delivery and impulse spending.</p>
          </button>
          
          <button onClick={() => loadPersona("weekend")} className="glass-panel p-6 rounded-2xl text-left hover:border-brand-pink/50 transition-all group">
            <ShoppingBag className="w-8 h-8 text-brand-pink mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Weekend Splurge</h3>
            <p className="text-sm text-slate-400">Massive spending spikes on Saturday/Sunday retail therapy.</p>
          </button>

          <button onClick={() => loadPersona("salary")} className="glass-panel p-6 rounded-2xl text-left hover:border-emerald-500/50 transition-all group">
            <Coffee className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-lg mb-1">Payday Millionaire</h3>
            <p className="text-sm text-slate-400">Immediate heavy spending right after salary credit.</p>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-slate-500 uppercase tracking-widest">OR</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        <div {...getRootProps()} className="glass-panel border-2 border-dashed border-white/10 rounded-3xl p-12 text-center cursor-pointer hover:border-brand-purple/50 transition-all">
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-lg font-medium">Upload custom CSV statement</p>
        </div>
      </div>
    </div>
  );
}
