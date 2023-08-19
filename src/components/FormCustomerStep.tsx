import { Box, Button, Checkbox, FormControl, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import { MuiTelInput } from 'mui-tel-input'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { handleIndustryChange, handleInputMethod, initialFormDataState, setFormData } from "../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";
import { Field, Form, Formik } from 'formik'
import { object, string } from 'yup'
import validationSchema from "../features/formValidation/formValidation";

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

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.customer.contactPersonMail);
  };

  const [isFieldTouched, setIsFieldTouched] = useState(false);


  return (
    <Formik
      initialValues={initialFormDataState}
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) => {
        console.log(values, formikHelpers)
      }}
      validateOnChange={true}
    >
      {({ values, errors, setFieldValue, touched}) => (
        <Form>
          <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('customer.header')}</Typography>
            <Stack spacing={2}>
              <Typography variant="h5" textAlign='left'>{t('customer.subheader.teleaddress')}</Typography>
              <Field
                as={TextField}
                label={t('customer.name')}
                name="customer.name"
                value={formData.customer.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('customer.name', e.target.value);
                  dispatch(handleInputMethod({ path: 'customer.name', value: e.target.value }));
                }}
                error={isFieldTouched && Boolean(errors.customer?.name)}
                helperText={isFieldTouched && errors.customer?.name}
              />
              <Field
                as={TextField}
                label={t('customer.sap')}
                placeholder="41******"
                name="customer.sapNumber"
                value={formData.customer.sapNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('customer.sapNumber', e.target.value);
                  dispatch(handleInputMethod({ path: 'customer.sapNumber', value: e.target.value }));
                }}
                error={isFieldTouched && Boolean(errors.customer?.sapNumber)}
                helperText={isFieldTouched && errors.customer?.sapNumber}
              />
              <TextField
                label={t('customer.address')}
                placeholder="Popularna 13B"
                name="customer.address"
                value={formData.customer.address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(handleInputMethod({ path: 'customer.address', value: e.target.value }))}
              />
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h5" textAlign='left'>{t('customer.subheader.contactperson')}</Typography>
              <TextField
                label={t('customer.contactperson.name')}
                name="customer.contactPerson"
                value={formData.customer.contactPerson}
                onChange={(e) => dispatch(handleInputMethod({ path: 'customer.contactPerson', value: e.target.value }))}
              />
              <TextField
                label={t('customer.contactperson.role')}
                name="customer.contactPersonRole"
                value={formData.customer.contactPersonRole}
                onChange={(e) => dispatch(handleInputMethod({ path: 'customer.contactPersonRole', value: e.target.value }))}
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
              <TextField
                label={t('customer.contactperson.mail')}
                name="customer.contactPersonMail"
                value={formData.customer.contactPersonMail}
                placeholder={t('customer.contactperson.mail.placeholder')}
                onChange={(e) => {
                  setIsFieldTouched(true);
                  dispatch(handleInputMethod({ path: 'customer.contactPersonMail', value: e.target.value }))
                }
                }
                error={isFieldTouched && !isValidEmail()} // Show error only if the field is touched and email is invalid
                helperText={isFieldTouched && !isValidEmail() ? t('customer.contactperson.mail.helpertext.valid') : ''}
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
              <Typography variant="h5" textAlign='left'>{t('customer.subheader.businessdata')}</Typography>
              <FormControl>
                <InputLabel id="customer-industry-label">{t('customer.industry')}</InputLabel>
                <Select
                  labelId="customer-industry-label"
                  id="customer-industry"
                  multiple
                  input={<OutlinedInput label={t('customer.industry')} />}
                  value={formData.customer.industryName}
                  onChange={(e) => dispatch(handleInputMethod({ path: 'customer.industryName', value: e.target.value as string[] }))}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  MenuProps={MenuProps}
                >
                  {industries.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={formData.customer.industryName.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formData.customer.industryName.includes(t('industry.other')) &&
                <TextField
                  label={t('customer.industry.other')}
                  name="customer.industry-other"
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
                <Select
                  labelId="customer-relations-label"
                  id="customer-relations"
                  input={<OutlinedInput label={t('customer.relations.type')} />}
                  value={formData.customer.relations}
                  onChange={(e) => dispatch(handleInputMethod({ path: 'customer.relations', value: e.target.value as string }))}
                  renderValue={(selected) => (selected)}
                  MenuProps={MenuProps}
                >
                  <MenuItem value={t('customer.relations.new')}>{t('customer.relations.new')}</MenuItem>
                  <MenuItem value={t('customer.relations.jh')}>{t('customer.relations.jh')}</MenuItem>
                  <MenuItem value={t('customer.relations.jh-kam')}>{t('customer.relations.jh-kam')}</MenuItem>
                  <MenuItem value={t('customer.relations.competitor')}>{t('customer.relations.competitor')}</MenuItem>
                </Select>
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
        </Form>
      )}
    </Formik>
  )
}
