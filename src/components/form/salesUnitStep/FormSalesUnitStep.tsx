import { Box, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
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
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import salesUnits, { salesUnitLangueage } from "../../../data/salesUnits";
import { useEffect, useState } from "react";

export default function FormSalesUnitStep(): JSX.Element {
    const { t,i18n } = useTranslation();
    const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from context
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.formData.present)

    function correspondLanguageToSalesUnit() {
        if (formData.sales.salesUnit === '') { // prevents selected salesUnit from being overwritten
            const matchedEntry = Object.entries(salesUnitLangueage).find(([key, value]) => value === i18n.language);
            if (matchedEntry) {
                dispatch(handleInputMethod({ path: 'sales.salesUnit', value: matchedEntry[0] as string }))
            }
        }
    }

    useEffect(() => {
        setTimeout(() => correspondLanguageToSalesUnit(), 50)   //Timeout needed because data is being read from the localStorage
    }, [])


    useEffect(() => {
        formData.sales.salesUnit !== 'S1-PL' && dispatch(handleInputMethod({ path: 'sales.salesEngineer', value: null }))      //resets value for salesEnginned so the inquieries dont get send to him from if other country is selected and enginner field is hidden
    }, [formData.sales.salesUnit])

    return (
        <Stack spacing={5}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <InputGroup
                title={t('customer.subheader.teleaddress')}
                subTitle={t('customer.subheader.teleaddressSubtitle')}
                icon={AssignmentOutlinedIcon}
                content={
                    <Stack spacing={4}>
                        <Box>
                            <Stack spacing={1}>
                            <InputLabel>{t('sales.salesUnit')}</InputLabel>
                            <FormControl>
                                <Field
                                    as={Select}
                                    sx={{ textAlign: 'left' }}
                                    disabled={!editMode}
                                    required
                                    id="sales.salesUnit"
                                    name='sales.salesUnit'
                                    input={<OutlinedInput size="small" />}
                                    value={formData.sales.salesUnit}
                                    onChange={(e: { target: { value: string; }; }) => {
                                        dispatch(handleInputMethod({ path: 'sales.salesUnit', value: e.target.value as string }))
                                        formikProps.setFieldValue('sales.salesUnit', e.target.value);
                                    }}
                                    error={Boolean(formikProps.errors.sales?.salesUnit)}
                                >
                                    {salesUnits.map(saleUnit =>
                                    (
                                        <MenuItem value={saleUnit}>{saleUnit}</MenuItem>
                                    ))}
                                </Field>
                                {formikProps.touched.sales?.salesUnit && formikProps.errors.sales?.salesUnit && <FormHelperText error>{t(`${formikProps.errors.sales?.salesUnit}`)}</ FormHelperText>}
                            </FormControl>
                            </Stack>
                        </Box>
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
                        {formData.sales.salesUnit === 'S1-PL' &&
                            <Box>
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
                                        {formikProps.touched.sales?.salesEngineer && formikProps.errors.sales?.salesEngineer && <FormHelperText error>{t(`${formikProps.errors.sales?.salesEngineer}`)}</ FormHelperText>}
                                    </FormControl>
                                </Stack>
                            </Box>
                        }
                    </Stack>
                }
            />
        </Stack>
    )
}
