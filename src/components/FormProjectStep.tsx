import { Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { IFormData } from "../App";
import { IHandleInputMethod } from "./Form";
import { useTranslation } from 'react-i18next';
import { MenuProps } from "./FormCustomerStep";

export default function FormProjectStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {

    const { t } = useTranslation();

    const supplyChainParts = [
        t('supplyChainParts-production'),
        t('supplyChainParts-storage'),
        t('supplyChainParts-distribution'),
        t('supplyChainParts-finishedGoods'),
        t('supplyChainParts-components'),
    ];

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
            <FormControl>
            <InputLabel id="project-supplyChainParts-label">{t('project-supplyChainParts')}</InputLabel>
                <Select
                    labelId="project-supplyChainParts-label"
                    id="project-supplyChainParts"
                    multiple
                    input={<OutlinedInput label={t('project-supplyChainParts')} />}
                    value={formData.project.supplyChainParts}
                    onChange={(e) => handleInputMethod('project.supplyChainParts', e.target.value as string[])}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={MenuProps}
                >
                    {supplyChainParts.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={formData.project.supplyChainParts.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControlLabel
                id="project-supplyChainParts" 
                control={
                    <Switch 
                        checked={formData.project.tender}
                        onChange={(e) => handleInputMethod('project.tender', e.target.checked)}                        
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                labelPlacement="top" 
                label={t('project-tender')} 
            />

        </Stack>
    )
}