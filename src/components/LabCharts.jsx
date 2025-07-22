import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function LabCharts({ data }) {
  const tests = Object.keys(data);
  const maxLength = Math.max(...tests.map(t => data[t]?.length || 0));

  const chartData = Array.from({ length: maxLength }, (_, i) => {
    const entry = { day: `روز ${i + 1}` };
    tests.forEach(test => {
      const val = parseFloat(data[test]?.[i]);
      entry[test] = isNaN(val) ? null : val;
    });
    return entry;
  });

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4 text-center">نمودار مقایسه‌ای آزمایش‌ها</h2>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] mx-auto" style={{ width: `${maxLength * 80}px` }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {tests.map((test, index) => (
                <Line
                  key={test}
                  type="monotone"
                  dataKey={test}
                  stroke={`hsl(${index * 45}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
