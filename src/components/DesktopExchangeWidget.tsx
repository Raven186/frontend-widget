import React from "react";
import { useCurrencies } from "../hooks/useCurrencies";
import { useExchangeCalculator } from "../hooks/useExchangeCalculator";

const DesktopExchangeWidget: React.FC = () => {
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
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        {/* Заголовок */}
        <h1 className="text-3xl font-bold text-gray-800">Crypto Exchange</h1>
        <p className="text-gray-500 mb-8">Exchange fast and easy</p>

        {/* Основная форма */}
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Ввод суммы и выбор валюты */}
          <div className="col-span-5 flex items-center">
            <input
              type="number"
              value={amount || ""}
              onChange={handleAmountChange}
              placeholder="Amount"
              className={`flex-1 p-3 border ${
                exchangeError ? "border-red-500" : "border-gray-300"
              } rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={!!exchangeError}
            />
            <select
              value={fromCurrency?.value || ""}
              onChange={(e) =>
                setFromCurrency(
                  currencies.find((cur) => cur.value === e.target.value) || null
                )
              }
              className="w-28 p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">From</option>
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>

          {/* Стрелка */}
          <div className="col-span-2 text-center text-2xl text-gray-500">⇄</div>

          {/* Вывод суммы и выбор валюты */}
          <div className="col-span-5 flex items-center">
            <input
              type="text"
              value={estimatedAmount || ""}
              placeholder="Estimated Amount"
              disabled
              className={`flex-1 p-3 border ${
                exchangeError ? "border-red-500" : "border-gray-300"
              } rounded-l-md bg-gray-100 text-gray-600 cursor-not-allowed`}
            />
            <select
              value={toCurrency?.value || ""}
              onChange={(e) =>
                setToCurrency(
                  currencies.find((cur) => cur.value === e.target.value) || null
                )
              }
              className="w-28 p-3 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">To</option>
              {currencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Поле для адреса и кнопка */}
        <div className="mt-6 grid grid-cols-12 gap-4 items-center">
          <input
            type="text"
            placeholder="Your Ethereum address"
            className="col-span-9 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!!exchangeError}
          />
          <button
            className={`col-span-3 py-3 text-white font-semibold rounded-md ${
              exchangeError
                ? "bg-red-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } transition`}
            disabled={!!exchangeError}
          >
            {exchangeError ? "Unavailable" : "Exchange"}
          </button>
        </div>

        {/* Сообщение об ошибке */}
        {(currencyError || exchangeError) && (
          <p className="text-red-500 text-center mt-4">
            {currencyError || exchangeError}
          </p>
        )}
      </div>
    </div>
  );
};

export default DesktopExchangeWidget;
