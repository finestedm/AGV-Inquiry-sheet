import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps } from "../App";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import systems from './SystemCard'

export interface IHandleInputMethod {
  <K extends keyof IFormData>(
    topLevelKey: K,
    fieldPath: keyof IFormData[K],
    value: IFormData[K][keyof IFormData[K]]
  ): void;
}

export default function Form({ formData, setFormData }: IFormProps): JSX.Element {

  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState<number>(0);
  const stepLabels = [
    t('steps-sales'),
    t('steps-customer'),
    t('steps-system'),
    formData.system.asrs ? t('steps-system-asrs') : undefined,
    formData.system.lrkprk ? t('steps-system-lrkprk') : undefined,
    formData.system.agv ? t('steps-system-agv') : undefined,
    formData.system.autovna ? t('steps-system-autovna') : undefined,
  ].filter((label) => label !== undefined) as string[];

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


  const handleInputMethod: IHandleInputMethod = function (topLevelKey, fieldPath, value) {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      // Access the top-level key in the formData object
      const topLevelObject = newFormData[topLevelKey];

      // Update the field value
      topLevelObject[fieldPath] = value;

      return newFormData;
    });
  };

  if (formData) {
    return (
      <Container component='form'>
        <Stack spacing={3} sx={{ my: 5 }}>
          <FormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
          <Box>
            <Box className={fadeOut ? 'step fadeout' : 'step'}>
              {activeStep === 0 && (
                <FormSalesUnitStep handleInputMethod={handleInputMethod} formData={formData} />
              )}
              {activeStep === 1 && (
                <FormCustomerStep handleInputMethod={handleInputMethod} formData={formData} setFormData={setFormData} />
              )}
              {activeStep === 2 && (
                <FormSystemSelectorStep formData={formData} setFormData={setFormData} />
              )}
            </Box>
          </Box>
          <Box>
            <Stack direction='row'>
              {activeStep !== 0 && (
                <Button variant="contained" onClick={handleBack}>
                  {t('ui-button-back')}
                </Button>
              )}
              {activeStep < stepLabels.length - 1 && (
                <Button variant="contained" onClick={handleNext} sx={{ ml: 'auto' }}>
                  {t('ui-button-next')}
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