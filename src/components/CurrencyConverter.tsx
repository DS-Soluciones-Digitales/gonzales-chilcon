import { useState } from 'react';
import { CurrencyInput } from './CurrencyInput';
import { HistoricalChart } from './HistoricalChart';
import { BackendConfig } from './BackendConfig';
import { useExchangeRate } from '../hooks/useExchangeRate';
import { CURRENCIES } from '../constants/currencies';
import { format } from 'date-fns';
import './CurrencyConverter.css';

export const CurrencyConverter: React.FC = () => {
  const {
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    exchangeRates,
    server,
    isLoading,
    error,
    setFromCurrency,
    setToCurrency,
    setAmount,
    setConvertedAmount,
  } = useExchangeRate();

  const [backendUrl, setBackendUrl] = useState<string>('http://localhost:3000');

  const line1 = `${amount} ${CURRENCIES[fromCurrency].name} (${CURRENCIES[fromCurrency].symbol}) equivale a`;
  const line2 = `${convertedAmount} ${CURRENCIES[toCurrency].name} (${CURRENCIES[toCurrency].symbol})`;
  const line3 = `${format(new Date(), 'dd.MM.yyyy HH:mm')} - Obtenido de ${server}`;

  const handleFromCurrencyChange = (currency: any) => {
    setFromCurrency(currency);
  };

  const handleToCurrencyChange = (currency: any) => {
    setToCurrency(currency);
  };

  return (
    <div className="currency-converter">
      <BackendConfig backendUrl={backendUrl} onBackendUrlChange={setBackendUrl} />
      
      <div className="converter-main">
        <div className="converter-left">
          <div className="conversion-display">
            <p className="line-1">{line1}</p>
            <p className="line-2">{line2}</p>
            <p className="line-3">{line3}</p>
          </div>

          <div className="input-controls">
            <CurrencyInput
              value={amount}
              currency={fromCurrency}
              onValueChange={setAmount}
              onCurrencyChange={handleFromCurrencyChange}
              otherCurrency={toCurrency}
              label="Moneda Origen"
            />
            <CurrencyInput
              value={convertedAmount}
              currency={toCurrency}
              onValueChange={setConvertedAmount}
              onCurrencyChange={handleToCurrencyChange}
              otherCurrency={fromCurrency}
              label="Moneda Destino"
            />
          </div>
        </div>

        <div className="converter-right">
          {isLoading ? (
            <div className="chart-loading">Cargando...</div>
          ) : error ? (
            <div className="chart-error">{error}</div>
          ) : exchangeRates.length > 0 ? (
            <HistoricalChart
              data={exchangeRates}
              fromCurrency={CURRENCIES[fromCurrency].symbol}
              toCurrency={CURRENCIES[toCurrency].symbol}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
