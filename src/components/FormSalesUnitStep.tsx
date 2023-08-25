import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { IFormData, IHandleInputMethod } from "../features/interfaces";
import { RootState } from "../features/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { handleInputMethod } from "../features/redux/reducers/formDataSlice";
import CustomTextField from "./CustomTextField";
import { FormikProps, useFormikContext } from 'formik'

export default function FormSalesUnitStep(): JSX.Element {

    const { t } = useTranslation();

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch()

    const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from context

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    required
                    disabled
                    label={t('sales.unit')}
                    name="sales.salesUnit"
                    value={formData.sales.salesUnit}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'sales.salesUnit', value: e.target.value }))}
                />
                <CustomTextField
                    required
                    fieldName="sales.contactPerson"
                    field={formikProps.getFieldProps('sales.contactPerson')} // Pass field props
                    form={formikProps} // Pass formikProps
                />
                <TextField
                    label={t('sales.contactperson.role')}
                    name="sales.contactPersonRole"
                    value={formData.sales.contactPersonRole}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'sales.contactPersonRole', value: e.target.value }))}
                />
            </Stack>
        </Stack>
    )
}