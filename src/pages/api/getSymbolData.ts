import type { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({ error: "Symbol is required and must be a string." });
  }

  try {
    const data = await yahooFinance.quote(symbol);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Yahoo Finance data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
}
