import type { CurrencyCode } from '../types';
import { CURRENCIES, getAllowedCurrencies } from '../constants/currencies';
import './CurrencyInput.css';

interface CurrencyInputProps {
  value: number;
  currency: CurrencyCode;
  onValueChange: (value: number) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  otherCurrency: CurrencyCode;
  label?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  currency,
  onValueChange,
  onCurrencyChange,
  otherCurrency,
  label,
}) => {
  const availableCurrencies = getAllowedCurrencies(otherCurrency);

  return (
    <div className="currency-input-container">
      {label && <label className="currency-input-label">{label}</label>}
      <div className="currency-input-wrapper">
        <input
          type="number"
          className="currency-input"
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value) || 0)}
          min="0"
          step="0.01"
        />
        <select
          className="currency-select"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
        >
          {availableCurrencies.map((c) => (
            <option key={c} value={c}>
              {CURRENCIES[c].symbol} - {CURRENCIES[c].name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
