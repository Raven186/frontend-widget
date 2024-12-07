import axios from "axios";

const BASE_URL = "https://api.binance.com/api/v3";

// Получить список всех торговых пар
export const fetchCurrencies = async (): Promise<Record<string, string>> => {
  try {
    const response = await axios.get(`${BASE_URL}/exchangeInfo`);
    const currencies: Record<string, string> = {};

    response.data.symbols.forEach((symbol: any) => {
      currencies[symbol.baseAsset] = symbol.baseAsset;
      currencies[symbol.quoteAsset] = symbol.quoteAsset;
    });

    return currencies;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw new Error("Failed to load currencies");
  }
};

export const fetchMinimalExchangeAmount = async (
  fromCurrency: string,
  toCurrency: string
): Promise<{ minAmount: number | null }> => {
  try {
    const response = await axios.get(`${BASE_URL}/exchangeInfo`);
    const pair = response.data.symbols.find(
      (symbol: any) =>
        symbol.baseAsset === fromCurrency && symbol.quoteAsset === toCurrency
    );

    if (!pair) return { minAmount: null };

    const minNotionalFilter = pair.filters.find(
      (filter: any) => filter.filterType === "MIN_NOTIONAL"
    );

    return { minAmount: minNotionalFilter?.minNotional || 0.000001 };
  } catch (error) {
    console.error("Error fetching minimal exchange amount:", error);
    throw new Error("Failed to fetch minimal exchange amount");
  }
};

export const fetchEstimatedExchangeAmount = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<{ estimatedAmount: number | null }> => {
  try {
    const pair = `${fromCurrency}${toCurrency}`;
    const response = await axios.get(`${BASE_URL}/ticker/price`, {
      params: { symbol: pair },
    });

    const price = parseFloat(response.data.price);
    return { estimatedAmount: price * amount };
  } catch (error) {
    console.error("Error fetching estimated exchange amount:", error);
    return { estimatedAmount: null };
  }
};

