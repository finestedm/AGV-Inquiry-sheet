import { Box, Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { IFormData } from "../App";
import { IHandleInputMethod } from "./Form";
import { useState, Dispatch, SetStateAction } from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { MuiTelInput } from 'mui-tel-input'

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']

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

export default function FormCustomerStep({ formData, handleInputMethod, setFormData }: { formData: IFormData, handleInputMethod: IHandleInputMethod, setFormData: Dispatch<SetStateAction<IFormData>> }) {

  const [otherIndustry, setOtherIndustry] = useState<string>('')
  const handleIndustryChange = (value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      newFormData.customer.industryName = [...prevFormData.customer.industryName, value];

      return newFormData;
    });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Typography variant="h4" textAlign='left'>Dane klienta:</Typography>
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
      <MuiTelInput
        label='Telefon kontaktowy'
        defaultCountry="PL"
        continents={['EU']}
        value={formData.customer.contactPersonPhone}
        onChange={(e) => handleInputMethod('customer', 'contactPersonPhone', e)}
        variant="outlined"
        fullWidth
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
  )
}
