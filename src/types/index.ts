export type CurrencyCode = 'USD' | 'EUR' | 'PEN' | 'CNY';

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
}

export interface ExchangeRateData {
  date: string;
  exchangeRate: number;
}

export interface ExchangeRateResponse {
  from: CurrencyCode;
  to: CurrencyCode;
  server: string;
  exchangeRates: ExchangeRateData[];
}

export interface CurrencyPair {
  from: CurrencyCode;
  to: CurrencyCode;
}
