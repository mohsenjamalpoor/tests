import React, { useState } from 'react';
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

export default function LabCharts({ data, allTests }) {
  const [selectedTests, setSelectedTests] = useState(['WBC', 'Hb', 'CRP']);

  const maxLength = Math.max(...allTests.map(t => data[t]?.length || 0));

  const chartData = Array.from({ length: maxLength }, (_, i) => {
    const entry = { day: `روز ${i + 1}` };
    selectedTests.forEach(test => {
      const val = parseFloat(data[test]?.[i]);
      entry[test] = isNaN(val) ? null : val;
    });
    return entry;
  });

  const toggleTest = (test) => {
    setSelectedTests(prev =>
      prev.includes(test)
        ? prev.filter(t => t !== test)
        : [...prev, test]
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4 text-center">نمودار مقایسه‌ای آزمایش‌ها</h2>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {allTests.map(test => (
          <label key={test} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedTests.includes(test)}
              onChange={() => toggleTest(test)}
              className="accent-blue-600"
            />
            <span className="text-sm">{test}</span>
          </label>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] mx-auto" style={{ width: `${maxLength * 80}px` }}>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedTests.map((test, index) => (
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
