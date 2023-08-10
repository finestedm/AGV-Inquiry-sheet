import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import FormProjectStep from "./FormProjectStep";
import FormASRSStep from "./FormASRSStep";
import { IFormData } from "../features/interfaces";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../features/redux/store";
import ScrollButton from "./MobileScrollButton";

export default function Form(): JSX.Element {

  const { t } = useTranslation();

  const formData = useSelector((state: RootState) => state.formData);

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

  const generateSteps = (formData: IFormData) => {

    const steps = [
      <FormSalesUnitStep key="sales" />,
      <FormCustomerStep key="customer" />,
      <FormProjectStep key="project" />,
      <FormSystemSelectorStep key="system" />,
    ];

    if (formData.system.asrs.selected) {
      steps.push(<FormASRSStep key="asrs" />);
    }
    if (formData.system.lrkprk.selected) {
      steps.push(<FormASRSStep key="lrkprk" />);
    }
    if (formData.system.agv.selected) {
      steps.push(<FormASRSStep key="agv" />);
    }
    if (formData.system.autovna.selected) {
      steps.push(<FormASRSStep key="autovna" />);
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


  const steps = generateSteps(formData);

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
        <ScrollButton />
      </Container >
    );
  } else {
    return (<h2>hmm</h2>)
  }
}