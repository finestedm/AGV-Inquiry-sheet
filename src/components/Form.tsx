import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import FormProjectStep from "./FormProjectStep";
import FormASRSStep from "./FormASRSStep";
import { IFormData } from "../features/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from "../features/redux/store";
import ScrollButton from "./MobileScrollButton";
import validationSchema from "../features/formValidation/formValidation";
import { useFormikContext } from "formik";


export default function Form(): JSX.Element {

  const { t } = useTranslation();

  const formData = useSelector((state: RootState) => state.formData);

  const [stepsCombined, setStepsCombined] = useState<{ label: string, component: React.ReactNode }[]>([
    {
      label: t('steps.sales'),
      component: <FormSalesUnitStep key="sales" />
    },
    {
      label: t('steps.customer'),
      component: <FormCustomerStep key="customer" />
    },
    {
      label: t('steps.project'),
      component: <FormProjectStep key="project" />
    },
    {
      label: t('steps.system'),
      component: <FormSystemSelectorStep key="system" />
    }
  ]);

  useEffect(() => {
    const newSteps: { label: string, component: React.ReactNode }[] = [
      {
        label: t('steps.sales'),
        component: <FormSalesUnitStep key="sales" />
      },
      {
        label: t('steps.customer'),
        component: <FormCustomerStep key="customer" />
      },
      {
        label: t('steps.project'),
        component: <FormProjectStep key="project" />
      },
      {
        label: t('steps.system'),
        component: <FormSystemSelectorStep key="system" />
      }
    ];
  
    if (formData.system.asrs.selected) {
      newSteps.push({
        label: t("steps.systems.asrs"),
        component: <FormASRSStep key="asrs" />,
      });
    }
  
    if (formData.system.lrkprk.selected) {
      newSteps.push({
        label: t("steps.systems.lrkprk"),
        component: <FormASRSStep key="lrkprk" />,
      });
    }
  
    if (formData.system.agv.selected) {
      newSteps.push({
        label: t("steps.systems.agv"),
        component: <FormASRSStep key="agv" />,
      });
    }
  
    if (formData.system.autovna.selected) {
      newSteps.push({
        label: t("steps.systems.autovna"),
        component: <FormASRSStep key="autovna" />,
      });
    }
  
    setStepsCombined(newSteps);
  }, [formData]);
  

  const [activeStep, setActiveStep] = useState<number>(0);
  const stepLabels = stepsCombined.map((step) => step.label);

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


  const steps = stepsCombined.map((step) => step.component);

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