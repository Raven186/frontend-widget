import { useState, useEffect } from "react";
import { fetchCurrencies } from "../api/exchangeApi";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<
    { value: string; label: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchCurrencies();
        setCurrencies(
          Object.keys(data).map((key) => ({
            value: key,
            label: data[key],
          }))
        );
      } catch {
        setError("Failed to load currencies");
      }
    };

    loadCurrencies();
  }, []);

  return { currencies, error };
};
