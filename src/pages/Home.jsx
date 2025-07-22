import React from 'react';
import PatientTable from '../components/PatientTable';
import { patients } from '../utils/dummyPatients';


export default function Home() {
  return <PatientTable patients={patients} />;
}

