import { Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { IFormData, IHandleInputMethod } from "../features/interfaces";

export default function FormSalesUnitStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {

    const { t } = useTranslation();

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <TextField
                fullWidth
                disabled
                label={t('sales.unit')}
                name="sales.salesUnit"
                value={formData.sales.salesUnit}
                onChange={(e) => handleInputMethod('sales.salesUnit', e.target.value)}
            />
            <TextField
                label={t('sales.contactperson.name')}
                name="sales.contactPerson"
                value={formData.sales.contactPerson}
                onChange={(e) => handleInputMethod('sales.contactPerson', e.target.value)}
                required
                placeholder={t('sales.contactperson.placeholder')}
                error={formData.sales.contactPerson.length < 5}
                helperText={formData.sales.contactPerson.length < 5 ? t('sales.contactperson.helpertext.length') : ''}
            />

            <TextField
                label={t('sales.contactperson.role')}
                name="sales.contactPersonRole"
                value={formData.sales.contactPersonRole}
                onChange={(e) => handleInputMethod('sales.contactPersonRole', e.target.value)}
            />
        </Stack>
    )
}