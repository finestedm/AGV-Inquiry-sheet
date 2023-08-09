import { Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { IFormData, IHandleInputMethod } from "../features/interfaces";
import { RootState } from "../features/redux/store";
import { useDispatch, useSelector } from 'react-redux';
import { handleInputMethod } from "../features/redux/reducers/formDataSlice";

export default function FormSalesUnitStep(): JSX.Element {

    const { t } = useTranslation();

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch()

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('sales.header')}</Typography>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    disabled
                    label={t('sales.unit')}
                    name="sales.salesUnit"
                    value={formData.sales.salesUnit}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'sales.salesUnit', value: e.target.value }))}
                />
                <TextField
                    label={t('sales.contactperson.name')}
                    name="sales.contactPerson"
                    value={formData.sales.contactPerson}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'sales.contactPerson', value: e.target.value }))}
                    required
                    placeholder={t('sales.contactperson.placeholder')}
                    error={formData.sales.contactPerson.length < 5}
                    helperText={formData.sales.contactPerson.length < 5 ? t('sales.contactperson.helpertext.length') : ''}
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