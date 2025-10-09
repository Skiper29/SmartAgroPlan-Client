import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line,
} from 'recharts';
import { type IrrigationForecast } from '@/models/irrigation/recommendation.model';
import { useTheme } from '@/app/providers/ThemeContext';

interface ForecastChartProps {
  forecast: IrrigationForecast[];
}

// Кастомний тултіп для гарного відображення даних при наведенні
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm">
        <p className="mb-2 font-semibold">{label}</p>
        <div className="space-y-1 text-sm">
          <p className="flex items-center">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
            Опади: {data.expectedPrecipitation.toFixed(1)} мм
          </p>
          <p className="flex items-center">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500"></span>
            ETc (втрати): {data.eTc.toFixed(2)} мм
          </p>
          <p className="flex items-center text-muted-foreground">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gray-400"></span>
            ET0 (базові): {data.eT0.toFixed(2)} мм
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  const { theme } = useTheme();

  const chartData = forecast.map((item) => ({
    // FIX 1: Use a unique name for the formatted date
    formattedDate: new Date(item.date).toLocaleDateString('uk-UA', {
      weekday: 'short',
      day: 'numeric',
    }),
    ...item,
  }));

  const tickColor = theme === 'dark' ? '#a1a1aa' : '#71717a'; // zinc-400 : zinc-500

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          // FIX 2: Increase the left margin to make space for the Y-axis label
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          {/* FIX 1: Use the new dataKey */}
          <XAxis
            dataKey="formattedDate"
            tick={{ fill: tickColor, fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke={tickColor}
            tick={{ fill: tickColor, fontSize: 12 }}
            label={{
              value: 'мм',
              angle: -90,
              position: 'insideLeft',
              fill: tickColor,
              offset: -10, // Adjust offset to prevent overlap
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar
            yAxisId="left"
            dataKey="expectedPrecipitation"
            name="Очікувані опади"
            fill="#3b82f6" // blue-500
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="eTc"
            name="Втрати вологи (ETc)"
            stroke="#f97316" // orange-500
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="eT0"
            name="Базові втрати (ET0)"
            stroke="#9ca3af" // gray-400
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
