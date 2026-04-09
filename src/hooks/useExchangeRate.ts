import { useState, useEffect, useCallback } from 'react';
import type { CurrencyCode, ExchangeRateResponse, ExchangeRateData } from '../types';
import { getExchangeRate } from '../services/exchangeApi';
import { isConversionAllowed } from '../constants/currencies';

interface UseExchangeRateReturn {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  amount: number;
  convertedAmount: number;
  exchangeRates: ExchangeRateData[];
  server: string;
  isLoading: boolean;
  error: string | null;
  setFromCurrency: (currency: CurrencyCode) => void;
  setToCurrency: (currency: CurrencyCode) => void;
  setAmount: (amount: number) => void;
  setConvertedAmount: (amount: number) => void;
}

export const useExchangeRate = (): UseExchangeRateReturn => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('EUR');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(1);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRateData[]>([]);
  const [server, setServer] = useState<string>('servidor propio');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRate, setCurrentRate] = useState<number>(1);

  const fetchExchangeRate = useCallback(async () => {
    if (!isConversionAllowed(fromCurrency, toCurrency)) {
      setError('Combinación de monedas no permitida');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data: ExchangeRateResponse = await getExchangeRate(fromCurrency, toCurrency);
      setExchangeRates(data.exchangeRates);
      setServer(data.server);
      
      const latestRate = data.exchangeRates[data.exchangeRates.length - 1].exchangeRate;
      setCurrentRate(latestRate);
      setConvertedAmount(Number((amount * latestRate).toFixed(4)));
    } catch (err) {
      setError('Error al obtener el tipo de cambio');
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleSetFromCurrency = (currency: CurrencyCode) => {
    if (isConversionAllowed(currency, toCurrency)) {
      setFromCurrency(currency);
      setAmount(1);
      setConvertedAmount(1);
    }
  };

  const handleSetToCurrency = (currency: CurrencyCode) => {
    if (isConversionAllowed(fromCurrency, currency)) {
      setToCurrency(currency);
      setAmount(1);
      setConvertedAmount(1);
    }
  };

  const handleSetAmount = (value: number) => {
    setAmount(value);
    setConvertedAmount(Number((value * currentRate).toFixed(4)));
  };

  const handleSetConvertedAmount = (value: number) => {
    setConvertedAmount(value);
    setAmount(Number((value / currentRate).toFixed(4)));
  };

  return {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    exchangeRates,
    server,
    isLoading,
    error,
    setFromCurrency: handleSetFromCurrency,
    setToCurrency: handleSetToCurrency,
    setAmount: handleSetAmount,
    setConvertedAmount: handleSetConvertedAmount,
  };
};
