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
import { IFormData, ILoad } from './features/interfaces';

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

function useInitialFormData(): [IFormData, Dispatch<SetStateAction<IFormData>>] {

  const initialLoad: ILoad = {
    name: "",
    length: 0,
    width: 0,
    height: 0,
    L2: 0,
    W2: 0,
    W3: 0,
    weightMin: 0,
    weightMax: 0,
    overhang: false,
    material: "",
    loadSide: "",
    secured: false,
  };

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
        selected: true,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: [20, 30],
          humidity: [0, 5],
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
        },
        loads: [initialLoad]
      },
      lrkprk: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: [20, 30],
          humidity: [0, 5],
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
        },
        loads: [initialLoad]
      },
      agv: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: [20, 30],
          humidity: [0, 5],
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
        },
        loads: [initialLoad]
      },
      autovna: {
        selected: false,
        workTime: {
          workDays: 0,
          shiftsPerDay: 0,
          hoursPerShift: 0,
        },
        workConditions: {
          temperature: [20, 30],
          humidity: [0, 5],
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
        },
        loads: [initialLoad]
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
