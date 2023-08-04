import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps, ILoad } from "../App";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import systems from './SystemCard'
import FormProjectStep from "./FormProjectStep";
import FormASRSStep from "./FormASRSStep";

export interface IHandleInputMethod {
  (path: string, value: any): void;
}
export interface IHandleLoadChange {
  (index: number, field: keyof ILoad, value: string | number | boolean): void;
}

type LoadFieldValue = string | number | boolean | { min: number; max: number };

export interface IHandleAddLoad {
  (): void;
}

export default function Form({ formData, setFormData }: IFormProps): JSX.Element {

  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<number>(0);
  const stepLabels = [
    t('steps.sales'),
    t('steps.customer'),
    t('steps.project'),
    t('steps.system'),
    formData.system.asrs.selected ? t('steps.systems.asrs') : undefined,
    formData.system.lrkprk.selected ? t('steps.systems.lrkprk') : undefined,
    formData.system.agv.selected ? t('steps.systems.agv') : undefined,
    formData.system.autovna.selected ? t('steps.systems.autovna') : undefined,
  ].filter((label) => label !== undefined) as string[];

  const generateSteps = (formData: IFormData, handleInputMethod: IHandleInputMethod) => {
    const steps = [
      <FormSalesUnitStep key="sales" handleInputMethod={handleInputMethod} formData={formData} />,
      <FormCustomerStep key="customer" handleInputMethod={handleInputMethod} formData={formData} setFormData={setFormData} />,
      <FormProjectStep key="project" handleInputMethod={handleInputMethod} formData={formData} />,
      <FormSystemSelectorStep key="system" formData={formData} setFormData={setFormData} />,
    ];

    if (formData.system.asrs.selected) {
      steps.push(<FormASRSStep key="asrs" formData={formData} handleInputMethod={handleInputMethod} handleLoadChange={handleLoadChange} handleAddLoad={handleAddLoad} />);
    }
    if (formData.system.lrkprk.selected) {
      steps.push(<FormASRSStep key="lrkprk" formData={formData} handleInputMethod={handleInputMethod} handleLoadChange={handleLoadChange} handleAddLoad={handleAddLoad}/>);
    }
    if (formData.system.agv.selected) {
      steps.push(<FormASRSStep key="agv" formData={formData} handleInputMethod={handleInputMethod} handleLoadChange={handleLoadChange} handleAddLoad={handleAddLoad}/>);
    }
    if (formData.system.autovna.selected) {
      steps.push(<FormASRSStep key="autovna" formData={formData} handleInputMethod={handleInputMethod} handleLoadChange={handleLoadChange} handleAddLoad={handleAddLoad}/>);
    }

    return steps;
  };



  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const handleNext = () => {
    setFadeOut(true);
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setFadeOut(false);
    }, 500); // Adjust the delay time (in milliseconds) as needed
  };

  const handleBack = () => {
    setFadeOut(true);
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setFadeOut(false);
    }, 500); // Adjust the delay time (in milliseconds) as needed
  };

  const handleStepClick = (step: number) => {
    setFadeOut(true);
    setTimeout(() => {
      setActiveStep(step);
      setFadeOut(false);
    }, 500);
  };

  const handleInputMethod: IHandleInputMethod = function (path, value) {
    setFormData((prevFormData) => {
      const newFormData: IFormData = { ...prevFormData };
      const keys = path.split('.');
      let currentObject: any = newFormData;

      // Iterate through nested keys to access the nested property
      for (let i = 0; i < keys.length - 1; i++) {
        if (currentObject[keys[i]] === undefined) {
          // Create empty objects if they don't exist in the nested structure
          currentObject[keys[i]] = {};
        }
        currentObject = currentObject[keys[i]];
      }

      // Update the value of the nested property
      currentObject[keys[keys.length - 1]] = value;

      return newFormData;
    });
  };

  const handleLoadChange = (index: number, field: keyof ILoad, value: LoadFieldValue) => {
    setFormData((prevFormData) => {
      const newFormData: IFormData = { ...prevFormData };
      newFormData.system.asrs.loads[index][field] = value as never;
      return newFormData;
    });
  };

  const handleAddLoad = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      system: {
        ...prevFormData.system,
        asrs: {
          ...prevFormData.system.asrs,
          loads: [
            ...prevFormData.system.asrs.loads,
            {
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
            },
          ],
        },
      },
    }));
  };



  const steps = generateSteps(formData, handleInputMethod);

  if (formData) {
    return (
      <Container component='form'>
        <Stack spacing={6} sx={{ mb: 10 }}>
          <Box>
            <FormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
          </Box>
          <Box>
            <Box className={fadeOut ? 'step fadeout' : 'step'}>
              {activeStep >= 0 && activeStep < steps.length && steps[activeStep]}
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Stack direction='row'>
              {activeStep !== 0 && (
                <Button variant="contained" onClick={handleBack}>
                  {t('ui.button.back')}
                </Button>
              )}
              {activeStep < stepLabels.length - 1 && (
                <Button variant="contained" onClick={handleNext} sx={{ ml: 'auto' }}>
                  {t('ui.button.next')}
                </Button>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container >
    );
  } else {
    return (<h2>hmm</h2>)
  }
}