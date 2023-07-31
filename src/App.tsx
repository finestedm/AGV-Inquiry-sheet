import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from './components/Form';
import TopBar from './components/AppBar';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './features/multilanguage/pl.json'
import en from './features/multilanguage/en.json'
import theme from './theme';
import { ThemeProvider } from '@mui/material';

// Configure i18next
i18n
  .use(LanguageDetector)
  .init({
    resources: {
      pl: { translation: pl },
      en: { translation: en },
    },
    fallbackLng: 'en', // Fallback to English if the user's language is not supported
    // debug: true, // Enable debug mode for development
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
  name: string;
  sapNumber: number | null;
  industryName: string[];
  address: string;
  contactPerson: string;
  contactPersonRole: string;
  contactPersonPhone: string;
  contactPersonMail: string;
  relations: string;
  salesHistoryValue: number | undefined;
  ownedForklifts: number | undefined;
  ownedRacks: number | undefined;
  ownedOther: string;
  creditManagement: number | undefined;
}

interface IProject {
  goals: string;
  supplyChainParts: string[];
  tender: boolean;
  investmentLocation: string;
  investmentType: string;
  consultingCompany: boolean;
  competitor: boolean;
  milestones: IMilestones
}

interface Iasrs {
  selected: boolean;
  workTime: {
    workDays: number;
    shiftsPerDay: number;
    hoursPerShift: number;
  }
  workConditions: {
    temperature: number;
    humidity: number;
    freezer: boolean;
    EX: boolean;
    dangerousMaterials: boolean;
    other: string;
  },
  building: {
    new: boolean;
    silo: boolean;
    existingBuilding: {
      height: number;
      width: number;
      length: number;
    }
  }
}

interface ISystem {
  asrs: Iasrs;
  lrkprk: Iasrs;
  agv: Iasrs;
  autovna: Iasrs;
  [key: string]: Iasrs; // Add an index signature
}

export interface IFormData {
  version: string;
  sales: ISales;
  customer: ICustomer;
  project: IProject;
  system: ISystem;

}

export interface IMilestones {
  concept: Date;
  officialOffer: Date;
  order: Date;
  implementationStart: Date;
  launch: Date;
  [key: string]: Date; // Index signature
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
      name: '',
      sapNumber: null,
      industryName: [],
      address: '',
      contactPerson: '',
      contactPersonRole: '',
      contactPersonPhone: '',
      contactPersonMail: '',
      relations: '',
      salesHistoryValue: undefined,
      ownedForklifts: undefined,
      ownedRacks: undefined,
      ownedOther: '',
      creditManagement: undefined,
    },
    project: {
      goals: '',
      supplyChainParts: [],
      tender: false,
      investmentLocation: '',
      investmentType: '',
      consultingCompany: false,
      competitor: false,
      milestones: {
        concept: (() => {
          const currentDate = new Date();
          const threeMonthsLater = new Date(currentDate);
          threeMonthsLater.setMonth(currentDate.getMonth() + 1);
          return threeMonthsLater;
        })(),
        officialOffer: (() => {
          const currentDate = new Date();
          const threeMonthsLater = new Date(currentDate);
          threeMonthsLater.setMonth(currentDate.getMonth() + 3);
          return threeMonthsLater;
        })(),
        order: new Date(),
        implementationStart: new Date(),
        launch: new Date(),
      }
    },
    system: {
      asrs: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: 0,
          humidity: 0,
          freezer: false,
          EX: false,
          dangerousMaterials: false,
          other: '',
        },
        building: {
          new: false,
          silo: false,
          existingBuilding: {
            height: 0,
            width: 0,
            length: 0,
          }
        }
      },
      lrkprk: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: 0,
          humidity: 0,
          freezer: false,
          EX: false,
          dangerousMaterials: false,
          other: '',
        },
        building: {
          new: false,
          silo: false,
          existingBuilding: {
            height: 0,
            width: 0,
            length: 0,
          }
        }
      },
      agv: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: 0,
          humidity: 0,
          freezer: false,
          EX: false,
          dangerousMaterials: false,
          other: '',
        },
        building: {
          new: false,
          silo: false,
          existingBuilding: {
            height: 0,
            width: 0,
            length: 0,
          }
        }
      },
      autovna: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: 0,
          humidity: 0,
          freezer: false,
          EX: false,
          dangerousMaterials: false,
          other: '',
        },
        building: {
          new: false,
          silo: false,
          existingBuilding: {
            height: 0,
            width: 0,
            length: 0,
          }
        }
      },
    },
  })

  return [formData, setFormData];
}

function App() {
  const [formData, setFormData] = useInitialFormData();

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <TopBar formData={formData} setFormData={setFormData} />
          <Form formData={formData} setFormData={setFormData} />
        </div>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
