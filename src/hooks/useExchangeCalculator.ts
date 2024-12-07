import { useState, useEffect } from "react";
import {
  fetchMinimalExchangeAmount,
  fetchEstimatedExchangeAmount,
} from "../api/exchangeApi";

export const useExchangeCalculator = () => {
  const [fromCurrency, setFromCurrency] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [toCurrency, setToCurrency] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [minAmount, setMinAmount] = useState<number | null>(null);
  const [estimatedAmount, setEstimatedAmount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Обновляем минимальную сумму при изменении валюты
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fetchMin = async () => {
        try {
          const data = await fetchMinimalExchangeAmount(
            fromCurrency.value,
            toCurrency.value
          );
          if (data.minAmount === null) {
            setError("This pair is temporarily unavailable.");
            setMinAmount(null);
            setEstimatedAmount(null);
          } else {
            setMinAmount(data.minAmount);
            setError(null);
          }
        } catch {
          setError("Failed to fetch minimum exchange amount.");
        }
      };
      fetchMin();
    } else {
      setError("Please select both currencies.");
    }
  }, [fromCurrency, toCurrency]);

  // Рассчитываем ожидаемую сумму при изменении валют или суммы
  useEffect(() => {
    if (fromCurrency && toCurrency && amount > 0) {
      const fetchEstimate = async () => {
        try {
          const data = await fetchEstimatedExchangeAmount(
            fromCurrency.value,
            toCurrency.value,
            amount
          );
          if (data.estimatedAmount === null) {
            setError("This pair is temporarily unavailable.");
            setEstimatedAmount(null);
          } else {
            setEstimatedAmount(data.estimatedAmount);
            setError(null);
          }
        } catch {
          setError("Failed to fetch estimated exchange amount.");
        }
      };
      fetchEstimate();
    } else if (amount === 0) {
      setEstimatedAmount(null);
    }
  }, [fromCurrency, toCurrency, amount]);

  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    minAmount,
    estimatedAmount,
    error,
  };
};
