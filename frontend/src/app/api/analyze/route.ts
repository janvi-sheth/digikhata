import { NextResponse } from "next/server";
import { extractFinancialInsights } from "@/utils/anakin";

// Ensure the engine is running on the server
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transactions } = body;

    if (!transactions || !Array.isArray(transactions)) {
      return NextResponse.json(
        { error: "Invalid payload. 'transactions' array is required." },
        { status: 400 }
      );
    }

    // Call the Anakin utility to get an insight
    const aiInsight = await extractFinancialInsights(transactions);

    // Call local behavioural engine (which we will build in lib/analyze.ts)
    const { analyzeTransactions } = await import("@/lib/analyze");
    const analysis = analyzeTransactions(transactions);

    return NextResponse.json({
      success: true,
      analysis: {
        ...analysis,
        aiInsight // Merging AI textual insight with algorithmic analysis
      }
    });

  } catch (error) {
    console.error("Analyze API Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze transactions." },
      { status: 500 }
    );
  }
}
