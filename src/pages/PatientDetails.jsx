import React from 'react';
import { useParams } from 'react-router-dom';
import LabResultsTable from '../components/LabResultsTable';
import { patients } from '../utils/dummyPatients';
import { formatAge } from '../utils/formatAge';
import { fillMissingTests } from '../utils/fillMissingTests';

export default function PatientDetails() {
  const allTests = [
  'WBC', 'Hb', 'HCT', 'MCV', 'PLT', 'ESR', 'CRP', 'BUN', 'Cr', 'Na', 'K', 'Ca', 'P', 'Mg',
  'AST', 'ALT', 'Alb', 'PT/INR', 'PTT'
];

  const { id } = useParams();
  const patient = patients.find((p) => p.id.toString() === id);

 const filledLabData = fillMissingTests(patient.labResults || {}, allTests);


  // داینامیک ساختن تعداد روزها
  const maxDays = Math.max(...Object.values(filledLabData).map(arr => arr.length));
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{patient.name} - {formatAge(patient.age)} </h1>
      <LabResultsTable data={filledLabData} days={days} />
    </div>
  );
}
