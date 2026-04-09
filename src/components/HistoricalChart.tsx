import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ExchangeRateData } from '../types';
import { format, parseISO } from 'date-fns';
import './HistoricalChart.css';

interface HistoricalChartProps {
  data: ExchangeRateData[];
  fromCurrency: string;
  toCurrency: string;
}

export const HistoricalChart: React.FC<HistoricalChartProps> = ({
  data,
  fromCurrency,
  toCurrency,
}) => {
  const chartData = data.map((item) => ({
    date: format(parseISO(item.date), 'dd.MM'),
    exchangeRate: item.exchangeRate,
  }));

  return (
    <div className="historical-chart-container">
      <h3 className="chart-title">
        {fromCurrency} → {toCurrency}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fontFamily: 'Arial' }}
            stroke="#555555"
          />
          <YAxis 
            tick={{ fontSize: 12, fontFamily: 'Arial' }}
            stroke="#555555"
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{
              fontFamily: 'Arial',
              border: '1px solid #cccccc',
              borderRadius: '4px',
            }}
          />
          <Line
            type="monotone"
            dataKey="exchangeRate"
            stroke="#0099ff"
            strokeWidth={2}
            dot={{ fill: '#0099ff', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
