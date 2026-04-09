import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { CurrencyConverter } from './CurrencyConverter';

vi.mock('../hooks/useExchangeRate', () => ({
  useExchangeRate: () => ({
    fromCurrency: 'EUR',
    toCurrency: 'USD',
    amount: 1,
    convertedAmount: 1.09,
    exchangeRates: [
      { date: '2025-08-02T00:00:00.000Z', exchangeRate: 1.09 },
      { date: '2025-08-01T00:00:00.000Z', exchangeRate: 1.08 },
      { date: '2025-07-31T00:00:00.000Z', exchangeRate: 1.07 },
      { date: '2025-07-30T00:00:00.000Z', exchangeRate: 1.06 },
      { date: '2025-07-29T00:00:00.000Z', exchangeRate: 1.05 },
    ],
    server: 'servidor propio',
    isLoading: false,
    error: null,
    setFromCurrency: vi.fn(),
    setToCurrency: vi.fn(),
    setAmount: vi.fn(),
    setConvertedAmount: vi.fn(),
  }),
}));

describe('CurrencyConverter', () => {
  beforeEach(() => {
    render(<CurrencyConverter />);
  });

  it('renderiza el título principal', () => {
    expect(screen.getByText(/equivale a/)).toBeInTheDocument();
  });

  it('muestra las tres líneas de información', async () => {
    await waitFor(() => {
      expect(screen.getByText(/equivale a/)).toBeInTheDocument();
    });
    const lines = screen.getAllByText(/equivale a/);
    expect(lines.length).toBeGreaterThan(0);
  });

  it('muestra las etiquetas de origen y destino', () => {
    expect(screen.getByText(/Moneda Origen/)).toBeInTheDocument();
    expect(screen.getByText(/Moneda Destino/)).toBeInTheDocument();
  });
});