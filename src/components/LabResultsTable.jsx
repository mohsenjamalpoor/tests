import React from 'react';

export default function LabResultsTable({ data, days }) {
  const tests = [
    'WBC', 'Hb', 'HCT', 'MCV', 'PLT', 'ESR', 'CRP', 'BUN', 'Cr', 'Na', 'K', 'Ca', 'P', 'Mg',
    'AST', 'ALT', 'Alb', 'PT/INR', 'PTT'
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Test \ Day</th>
            {days.map((day, index) => (
              <th key={index} className="border px-4 py-2">روز {day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test}>
              <td className="border px-4 py-2 font-bold">{test}</td>
              {days.map((day, index) => (
                <td key={index} className="border px-4 py-2">
                  <input
                    type="text"
                    defaultValue={data[test]?.[index] || ''}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}