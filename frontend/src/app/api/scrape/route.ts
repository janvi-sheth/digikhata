import { NextResponse } from "next/server";
import { scrapeWebsite } from "@/utils/anakin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
    }

    // We use the anakin scraper utility we built earlier.
    const structureDef = `{
      "transactions": [
        {
          "amount": "number (extract currency value)",
          "merchant": "string (platform or seller name)",
          "timestamp": "string (ISO date or closest approximation)",
          "category": "string (inferred category)",
          "type": "string (always 'debit' for purchases)"
        }
      ]
    }`;

    const data = await scrapeWebsite(url, structureDef);

    if (!data || !data.transactions) {
      throw new Error("Failed to extract structured transaction data from the URL.");
    }

    return NextResponse.json({
      success: true,
      transactions: data.transactions
    });

  } catch (error) {
    console.error("Scrape API Error:", error);
    return NextResponse.json(
      { error: "Failed to scrape and analyze the URL." },
      { status: 500 }
    );
  }
}
