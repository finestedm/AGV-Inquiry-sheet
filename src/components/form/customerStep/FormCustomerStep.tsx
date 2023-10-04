import { Box, Button, Checkbox, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import { MuiTelInput } from 'mui-tel-input'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import { handleIndustryChange, handleInputMethod, initialFormDataState, setFormData } from "../../../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../../../features/variousMethods/trimLeadingZero";
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik'
import validationSchema from "../../../features/formValidation/formValidation";
import { IFormData } from "../../../features/interfaces";
import CustomTextField from "../CustomTextField";

//props for the insdustries select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FormCustomerStep(): JSX.Element {

  const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from context

  const { t } = useTranslation();

  const formData = useSelector((state: RootState) => state.formData);
  const dispatch = useDispatch();

  const industries: string[] = [
    t('industry.production'),
    t('industry.trade'),
    t('industry.logistics'),
    t('industry.pharmaceutical'),
    t('industry.beverage'),
    t('industry.clothing'),
    t('industry.chemical'),
    t('industry.food'),
    t('industry.automotive'),
    t('industry.other'),
  ];

  const [otherIndustry, setOtherIndustry] = useState<string>('')

  return (
    <Stack spacing={8}>
      <Typography variant="h4" textAlign='left'>{t('customer.header')}</Typography>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign='left'>{t('customer.subheader.teleaddress')}</Typography>
        <CustomTextField
          required
          fieldName="customer.name"
        />
        <CustomTextField
          fieldName="customer.sapNumber"
        />
        <CustomTextField
          required
          fieldName="customer.address"
        />
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign='left'>{t('customer.subheader.contactperson')}</Typography>
        <CustomTextField
          fieldName="customer.contactPerson"
        />
        <CustomTextField
          fieldName="customer.contactPersonRole"
        />
        <MuiTelInput
          label={t('customer.contactperson.phone')}
          defaultCountry="PL"
          continents={['EU']}
          value={formData.customer.contactPersonPhone}
          onChange={(e) => dispatch(handleInputMethod({ path: 'customer.contactPersonPhone', value: e }))}
          variant="outlined"
          fullWidth
        />
        <CustomTextField
          fieldName="customer.contactPersonMail"
        />
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign='left'>{t('customer.subheader.businessdata')}</Typography>
        <FormControl>
          <InputLabel id="customer-industry-label">{t('customer.industry')}</InputLabel>
          <Field
            required
            as={Select}
            labelId="customer-industry-label"
            id="customer-industryName"
            name='customer.industryName'
            multiple
            input={<OutlinedInput label={t('customer.industry')} />}
            value={formData.customer.industryName}
            onChange={(e: { target: { value: string[]; }; }) => {
              formikProps.setFieldValue('customer.industryName', e.target.value);
              dispatch(handleInputMethod({ path: 'customer.industryName', value: e.target.value }))
            }}
            renderValue={(selected: string[]) => selected.join(', ')}
            MenuProps={MenuProps}
            error={Boolean(formikProps.errors.customer?.industryName)}
          >
            {industries.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={formData.customer.industryName.includes(name)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Field>
          {formikProps.touched.customer?.industryName && formikProps.errors.customer?.industryName && <FormHelperText error>{t(`${formikProps.errors.customer?.industryName}`)}</ FormHelperText>}
        </FormControl>
        {formData.customer.industryName.includes(t('industry.other')) &&
          <TextField
            required
            label={t('customer.industryName.other')}
            name="customer.industryName-other"
            value={otherIndustry}
            onChange={(e) => setOtherIndustry(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch(handleIndustryChange({ industryName: formData.customer.industryName, value: (e.target as HTMLInputElement).value }));
              }
            }}
          />
        }
        <FormControl>
          <InputLabel id="customer-relations-label">{t('customer.relations.type')}</InputLabel>
          <Field
            as={Select}
            required
            labelId="customer-relations-label"
            id="customer.relations"
            name='customer.relations'
            input={<OutlinedInput label={t('customer.relations.type')} />}
            value={formData.customer.relations}
            onChange={(e: { target: { value: string; }; }) => {
              dispatch(handleInputMethod({ path: 'customer.relations', value: e.target.value as string }))
              formikProps.setFieldValue('customer.relations', e.target.value);
            }}
            renderValue={(selected: any) => (selected)}
            MenuProps={MenuProps}
            error={Boolean(formikProps.errors.customer?.relations)}
          >
            <MenuItem value={t('customer.relations.new')}>{t('customer.relations.new')}</MenuItem>
            <MenuItem value={t('customer.relations.jh')}>{t('customer.relations.jh')}</MenuItem>
            <MenuItem value={t('customer.relations.jh-kam')}>{t('customer.relations.jh-kam')}</MenuItem>
            <MenuItem value={t('customer.relations.competitor')}>{t('customer.relations.competitor')}</MenuItem>
          </Field>
          {formikProps.touched.customer?.relations && formikProps.errors.customer?.relations && <FormHelperText error>{t(`${formikProps.errors.customer?.relations}`)}</ FormHelperText>}
        </FormControl>
        {(formData.customer.relations === t('customer.relations.jh') || formData.customer.relations === t('customer.relations.jh-kam')) &&
          <Box>
            <Grid container direction='row' spacing={2}>
              <Grid item xs={6} lg={4}>
                <TextField
                  id="customer-relations-forklift-input"
                  fullWidth
                  label={t("customer.relations.input.forklifts")}
                  type="number"
                  value={trimLeadingZeros(Number(formData.customer.ownedForklifts))}
                  onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedForklifts', value: Number(e.target.value) }))}
                  InputProps={{
                    // endAdornment: <InputAdornment position="end">{t('customer-relations-racks')}</InputAdornment>,
                    endAdornment: <InputAdornment position="end">szt.</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={6} lg={4}>
                <TextField
                  id="customer-relations-racks-input"
                  fullWidth
                  label={t("customer.relations.input.racks")}
                  type="number"
                  value={trimLeadingZeros(Number(formData.customer.ownedRacks))}
                  onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedRacks', value: Number(e.target.value) }))}
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
                  label={t("customer.relations.input.other")}
                  type="text"
                  value={formData.customer.ownedOther}
                  onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedOther', value: e.target.value }))}
                />
              </Grid>
            </Grid>
          </Box>
        }
        <TextField
          label={t('customer.relations.saleshistoryvalue')}
          name="customer.salesHistoryValue"
          type="text"
          value={formData.customer.salesHistoryValue === undefined ? '' : (Number(formData.customer.salesHistoryValue)).toLocaleString('en-US').replaceAll(',', ' ')}
          onChange={(e) => {
            const hasDigits = /\d/.test(e.target.value); // Check if the input value contains at least one digit
            hasDigits && dispatch(handleInputMethod({ path: 'customer.salesHistoryValue', value: e.target.value === '' ? undefined : e.target.value.replaceAll(/[ ,.]/g, '') }));
          }}
          InputProps={{
            // endAdornment: <InputAdornment position="end">{t('customer-relations-saleshistoryvalue')}</InputAdornment>,
            endAdornment: <InputAdornment position="end">€ / rok</InputAdornment>,
          }}
        />
        <TextField
          label={t('customer.relations.creditmanagement')}
          name="customer.creditmanagement"
          type="text"
          value={formData.customer.creditManagement === undefined ? '' : (Number(formData.customer.creditManagement)).toLocaleString('en-US').replaceAll(',', ' ')}
          onChange={(e) => {
            const hasDigits = /\d/.test(e.target.value); // Check if the input value contains at least one digit
            hasDigits && dispatch(handleInputMethod({ path: 'customer.creditManagement', value: e.target.value === '' ? undefined : e.target.value.replaceAll(/[ ,.]/g, '') }));
          }}
          InputProps={{
            // endAdornment: <InputAdornment position="end">{t('customer-relations-saleshistoryvalue')}</InputAdornment>,
            endAdornment: <InputAdornment position="end">PLN brutto</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  )
}
