export interface Transaction {
  amount: number;
  merchant: string;
  timestamp: string;
  type: "credit" | "debit";
  riskTag?: "High Risk" | "Impulse" | "Healthy" | "Subscription";
  category?: string;
}

export interface AnalysisResult {
  riskScore: number;
  impulseScore: number;
  insights: string[];
  totalSpent: number;
  projectedOverspend: number;
  categoryBreakdown: { name: string; value: number }[];
  timelineData: { date: string; amount: number }[];
  // New features
  topCategory: string;
  highestSpendingTime: string;
  impulseProbability: number;
  weekendSpend: number;
  weekdaySpend: number;
  lateNightCount: number;
  recurringMerchants: string[];
  monthlySavingsOpportunity: number;
  subscriptionLeakage: number;
  predictiveIntervention: {
    message: string;
    impact: string;
    confidence: number;
    riskLevel: "High" | "Medium" | "Low";
  };
  transactions: Transaction[];
}

const categorizeMerchant = (merchant: string): string => {
  const m = merchant.toLowerCase();
  if (m.includes("swiggy") || m.includes("zomato") || m.includes("blinkit") || m.includes("starbucks") || m.includes("mcdonalds")) return "🍔 Food & Dining";
  if (m.includes("amazon") || m.includes("flipkart") || m.includes("myntra")) return "🛍️ Shopping";
  if (m.includes("uber") || m.includes("ola") || m.includes("irctc")) return "🚗 Transport";
  if (m.includes("netflix") || m.includes("spotify") || m.includes("bookmyshow")) return "🍿 Entertainment";
  return "📦 Other";
};

export function analyzeTransactions(transactions: Transaction[]): AnalysisResult {
  const insights: string[] = [];
  let riskScore = 20;
  let impulseScore = 10;
  
  let totalSpent = 0;
  let lateNightCount = 0;
  let weekendSpend = 0;
  let weekdaySpend = 0;
  
  const categoryMap: Record<string, number> = {};
  const dateMap: Record<string, number> = {};
  const merchantCount: Record<string, number> = {};
  const hourlySpend: Record<number, number> = {};

  const debits = transactions.filter(t => t.type === "debit");

  const taggedTransactions = debits.map(txn => {
    totalSpent += txn.amount;
    const date = new Date(txn.timestamp);
    const hour = date.getHours();
    const day = date.getDay();
    const dateStr = txn.timestamp.split("T")[0];

    dateMap[dateStr] = (dateMap[dateStr] || 0) + txn.amount;
    hourlySpend[hour] = (hourlySpend[hour] || 0) + txn.amount;
    merchantCount[txn.merchant] = (merchantCount[txn.merchant] || 0) + 1;

    let tag: Transaction["riskTag"] = "Healthy";
    let isImpulse = false;

    if (hour >= 22 || hour <= 4) {
      lateNightCount++;
      impulseScore += 5;
      isImpulse = true;
      tag = "Impulse";
    }

    if (day === 0 || day === 6 || (day === 5 && hour >= 18)) {
      weekendSpend += txn.amount;
      impulseScore += 3;
      if (!isImpulse) tag = "High Risk";
    } else {
      weekdaySpend += txn.amount;
    }

    const cat = categorizeMerchant(txn.merchant);
    categoryMap[cat] = (categoryMap[cat] || 0) + txn.amount;

    if (cat === "🍿 Entertainment" || txn.merchant.toLowerCase().includes("prime")) {
      tag = "Subscription";
    }

    return { ...txn, riskTag: tag, category: cat };
  });

  if (lateNightCount >= 3) {
    insights.push(`Detected repeated post-10PM food delivery behaviour (${lateNightCount} times).`);
    riskScore += 15;
  }
  
  if (weekendSpend > weekdaySpend * 1.5) {
    insights.push(`Weekend spending spikes exceed weekday baseline by ${(weekendSpend / (weekdaySpend || 1)).toFixed(1)}x.`);
    impulseScore += 15;
  }

  const categoryBreakdown = Object.entries(categoryMap).map(([name, value]) => ({ name, value })).sort((a,b) => b.value - a.value);
  const topCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0].name : "None";

  const peakHour = Object.entries(hourlySpend).sort((a,b) => b[1] - a[1])[0]?.[0] || "12";
  const highestSpendingTime = `${peakHour}:00 - ${parseInt(peakHour)+1}:00`;

  const recurringMerchants = Object.entries(merchantCount).filter(([, count]) => count > 2).map(([m]) => m);

  const BASE_BUDGET = 15000;
  const uniqueDays = Object.keys(dateMap).length || 1;
  const dailyAverage = totalSpent / uniqueDays;
  const projectedMonth = dailyAverage * 30;
  let projectedOverspend = 0;
  
  if (projectedMonth > BASE_BUDGET) {
    projectedOverspend = Math.round(projectedMonth - BASE_BUDGET);
    riskScore += 30;
  }

  const monthlySavingsOpportunity = lateNightCount * 400 + (weekendSpend * 0.2);
  if (monthlySavingsOpportunity > 0) {
    insights.push(`Potential monthly savings opportunity: ₹${Math.round(monthlySavingsOpportunity).toLocaleString('en-IN')}`);
  }

  const subscriptionLeakage = recurringMerchants.length * 199; // Mocked leakage
  
  const predictiveIntervention = {
    message: `You are likely to overspend tonight between ${highestSpendingTime}.`,
    impact: `Skipping one impulse order tonight could save ₹${Math.round(monthlySavingsOpportunity).toLocaleString('en-IN')}/month.`,
    confidence: Math.min(98, impulseScore + 20),
    riskLevel: (riskScore > 60 ? "High" : riskScore > 30 ? "Medium" : "Low") as "High" | "Medium" | "Low"
  };

  riskScore = Math.min(100, riskScore);
  impulseScore = Math.min(100, impulseScore);

  const timelineData = Object.entries(dateMap).map(([date, amount]) => ({ date, amount })).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    riskScore,
    impulseScore,
    insights,
    totalSpent,
    projectedOverspend,
    categoryBreakdown,
    timelineData,
    topCategory,
    highestSpendingTime,
    impulseProbability: impulseScore,
    weekendSpend,
    weekdaySpend,
    lateNightCount,
    recurringMerchants,
    monthlySavingsOpportunity,
    subscriptionLeakage,
    predictiveIntervention,
    transactions: taggedTransactions
  };
}
