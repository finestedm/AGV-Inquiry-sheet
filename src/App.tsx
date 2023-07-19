import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from './components/Form';
import TopBar from './components/AppBar';

interface ISales {
  salesUnit: string;
  contactPerson: string;
  contactPersonRole: string;
}

interface ICustomer {
  company: string;
  sapNumber: number | null;
  industryName: string[];
  address: string;
  contactPerson: string;
  contactPersonRole: string;
  contactPersonPhone: string;
  contactPersonMail: string;
}

interface ISystem {
  asrs: boolean;
  'lrk&prk': boolean;
  agv: boolean;
  autovna: boolean;
  [key: string]: boolean; // Add an index signature
}

export interface IFormData {
  version: string;
  sales: ISales;
  customer: ICustomer;
  system: ISystem;
}

export interface IFormProps {
  formData: IFormData;
  setFormData: Dispatch<SetStateAction<IFormData>>;
}

function useInitialFormData(): [IFormData, Dispatch<SetStateAction<IFormData>>] {
  const [formData, setFormData] = useState<IFormData>({
    version: '230719beta',
    sales: {
      salesUnit: 'S1-PL',
      contactPerson: '',
      contactPersonRole: '',
    },
    customer: {
      company: '',
      sapNumber: null,
      industryName: [],
      address: '',
      contactPerson: '',
      contactPersonRole: '',
      contactPersonPhone: '',
      contactPersonMail: '',
    },
    system: {
      asrs: false,
      'lrk&prk': false,
      agv: false,
      autovna: false
    },
  });

  return [formData, setFormData];
}

function App() {
  const [formData, setFormData] = useInitialFormData();

  return (
    <div className="App">
      <TopBar formData={formData} setFormData={setFormData}/>
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default App;
