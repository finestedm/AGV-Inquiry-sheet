import { Stack, TextField, Typography } from "@mui/material";
import { IFormData } from "../App";
import { IHandleInputMethod } from "./Form";
import { useTranslation } from 'react-i18next';

export default function FormProjectStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {

    const { t } = useTranslation();

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h4" textAlign='left'>{t('project-header')}</Typography>
            <TextField
                fullWidth
                label={t('project-goals')}
                name="project.goals"
                value={formData.project.goals}
                onChange={(e) => handleInputMethod('project.goals', e.target.value)}
            />
        </Stack>
    )
}