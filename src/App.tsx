import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from './components/Form';
import TopBar from './components/AppBar';

export interface IFormData {
  salesUnit: string;
  contactPerson: string;
  contactPersonRole: string;
  company: string;
  sapNumber: number;
  industryName: string[]; // Add the industryName property
  system: {
    [key: string]: boolean;
  };
}

export interface IFormProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
}

function useInitialFormData(): [IFormData, Dispatch<SetStateAction<IFormData>>] {
  const [formData, setFormData] = useState<IFormData>({
    salesUnit: 'S1-PL',
    contactPerson: '',
    contactPersonRole: '',
    company: '',
    sapNumber: 0,
    industryName: [],
    system: {
      asrs: false,
      lrkprk: false,
      agv: false,
      autovna: false
    }
  });

  return [formData, setFormData];
}

function App() {
  const [formData, setFormData] = useInitialFormData();

  return (
    <div className="App">
      <TopBar formData={formData} />
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default App;
