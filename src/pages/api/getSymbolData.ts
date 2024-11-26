import type { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

class YahooFinanceService {
  /**
   * Fetch data for a specific symbol
   * @param symbol - The symbol to fetch data for (e.g., "AAPL", "TSLA")
   * @returns Yahoo Finance quote data
   */
  async getQuote(symbol: string) {
    if (!symbol) {
      throw new Error("Symbol is required.");
    }

    try {
      const data = await yahooFinance.quote(symbol);
      return data;
    } catch (error) {
      console.error(`Error fetching quote for symbol ${symbol}:`, error);
      throw new Error("Failed to fetch data from Yahoo Finance.");
    }
  }
}

// API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Symbol is required and must be a string." });
  }

  const yahooFinanceService = new YahooFinanceService();

  try {
    const data = await yahooFinanceService.getQuote(symbol);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
