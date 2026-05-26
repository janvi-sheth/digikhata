/**
 * Anakin.io API Integration for DigiKhata
 * 
 * Provides utility functions to interface with Anakin's AI models and web scraping capabilities
 * to enhance the behavioural engine.
 */

const ANAKIN_API_KEY = "ask_40a91ce5a93effac68e1c88d562ae30e930cc9de0bff57015094f3dd044c80e7";
// Assuming a general chat/completion endpoint for Anakin API
const ANAKIN_BASE_URL = "https://api.anakin.ai/v1";

interface AnakinResponse {
  choices?: Array<{
    message?: {
      content: string;
    };
  }>;
  error?: {
    message: string;
  };
}

/**
 * Generic fetch wrapper for Anakin API
 */
async function fetchFromAnakin(prompt: string, systemPrompt?: string): Promise<string> {
  try {
    const response = await fetch(`${ANAKIN_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ANAKIN_API_KEY}`
      },
      body: JSON.stringify({
        // Assuming model parameter as required by standard completion APIs; 
        // adjust to Anakin's specific model ID if needed
        model: "claude-3-haiku", 
        messages: [
          ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
          { role: "user", content: prompt }
        ],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Anakin API Error: ${response.status} - ${errorData?.error?.message || response.statusText}`);
    }

    const data: AnakinResponse = await response.json();
    return data.choices?.[0]?.message?.content || "";

  } catch (error) {
    console.error("Anakin Integration Error:", error);
    throw error;
  }
}

/**
 * Scrapes a website and converts the content into structured JSON
 * @param url The target URL to scrape
 * @param structure The desired JSON structure definition
 */
export async function scrapeWebsite(url: string, structure: string): Promise<Record<string, unknown> | null> {
  const prompt = `Please visit and scrape the content from the following URL: ${url}. 
Extract the relevant data and return it strictly as a valid JSON object following this structure:
${structure}

Do not include any markdown formatting or extra text, just the raw JSON.`;

  try {
    const result = await fetchFromAnakin(prompt, "You are a precise data extraction AI. You only return valid JSON.");
    
    // Attempt to parse the JSON (handling potential markdown code blocks)
    const cleanedResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedResult);
  } catch (error) {
    console.error(`Failed to scrape website: ${url}`, error);
    return null;
  }
}

/**
 * Extracts personalized financial insights based on user spending data
 * @param spendingData The user's transaction history or summary
 */
export async function extractFinancialInsights(spendingData: unknown): Promise<string> {
  const prompt = `Analyze the following user spending data for an Indian first-time earner:
${JSON.stringify(spendingData, null, 2)}

Identify their biggest "impulse" leak, calculate potential savings if they cut it by 50%, and provide exactly one actionable recommendation (under 2 sentences).`;

  try {
    const insight = await fetchFromAnakin(
      prompt, 
      "You are a Gen-Z personal finance coach. Be direct, slightly playful, and highly analytical."
    );
    return insight;
  } catch (error) {
    console.error("Failed to extract financial insights", error);
    return "We couldn't analyze your spending right now, but keeping an eye on your food delivery costs is always a safe bet.";
  }
}

/**
 * Compares current pricing trends for food delivery or e-commerce
 * @param category The category to compare (e.g., 'food delivery', 'electronics')
 */
export async function comparePricingTrends(category: string): Promise<Record<string, unknown> | null> {
  const prompt = `Search the web for the current pricing trends, active discount offers, and average platform fees for "${category}" in India right now (Swiggy vs Zomato vs Zepto etc.).
Return a JSON object comparing the platforms, noting active sales, and highlighting the cheapest option for standard orders.`;

  try {
    const result = await fetchFromAnakin(
      prompt,
      "You are a market research AI. Return only valid JSON with keys: platforms, average_fees, active_offers, and recommendation."
    );
    
    const cleanedResult = result.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedResult);
  } catch (error) {
    console.error(`Failed to compare pricing trends for: ${category}`, error);
    return null;
  }
}
