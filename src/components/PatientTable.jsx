import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiX } from "react-icons/fi";
import LabCharts from './LabCharts';
import { FaChartLine } from 'react-icons/fa';
import { formatAge } from '../utils/formatAge';

export default function PatientTable({ patients }) {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">لیست بیماران</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">نام</th>
            <th className="border px-4 py-2">سن</th>
            <th className="border px-4 py-2">WBC</th>
            <th className="border px-4 py-2">Hb</th>
            <th className="border px-4 py-2">CRP</th>
            <th className="border px-4 py-2">نمودار</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            const { labResults } = patient;
            const lastIndex = (labResults?.WBC?.length || 1) - 1;

            return (
              <tr key={patient.id} className="text-center hover:bg-gray-100">
                <td
                  className="border px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => navigate(`/patient/${patient.id}`)}
                >
                  {patient.name}
                </td>
                <td className="border px-4 py-2">{formatAge(patient.age)}</td>
                <td className="border px-4 py-2">{labResults?.WBC?.[lastIndex] || '-'}</td>
                <td className="border px-4 py-2">{labResults?.Hb?.[lastIndex] || '-'}</td>
                <td className="border px-4 py-2">{labResults?.CRP?.[lastIndex] || '-'}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="text-blue-500 hover:text-blue-700"
                    title="نمایش نمودار"
                  >
                     <FaChartLine size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* مودال نمایش نمودار */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[95%] max-w-4xl relative max-h-[90vh] overflow-auto">
            <button
              className="absolute top-2 left-2 text-red-600 hover:text-red-800"
              onClick={() => setSelectedPatient(null)}
              title="بستن"
            >
             <FiX size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">
              نمودار آزمایش‌ها - {selectedPatient.name}
            </h2>
            <LabCharts data={selectedPatient.labResults} />
          </div>
        </div>
      )}
    </div>
  );
}
