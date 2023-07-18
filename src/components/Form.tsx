import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps } from "../App";
import SystemSelector from "./SystemSelector";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { AppBar, Tab, Tabs } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import FormStepper from "./FormStepper";

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']

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

//props for the insdustries select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Form({ formData, setFormData }: IFormProps): JSX.Element {

  const [otherIndustry, setOtherIndustry] = useState<string>('')
  const [activeStep, setActiveStep] = useState<number>(0);
  const stepLabels = ["Sales", "Customer", "System"];
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


  // Universal handleInputMethod function
  const handleInputMethod = <K extends keyof IFormData>(
    topLevelKey: K,
    fieldPath: keyof IFormData[K],
    value: IFormData[K][keyof IFormData[K]]
  ) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      // Access the top-level key in the formData object
      const topLevelObject = newFormData[topLevelKey];

      // Update the field value
      topLevelObject[fieldPath] = value;

      return newFormData;
    });
  };


  const handleIndustryChange = (value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      newFormData.customer.industryName = [...prevFormData.customer.industryName, value];

      return newFormData;
    });
  };

  if (formData) {
    return (
      <Container component='form'>
        <Stack spacing={3} sx={{my: 5}}>
          <FormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
          <Box>
            {activeStep === 0 && (
              <Box className={fadeOut ? 'step fadeout' : 'step'}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
                  <TextField
                    fullWidth
                    label='Jednostka sprzedażowa'
                    name="sales.salesUnit"
                    value={formData.sales.salesUnit}
                    onChange={(e) => handleInputMethod('sales', 'salesUnit', e.target.value)}
                  />
                  <TextField
                    label='Osoba kontaktowa'
                    name="sales.contactPerson"
                    value={formData.sales.contactPerson}
                    onChange={(e) => handleInputMethod('sales', 'contactPerson', e.target.value)}
                  />
                  <TextField
                    label='Funkcja osoby kontaktowej'
                    name="sales.contactPersonRole"
                    value={formData.sales.contactPersonRole}
                    onChange={(e) => handleInputMethod('sales', 'contactPersonRole', e.target.value)}
                  />
                </Stack>
              </Box>
            )}
            {activeStep === 1 && (
              <Box className={fadeOut ? 'step fadeout' : 'step'}>
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Typography variant="h4">Dane klienta:</Typography>
                  <TextField
                    label='Firma / klient'
                    name="customer.company"
                    value={formData.customer.company}
                    onChange={(e) => handleInputMethod('customer', 'company', e.target.value)}
                  />
                  <TextField
                    label='Numer sap'
                    placeholder="41******"
                    name="customer.sapNumber"
                    value={formData.customer.sapNumber}
                    defaultValue=''
                    onChange={(e) => handleInputMethod('customer', 'sapNumber', e.target.value)}
                  />
                  <FormControl>
                    <InputLabel id="demo-multiple-checkbox-label">Branża</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      input={<OutlinedInput label="Industry" />}
                      value={formData.customer.industryName}
                      onChange={(e) => handleInputMethod('customer', 'industryName', e.target.value as string[])}
                      renderValue={(selected) => (selected as string[]).join(', ')}
                      MenuProps={MenuProps}
                    >
                      {industries.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={formData.customer.industryName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formData.customer.industryName.includes('Inna') &&
                    <TextField
                      label="Inna branża"
                      name="Inna"
                      value={otherIndustry}
                      onChange={(e) => setOtherIndustry(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleIndustryChange(((e.target as HTMLInputElement) as HTMLInputElement).value);
                        }
                      }}
                    />
                  }
                  <TextField
                    label='Osoba kontaktowa'
                    name="customer.contactPerson"
                    value={formData.customer.contactPerson}
                    onChange={(e) => handleInputMethod('customer', 'contactPerson', e.target.value)}
                  />
                  <TextField
                    label='Funkcja osoby kontaktowej'
                    name="customer.contactPersonRole"
                    value={formData.customer.contactPersonRole}
                    onChange={(e) => handleInputMethod('customer', 'contactPersonRole', e.target.value)}
                  />
                  <TextField
                    label='Numer kontaktowy'
                    name="customer.contactPersonPhone"
                    value={formData.customer.contactPersonPhone}
                    onChange={(e) => handleInputMethod('customer', 'contactPersonPhone', e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label='Adres email'
                    name="customer.contactPersonMail"
                    value={formData.customer.contactPersonMail}
                    onChange={(e) => handleInputMethod('customer', 'contactPersonMail', e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    label='Adres'
                    placeholder="Popularna 13B"
                    name="customer.address"
                    value={formData.customer.address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputMethod('customer', 'address', e.target.value)}
                  />
                </Stack>
              </Box>
            )}
            {activeStep === 2 && (
              <Box className={fadeOut ? 'step fadeout' : 'step'}>
                <SystemSelector formData={formData} systems={systems} setFormData={setFormData} />
              </Box>
            )}
          </Box>
          <Box>
            <Stack direction='row'>
              {activeStep !== 0 && (
                <Button variant="contained" onClick={handleBack}>
                  Back
                </Button>
              )}
              {activeStep < stepLabels.length - 1 && (
                <Button variant="contained" onClick={handleNext} sx={{ ml: 'auto' }}>
                  Next
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