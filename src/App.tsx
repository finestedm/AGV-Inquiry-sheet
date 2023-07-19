import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from './components/Form';
import TopBar from './components/AppBar';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configure i18next
i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    fallbackLng: 'en', // Fallback to English if the user's language is not supported
    debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false, // React already escapes string, so no need to escape again
    },
  });

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
    <I18nextProvider i18n={i18n}>
    <div className="App">
      <TopBar formData={formData} setFormData={setFormData}/>
      <Form formData={formData} setFormData={setFormData} />
    </div>
    </I18nextProvider>
  );
}

export default App;
