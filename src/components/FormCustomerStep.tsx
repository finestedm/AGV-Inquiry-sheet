import { Box, Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { IFormData } from "../App";
import { IHandleInputMethod } from "./Form";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { MuiTelInput } from 'mui-tel-input'
import { useTranslation } from 'react-i18next';

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

  const { t } = useTranslation();

  const industries = [
    t('industry-production'),
    t('industry-trade'),
    t('industry-logistics'),
    t('industry-pharmaceutical-industry'),
    t('industry-beverage-industry'),
    t('industry-clothing-industry'),
    t('industry-chemical-industry'),
    t('industry-food-industry'),
    t('industry-automotive'),
    t('industry-other'),
  ];

  const [otherIndustry, setOtherIndustry] = useState<string>('')
  const handleIndustryChange = (value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      newFormData.customer.industryName = [...prevFormData.customer.industryName, value];

      return newFormData;
    });
  };

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.customer.contactPersonMail);
  };

  const [isFieldTouched, setIsFieldTouched] = useState(false);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Typography variant="h4" textAlign='left'>{t('customer-header')}</Typography>
      <TextField
        label={t('customer-company')}
        name="customer.company"
        value={formData.customer.company}
        onChange={(e) => handleInputMethod('customer', 'company', e.target.value)}
      />
      <TextField
        label={t('customer-sap')}
        placeholder="41******"
        name="customer.sapNumber"
        value={formData.customer.sapNumber}
        defaultValue=''
        onChange={(e) => handleInputMethod('customer', 'sapNumber', e.target.value)}
      />
      <FormControl>
        <InputLabel id="customer-industry-label">{t('customer-industry')}</InputLabel>
        <Select
          labelId="customer-industry-label"
          id="customer-industry"
          multiple
          input={<OutlinedInput label={t('customer-industry')} />}
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
      {formData.customer.industryName.includes(t('industry-other')) &&
        <TextField
          label={t('customer-industry-other')}
          name="customer.industry-other"
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
        label={t('customer-contactperson')}
        name="customer.contactPerson"
        value={formData.customer.contactPerson}
        onChange={(e) => handleInputMethod('customer', 'contactPerson', e.target.value)}
      />
      <TextField
        label={t('customer-contactperson-role')}
        name="customer.contactPersonRole"
        value={formData.customer.contactPersonRole}
        onChange={(e) => handleInputMethod('customer', 'contactPersonRole', e.target.value)}
      />
      <MuiTelInput
        label={t('customer-contactperson-phone')}
        defaultCountry="PL"
        continents={['EU']}
        value={formData.customer.contactPersonPhone}
        onChange={(e) => handleInputMethod('customer', 'contactPersonPhone', e)}
        variant="outlined"
        fullWidth
      />
      <TextField
        label={t('customer-contactperson-mail')}
        name="customer.contactPersonMail"
        value={formData.customer.contactPersonMail}
        placeholder={t('customer-contactperson-mail-placeholder')}
        onChange={(e) => {
          setIsFieldTouched(true);
          handleInputMethod('customer', 'contactPersonMail', e.target.value)}
        }
        error={isFieldTouched && !isValidEmail()} // Show error only if the field is touched and email is invalid
        helperText={isFieldTouched && !isValidEmail() ? t('customer-contactperson-mail-helpertext-valid') : ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label={t('customer-address')}
        placeholder="Popularna 13B"
        name="customer.address"
        value={formData.customer.address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputMethod('customer', 'address', e.target.value)}
      />
      <FormControl>
        <InputLabel id="customer-relations-label">{t('customer-relations')}</InputLabel>
        <Select
          labelId="customer-relations-label"
          id="customer-relations"
          input={<OutlinedInput label={t('customer-relations')} />}
          value={formData.customer.relations}
          onChange={(e) => handleInputMethod('customer', 'relations', e.target.value as number )}
          renderValue={(selected) => (selected)}
          MenuProps={MenuProps}
        >
            <MenuItem value={0}>
              <ListItemText primary={t('customer-ralations-new')} />
            </MenuItem>
            <MenuItem value={1}>
              <ListItemText primary={t('customer-ralations-jh')} />
            </MenuItem>
            <MenuItem value={2}>
              <ListItemText primary={t('customer-ralations-jh-kam')} />
            </MenuItem>
            <MenuItem value={3}>
              <ListItemText primary={t('customer-ralations-competitor')} />
            </MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}
