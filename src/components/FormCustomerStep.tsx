import { Box, Button, Checkbox, FormControl, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
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
    <Stack spacing={4}>
      <Typography variant="h4" textAlign='left'>{t('customer-header')}</Typography>
      <Stack spacing={2}>
        <Typography variant="h6" textAlign='left'>{t('customer-subheader-teleaddress')}</Typography>
        <TextField
          label={t('customer-company')}
          name="customer.company"
          value={formData.customer.company}
          onChange={(e) => handleInputMethod('customer.company', e.target.value)}
        />
        <TextField
          label={t('customer-sap')}
          placeholder="41******"
          name="customer.sapNumber"
          value={formData.customer.sapNumber}
          defaultValue=''
          onChange={(e) => handleInputMethod('customer.sapNumber', e.target.value)}
        />
        <TextField
          label={t('customer-address')}
          placeholder="Popularna 13B"
          name="customer.address"
          value={formData.customer.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputMethod('customer.address', e.target.value)}
        />
        </Stack>
        <Stack spacing={2}>
        <Typography variant="h6" textAlign='left'>{t('customer-subheader-contactperson')}</Typography>
        <TextField
          label={t('customer-contactperson')}
          name="customer.contactPerson"
          value={formData.customer.contactPerson}
          onChange={(e) => handleInputMethod('customer.contactPerson', e.target.value)}
        />
        <TextField
          label={t('customer-contactperson-role')}
          name="customer.contactPersonRole"
          value={formData.customer.contactPersonRole}
          onChange={(e) => handleInputMethod('customer.contactPersonRole', e.target.value)}
        />
        <MuiTelInput
          label={t('customer-contactperson-phone')}
          defaultCountry="PL"
          continents={['EU']}
          value={formData.customer.contactPersonPhone}
          onChange={(e) => handleInputMethod('customer.contactPersonPhone', e)}
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
            handleInputMethod('customer.contactPersonMail', e.target.value)
          }
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
        </Stack>
        <Stack spacing={2}>
        <Typography variant="h6" textAlign='left'>{t('customer-subheader-businessdata')}</Typography>
        <FormControl>
          <InputLabel id="customer-industry-label">{t('customer-industry')}</InputLabel>
          <Select
            labelId="customer-industry-label"
            id="customer-industry"
            multiple
            input={<OutlinedInput label={t('customer-industry')} />}
            value={formData.customer.industryName}
            onChange={(e) => handleInputMethod('customer.industryName', e.target.value as string[])}
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
        <FormControl>
          <InputLabel id="customer-relations-label">{t('customer-relations')}</InputLabel>
          <Select
            labelId="customer-relations-label"
            id="customer-relations"
            input={<OutlinedInput label={t('customer-relations')} />}
            value={formData.customer.relations}
            onChange={(e) => handleInputMethod('customer.relations', e.target.value as string)}
            renderValue={(selected) => (selected)}
            MenuProps={MenuProps}
          >
            <MenuItem value={t('customer-relations-new')}>{t('customer-relations-new')}</MenuItem>
            <MenuItem value={t('customer-relations-jh')}>{t('customer-relations-jh')}</MenuItem>
            <MenuItem value={t('customer-relations-jh-kam')}>{t('customer-relations-jh-kam')}</MenuItem>
            <MenuItem value={t('customer-relations-competitor')}>{t('customer-relations-competitor')}</MenuItem>
          </Select>
        </FormControl>
        {formData.customer.relations === t('customer-relations-jh') || formData.customer.relations === t('customer-relations-jh-kam') &&
          <Box>
          <Grid container direction='row' spacing={2}>
            <Grid item xs={6} lg={4}>
              <TextField
                id="customer-relations-forklift-input"
                fullWidth
                label="Number of Forklifts"
                type="number"
                value={formData.customer.ownedForklifts}
                onChange={(e) => handleInputMethod('customer.ownedForklifts', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} lg={4}>
              <TextField
                id="customer-relations-racks-input"
                fullWidth
                label="Number of Racks"
                type="number"
                value={formData.customer.ownedRacks}
                onChange={(e) => handleInputMethod('customer.ownedRacks', e.target.value)}
                InputProps={{
                  // endAdornment: <InputAdornment position="end">{t('customer-relations-racks')}</InputAdornment>,
                  endAdornment: <InputAdornment position="end">m.p.</InputAdornment>,
                }}            
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <TextField
                id="customer-relations-other-input"
                fullWidth
                label="Inne produkty"
                type="text"
                value={formData.customer.ownedOther}
                onChange={(e) => handleInputMethod('customer.ownedOther', e.target.value)}           
              />
            </Grid>
          </Grid>
          </Box>
        }
        <TextField
        label={t('customer-relations-saleshistoryvalue')}
        name="customer.salesHistoryValue"
        value={formData.customer.salesHistoryValue}
        onChange={(e) => handleInputMethod('customer.salesHistoryValue', e.target.value)}
        InputProps={{
          // endAdornment: <InputAdornment position="end">{t('customer-relations-saleshistoryvalue')}</InputAdornment>,
          endAdornment: <InputAdornment position="end">€ / rok</InputAdornment>,
        }} 
        />
        <TextField
        label={t('customer-relations-creditmanagement')}
        name="customer.creditmanagement"
        value={formData.customer.creditManagement}
        onChange={(e) => handleInputMethod('customer.creditManagement', e.target.value)}
        InputProps={{
          // endAdornment: <InputAdornment position="end">{t('customer-relations-saleshistoryvalue')}</InputAdornment>,
          endAdornment: <InputAdornment position="end">PLN brutto</InputAdornment>,
        }} 
        />
      </Stack>
    </Stack>
  )
}
