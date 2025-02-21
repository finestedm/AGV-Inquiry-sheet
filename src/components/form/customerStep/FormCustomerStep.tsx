import { Box, Button, Checkbox, Chip, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Toolbar, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import { MuiTelInput, MuiTelInputCountry } from 'mui-tel-input'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import { handleIndustryChange, handleInputMethod, initialFormDataState, setFormData } from "../../../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../../../features/variousMethods/trimLeadingZero";
import { Field, Form, Formik, FormikProps, useFormikContext } from 'formik'
import validationSchema from "../../../features/formValidation/formValidation";
import { ICustomer, IFormData, TIndustry } from "../../../features/interfaces";
import CustomTextField from "../CustomTextField";
import industries from "../../../data/industries";
import { DoubleInputWithCurrency } from "./subcomponents/DoubleInputWtihCurrency";
import InputGroup from "../InputGroup";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

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

  const { t, i18n } = useTranslation();
  const theme = useTheme();

  const formData = useSelector((state: RootState) => state.formData.present);
  const currentStep = useSelector((state: RootState) => state.steps.currentStep);
  const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';

  const dispatch = useDispatch();

  const industriesTranslated = industries.map(industry => t(`industry.${industry}`))

  const [phonePrefix, setPhonePrefix] = useState<MuiTelInputCountry>('PL')
  
  useEffect(() => {
    const lang = i18n.language
    switch (lang) {
      case 'de':
        setPhonePrefix('DE')
        break
      case 'es':
        setPhonePrefix('ES')
        break
      default:
        setPhonePrefix('PL')
        break
    }
  }, [])

  return (
  <Box>
    <Typography minHeight={64} alignContent='center' variant="h4" textAlign='left'>{t('customer.header')}</Typography>
    <Stack spacing={5}>
      <InputGroup
        title={t('customer.subheader.teleaddress')}
        subTitle={t('customer.subheader.teleaddressSubtitle')}
        icon={FmdGoodOutlinedIcon}
        content={
          <Stack spacing={4}>
            <CustomTextField
              required
              fieldName="customer.name"
            />
            <CustomTextField
              fieldName="customer.sapNumber"
              type='number'
            />
            <CustomTextField
              required
              fieldName="customer.address"
            />
          </Stack>
        }
      />
      <InputGroup
        title={t('customer.subheader.contactperson')}
        subTitle={t('customer.subheader.contactpersonSubtitle')}
        icon={ContactsOutlinedIcon}
        content={
          <Stack spacing={4}>
            <CustomTextField
              fieldName="customer.contactPerson"
            />
            <CustomTextField
              fieldName="customer.contactPersonRole"
            />
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <InputLabel>{t('customer.contactPersonPhone')}</InputLabel>
                    <MuiTelInput
                      defaultCountry={phonePrefix}
                      onlyCountries={['PL', 'DE', 'ES', 'AT']}
                      continents={['EU']}
                      size="small"
                      value={formData.customer.contactPersonPhone}
                      onChange={(e) => dispatch(handleInputMethod({ path: 'customer.contactPersonPhone', value: e }))}
                      variant="outlined"
                      disabled={!editMode}
                      fullWidth
                    />
                  </Stack>
                </Grid>
                <Grid item xs>
                  <CustomTextField
                    fieldName="customer.contactPersonMail"
                  />
                </Grid>
              </Grid>
            </Box>


          </Stack>
        }
      />
      <InputGroup
        title={t('customer.subheader.businessdata')}
        subTitle={t('customer.subheader.businessdataSubtitle')}
        icon={MonetizationOnOutlinedIcon}
        content={
          <Stack spacing={4}>
            <Stack spacing={1}>
              <InputLabel required>{t('customer.industry')}</InputLabel>
              <FormControl>
                <Field
                  required
                  disabled={!editMode}
                  as={Select}
                  id="customer-industryName"
                  name='customer.industryName'
                  multiple
                  input={<OutlinedInput size="small" />}
                  value={formData.customer.industryName}
                  onChange={(e: { target: { value: number[]; }; }) => {
                    formikProps.setFieldValue('customer.industryName', e.target.value);
                    dispatch(handleInputMethod({ path: 'customer.industryName', value: e.target.value }))
                  }}
                  renderValue={(selected: TIndustry[]) => (
                    <Stack direction="row" spacing={1} >
                      {selected.map((industry) => (
                        <Chip
                          sx={{ borderRadius: .5 }}
                          size="small"
                          key={industry}
                          label={industriesTranslated[industries.indexOf(industry)]}
                        />
                      ))}
                    </Stack>
                  )}
                  MenuProps={MenuProps}
                  error={Boolean(formikProps.errors.customer?.industryName)}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry}>
                      <Checkbox checked={formData.customer.industryName.includes(industry)} />
                      <ListItemText primary={industriesTranslated[industries.indexOf(industry)]} />
                    </MenuItem>
                  ))}
                </Field>
                {formikProps.touched.customer?.industryName && formikProps.errors.customer?.industryName && <FormHelperText error>{t(`${formikProps.errors.customer?.industryName}`)}</ FormHelperText>}
              </FormControl>
            </Stack>
            {formData.customer.industryName.includes('other') &&
              <CustomTextField
                fieldName="customer.industryNameOther"
              />
            }
            <Stack spacing={1}>
              <InputLabel>{t('customer.relations.type')}</InputLabel>
              <FormControl>
                <Field
                  as={Select}
                  sx={{ textAlign: 'left' }}
                  disabled={!editMode}
                  required
                  id="customer.relations"
                  name='customer.relations'
                  input={<OutlinedInput size="small" />}
                  value={formData.customer.relations === -1 ? '' : formData.customer.relations}
                  onChange={(e: { target: { value: string; }; }) => {
                    dispatch(handleInputMethod({ path: 'customer.relations', value: e.target.value as string }))
                    formikProps.setFieldValue('customer.relations', e.target.value);
                  }}
                  renderValue={(selected: any) => (t(`customer.relations.${selected}`))}
                  MenuProps={MenuProps}
                  error={Boolean(formikProps.errors.customer?.relations)}
                >
                  <MenuItem value={1}>{t('customer.relations.1')}</MenuItem>
                  <MenuItem value={2}>{t('customer.relations.2')}</MenuItem>
                  <MenuItem value={3}>{t('customer.relations.3')}</MenuItem>
                  <MenuItem value={4}>{t('customer.relations.4')}</MenuItem>
                </Field>
                {formikProps.touched.customer?.relations && formikProps.errors.customer?.relations && <FormHelperText error>{t(`${formikProps.errors.customer?.relations}`)}</ FormHelperText>}
              </FormControl>
            </Stack>
            {(formData.customer.relations === 2 || formData.customer.relations === 3) &&
              <Box>
                <Grid container direction='row' spacing={4}>
                  <Grid item xs={6} lg={4}>
                    <Stack spacing={1}>
                      <InputLabel>{t("customer.relations.input.forklifts")}</InputLabel>
                      <TextField
                        id="customer-relations-forklift-input"
                        fullWidth
                        disabled={!editMode}
                        size="small"
                        type="number"
                        value={trimLeadingZeros(Number(formData.customer.ownedForklifts))}
                        onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedForklifts', value: Number(e.target.value) }))}
                        InputProps={{
                          // endAdornment: <InputAdornment position="end">{t('customer-relations-racks')}</InputAdornment>,
                          endAdornment: <InputAdornment position="end">szt.</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <Stack spacing={1}>
                      <InputLabel>{t("customer.relations.input.racks")}</InputLabel>
                      <TextField
                        id="customer-relations-racks-input"
                        fullWidth
                        disabled={!editMode}
                        type="number"
                        size="small"
                        value={trimLeadingZeros(Number(formData.customer.ownedRacks))}
                        onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedRacks', value: Number(e.target.value) }))}
                        InputProps={{
                          // endAdornment: <InputAdornment position="end">{t('customer-relations-racks')}</InputAdornment>,
                          endAdornment: <InputAdornment position="end">m.p.</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item lg={4} xs={12}>
                    <Stack spacing={1}>
                      <InputLabel>{t("customer.relations.input.other")}</InputLabel>
                      <TextField
                        id="customer-relations-other-input"
                        fullWidth
                        disabled={!editMode}
                        type="text"
                        size="small"
                        value={formData.customer.ownedOther}
                        onChange={(e) => dispatch(handleInputMethod({ path: 'customer.ownedOther', value: e.target.value }))}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            }
            <DoubleInputWithCurrency inputKey='salesHistoryValue' perYear />
            <DoubleInputWithCurrency inputKey='creditManagement' />
          </Stack>
        }
      />
    </Stack>
    </Box>
  )
}
