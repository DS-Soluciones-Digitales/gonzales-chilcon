import type { CurrencyCode, ExchangeRateResponse, ExchangeRateData } from '../types';
import { subDays } from 'date-fns';

const BASE_RATES: Record<string, Record<string, number>> = {
  USD: { EUR: 0.92, PEN: 3.75, CNY: 7.25 },
  EUR: { USD: 1.09, PEN: 4.08, CNY: 7.89 },
  PEN: { USD: 0.27, EUR: 0.25, CNY: 1.93 },
  CNY: { USD: 0.14, EUR: 0.13, PEN: 0.52 },
};

const generateHistoricalRates = (from: CurrencyCode, to: CurrencyCode): ExchangeRateData[] => {
  const today = new Date();
  const rates: ExchangeRateData[] = [];
  const baseRate = BASE_RATES[from]?.[to] ?? 1;

  for (let i = 4; i >= 0; i--) {
    const date = subDays(today, i);
    const variation = (Math.random() - 0.5) * 0.05 * baseRate;
    rates.push({
      date: date.toISOString(),
      exchangeRate: Number((baseRate + variation).toFixed(4)),
    });
  }

  return rates;
};

export const getExchangeRate = async (
  from: CurrencyCode,
  to: CurrencyCode,
  _dateFrom?: string
): Promise<ExchangeRateResponse> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (from === to) {
    return {
      from,
      to,
      server: 'servidor propio',
      exchangeRates: [{ date: new Date().toISOString(), exchangeRate: 1 }],
    };
  }

  return {
    from,
    to,
    server: 'servidor propio',
    exchangeRates: generateHistoricalRates(from, to),
  };
};

export const getLatestRate = async (
  from: CurrencyCode,
  to: CurrencyCode
): Promise<number> => {
  const response = await getExchangeRate(from, to);
  const lastRate = response.exchangeRates[response.exchangeRates.length - 1];
  return lastRate.exchangeRate;
};

export const convertAmount = (
  amount: number,
  rate: number
): number => {
  return Number((amount * rate).toFixed(4));
};
