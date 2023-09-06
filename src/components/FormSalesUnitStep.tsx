import { Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { FormikProps, useFormikContext } from 'formik'; // Import Formik components
import CustomTextField from "./CustomTextField";
import { IFormData } from "../features/interfaces";

export default function FormSalesUnitStep(): JSX.Element {
    const { t } = useTranslation();
    const formikProps: FormikProps<IFormData> = useFormikContext(); // Access formikProps from context
    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <Stack spacing={2}>
                <CustomTextField
                    disabled
                    required
                    fieldName="sales.salesUnit"
                />
                <CustomTextField
                    required
                    fieldName="sales.contactPerson"
                />
                <CustomTextField
                    fieldName="sales.contactPersonRole"
                />
                </Stack>
        </Stack>
    )
}
