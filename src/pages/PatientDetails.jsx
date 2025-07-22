import React from 'react';
import { useParams } from 'react-router-dom';
import LabResultsTable from '../components/LabResultsTable';
import { patients } from '../utils/dummyPatients';
import { formatAge } from '../utils/formatAge';

export default function PatientDetails() {
  const { id } = useParams();
  const patient = patients.find((p) => p.id.toString() === id);

  const labData = patient.labResults || {};

  // داینامیک ساختن تعداد روزها
  const maxDays = Math.max(...Object.values(labData).map(arr => arr.length));
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">{patient.name} - {formatAge(patient.age)} </h1>
      <LabResultsTable data={labData} days={days} />
    </div>
  );
}
