import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps } from "../App";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';

export interface ISystems {
  [key: string]: {
    url: string;
    alt: string;
  };
}

const systems: ISystems = {
  ASRS: { url: 'https://www.jungheinrich.cn/resource/image/540796/landscape_ratio16x10/750/469/4de74d221121a65bc7e0c08b6d4285da/1FA625729DA78A1AD6585E27F629F67B/stage-automatic-small-parts-storage.jpg', alt: 'ASRS' },
  LRKPRK: { url: 'https://www.jungheinrich.cn/resource/image/540918/landscape_ratio16x10/750/469/40bd0c110ea57c96e6b5a51e6d6728ed/1F26C0C524BFC81ADDA1253482D95F1A/stage-small-parts-storage-dynamic.jpg', alt: 'LRK&PRK' },
  AGV: { url: 'https://www.jungheinrich.cn/resource/image/540798/landscape_ratio16x10/750/469/5207e5fdaf2ac8a1858bcdae07a44ab2/FE5BFAE61CB18BBD620473590B9B437E/stage-agv-system.jpg', alt: 'AGV' },
  AutoVNA: { url: 'https://www.jungheinrich.cn/resource/image/541672/landscape_ratio16x10/750/469/c7d514ecb2cce052105a89c86396a92b/2F274C04399B4D9A89056F7A564042BA/stage-automated-high-rack-stacker.jpg', alt: 'AutoVNA' }
}

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
  const stepLabels = [t('steps-sales'), t('steps-customer'), t('steps-system')];
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
                <FormSystemSelectorStep formData={formData} systems={systems} setFormData={setFormData} />
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