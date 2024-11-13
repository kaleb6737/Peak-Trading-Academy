import yahooFinance from "yahoo-finance2";

// Fetch data for a specific symbol (e.g., stocks, forex, crypto)
export const getSymbolOverview = async (symbol: string) => {
  try {
    const quote = await yahooFinance.quote(symbol);
    return quote;
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    throw error;
  }
};

// Fetch historical data for a symbol
export const getHistoricalData = async (
  symbol: string,
  interval: "1d" | "1wk" | "1mo" = "1d",
  startDate: string = "2022-01-01"
) => {
  try {
    const historical = await yahooFinance.historical(symbol, {
      interval,
      period1: startDate,
    });
    return historical;
  } catch (error) {
    console.error(`Error fetching historical data for ${symbol}:`, error);
    throw error;
  }
};

// Fetch technical analysis indicators (e.g., moving averages)
export const getTechnicalData = async (symbol: string) => {
  try {
    const technical = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryDetail", "financialData", "defaultKeyStatistics"],
    });
    return technical;
  } catch (error) {
    console.error(`Error fetching technical data for ${symbol}:`, error);
    throw error;
  }
};
