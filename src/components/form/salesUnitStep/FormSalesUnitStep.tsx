import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { Field, FormikProps, useFormikContext } from 'formik'; // Import Formik components
import CustomTextField from "../CustomTextField";
import { IFormData } from "../../../features/interfaces";
import InputGroup from "../InputGroup";
import { RootState } from "../../../features/redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleInputMethod } from "../../../features/redux/reducers/formDataSlice";
import salesEngineersSorted from "../../../data/salesEngineers";

export default function FormSalesUnitStep(): JSX.Element {
    const { t } = useTranslation();
    const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from context
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.formData)

    return (
        <Stack spacing={5}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <InputGroup
                title={t('customer.subheader.teleaddress')}
                content={
                    <Stack spacing={2}>
                        <CustomTextField
                            disabled
                            required
                            fieldName="sales.salesUnit"
                        />
                        <CustomTextField
                            fieldName="sales.OPNumber"
                        />
                        <CustomTextField
                            required
                            fieldName="sales.contactPerson"
                        />
                        <CustomTextField
                            fieldName="sales.contactPersonRole"
                        />
                        <Stack spacing={1}>
                            <InputLabel>{t('sales.salesEngineer')}</InputLabel>
                            <FormControl>
                                <Field
                                    as={Select}
                                    sx={{ textAlign: 'left' }}
                                    disabled={!editMode}
                                    required
                                    id="sales.engineer"
                                    name='sales.engineer'
                                    input={<OutlinedInput size="small" />}
                                    value={formData.sales.salesEngineer === null ? '' : formData.sales.salesEngineer}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        dispatch(handleInputMethod({ path: 'sales.salesEngineer', value: e.target.value as string }))
                                        formikProps.setFieldValue('sales.salesEngineer', e.target.value);
                                    }}
                                    error={Boolean(formikProps.errors.sales?.salesEngineer)}
                                >
                                    {salesEngineersSorted.map(engineer =>
                                    (
                                        <MenuItem value={engineer}>{engineer}</MenuItem>
                                    ))}
                                </Field>
                                {formikProps.touched.customer?.relations && formikProps.errors.customer?.relations && <FormHelperText error>{t(`${formikProps.errors.customer?.relations}`)}</ FormHelperText>}
                            </FormControl>
                        </Stack>
                    </Stack>
                }
            />
        </Stack>
    )
}
