import type { Currency, CurrencyCode } from '../types';

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: 'USD', name: 'Dólares US', symbol: 'US$' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€' },
  PEN: { code: 'PEN', name: 'Soles', symbol: 'S/.' },
  CNY: { code: 'CNY', name: 'Yuanes', symbol: '¥' },
};

export const CURRENCY_LIST: CurrencyCode[] = ['USD', 'EUR', 'PEN', 'CNY'];

export const MATRIX_PERMISSIONS: Record<CurrencyCode, CurrencyCode[]> = {
  USD: ['EUR', 'PEN'],
  EUR: ['USD', 'PEN', 'CNY'],
  PEN: ['USD', 'EUR', 'CNY'],
  CNY: ['EUR', 'PEN'],
};

export const isConversionAllowed = (from: CurrencyCode, to: CurrencyCode): boolean => {
  if (from === to) return false;
  return MATRIX_PERMISSIONS[from]?.includes(to) ?? false;
};

export const getAllowedCurrencies = (from: CurrencyCode): CurrencyCode[] => {
  return MATRIX_PERMISSIONS[from] ?? [];
};
