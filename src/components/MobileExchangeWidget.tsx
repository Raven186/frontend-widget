import React from "react";
import { useCurrencies } from "../hooks/useCurrencies";
import { useExchangeCalculator } from "../hooks/useExchangeCalculator";

const MobileExchangeWidget: React.FC = () => {
  const { currencies, error: currencyError } = useCurrencies();
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    estimatedAmount,
    error: exchangeError,
  } = useExchangeCalculator();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Заголовок */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Crypto Exchange
        </h1>
        <p className="text-gray-600 text-center mb-6">Exchange fast and easy</p>

        {/* Основная форма */}
        <div className="space-y-4">
          {/* Сколько у нас есть */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={amount || ""}
              onChange={handleAmountChange}
              placeholder="Amount"
              className={`flex-1 p-3 border ${
                exchangeError ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!!exchangeError}
            />
            <select
              value={fromCurrency?.value || ""}
              onChange={(e) =>
                setFromCurrency(
                  currencies.find((cur) => cur.value === e.target.value) || null
                )
              }
              className="p-3 border border-gray-300 rounded-md w-24"
            >
              <option value="">From</option>
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {/* Сколько мы получим */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={estimatedAmount || ""}
              placeholder="Estimated Amount"
              disabled
              className={`flex-1 p-3 border ${
                exchangeError ? "border-red-500" : "border-gray-300"
              } rounded-md bg-gray-100 text-gray-600 cursor-not-allowed`}
            />
            <select
              value={toCurrency?.value || ""}
              onChange={(e) =>
                setToCurrency(
                  currencies.find((cur) => cur.value === e.target.value) || null
                )
              }
              className="p-3 border border-gray-300 rounded-md w-24"
            >
              <option value="">To</option>
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {/* Инпут для адреса кошелька */}
          <div>
            <input
              type="text"
              placeholder="Your Ethereum address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!!exchangeError}
            />
          </div>

          {/* Кнопка "Обменять" */}
          <button
            className={`w-full py-3 text-white font-semibold rounded-md ${
              exchangeError
                ? "bg-red-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
            disabled={!!exchangeError}
          >
            {exchangeError ? "Unavailable" : "Exchange"}
          </button>

          {/* Сообщение об ошибке */}
          {(currencyError || exchangeError) && (
            <p className="text-red-500 text-center text-sm mt-2">
              {currencyError || exchangeError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileExchangeWidget;
