import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, TextFieldProps, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { IFormData, IMilestones } from "../App";
import { IHandleInputMethod } from "./Form";
import { useTranslation } from 'react-i18next';
import { MenuProps } from "./FormCustomerStep";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { CropLandscapeOutlined } from "@mui/icons-material";
import { useState } from "react";

export default function FormProjectStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {

    const { t } = useTranslation();

    const supplyChainParts = [
        {
            name: t('supplyChainParts-production'),
            icon: <PrecisionManufacturingIcon />,
        },
        {
            name: t('supplyChainParts-storage'),
            icon: <WarehouseIcon />,
        },
        {
            name: t('supplyChainParts-distribution'),
            icon: <LocalShippingIcon />,
        },
        {
            name: t('supplyChainParts-finishedGoods'),
            icon: <CheckroomIcon />,
        },
        {
            name: t('supplyChainParts-components'),
            icon: <SettingsInputComponentIcon />,
        },
    ];

    const investmentTypes = [
        t('project-invenstmentType-new'),
        t('project-invenstmentType-expansion'),
        t('project-invenstmentType-modification'),
        t('project-invenstmentType-exchange'),
        t('project-invenstmentType-retrofit'),
    ];

    return (
        <Stack spacing={4}>
            <Typography variant="h4" textAlign='left'>{t('project-header')}</Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h6" textAlign='left'>{t('project-subheader-various')}</Typography>
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
                        {supplyChainParts.map((supplyChainPart) => (
                            <MenuItem key={supplyChainPart.name} value={supplyChainPart.name}>
                                <Checkbox checked={formData.project.supplyChainParts.indexOf(supplyChainPart.name) > -1} />
                                <Stack spacing={1} direction='row'>
                                    {supplyChainPart.icon}
                                    <ListItemText primary={supplyChainPart.name} />
                                </Stack>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label={t('project-investmentLocation')}
                    name="project.investmentLocation"
                    value={formData.project.investmentLocation}
                    onChange={(e) => handleInputMethod('project.investmentLocation', e.target.value)}
                />
                <Box>
                    <Grid container flex={1} justifyContent='space-between' spacing={2}>
                        <Grid item >
                            <FormControlLabel
                                id="project-tender"
                                control={
                                    <Switch
                                        checked={formData.project.tender}
                                        onChange={(e) => handleInputMethod('project.tender', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('project-tender')}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                id="project-consultingCompany"
                                control={
                                    <Switch
                                        checked={formData.project.consultingCompany}
                                        onChange={(e) => handleInputMethod('project.consultingCompany', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('project-consultingCompany')}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                id="project-competitor"
                                control={
                                    <Switch
                                        checked={formData.project.competitor}
                                        onChange={(e) => handleInputMethod('project.competitor', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('project-competitor')}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h6" textAlign='left'>{t('project-subheader-investmentType')}</Typography>
                <ToggleButtonGroup
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                    exclusive
                    fullWidth
                    aria-label="investment type buttons"
                >
                    {investmentTypes.map((investmentType) => (
                        <ToggleButton
                            value={investmentType}
                            key={investmentType}
                            onClick={() => handleInputMethod('project.investmentType', investmentType)}
                            selected={formData.project.investmentType === investmentType}
                        >
                            {investmentType}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    sx={{ display: { sm: 'none' } }}
                    exclusive
                    aria-label="investment type buttons"
                    orientation="vertical"
                    fullWidth
                >
                    {investmentTypes.map((investmentType) => (
                        <ToggleButton
                            value={investmentType}
                            key={investmentType}
                            onClick={() => handleInputMethod('project.investmentType', investmentType)}
                            selected={formData.project.investmentType === investmentType}
                        >
                            {investmentType}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h6" textAlign='left'>{t('project-subheader-milestones')}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack direction='row' spacing={2}>
                        <DatePicker
                            label={t('project-milestones-concept')}
                            value={dayjs(formData.project.milestones.concept)}
                            onChange={(e) => {
                                handleInputMethod('project.milestones.concept', dayjs(e).format('YYYY-MM-DD'))
                                // validateDates()
                            }}
                            disablePast
                            slotProps={{
                                textField: {
                                    helperText: dayjs(formData.project.milestones.concept).isBefore(dayjs(new Date())) ? 'Data w przeszłości' : '',
                                },
                            }}
                        />
                        <DatePicker
                            label={t('project-milestones-officialOffer')}
                            value={dayjs(formData.project.milestones.officialOffer)}
                            onChange={(e) => handleInputMethod('project.milestones.officialOffer', dayjs(e).format('YYYY-MM-DD'))}
                            disablePast
                            slotProps={{
                                textField: {
                                    helperText: dayjs(formData.project.milestones.officialOffer).isBefore(dayjs(formData.project.milestones.concept)) ? 'Data oferty przed datą koncepcji' : '',
                                },
                            }}
                        />
                        <DatePicker
                            label={t('project-milestones-order')}
                            value={dayjs(formData.project.milestones.order)}
                            onChange={(e) => handleInputMethod('project.milestones.order', dayjs(e).format('YYYY-MM-DD'))}
                            disablePast
                            slotProps={{
                                textField: {
                                    helperText: dayjs(formData.project.milestones.order).isBefore(dayjs(formData.project.milestones.officialOffer)) ? 'Data zamówienia przed datą oferty' : '',
                                },
                            }}
                        />
                        <DatePicker
                            label={t('project-milestones-implementationStart')}
                            value={dayjs(formData.project.milestones.implementationStart)}
                            onChange={(e) => handleInputMethod('project.milestones.implementationStart', dayjs(e).format('YYYY-MM-DD'))}
                            disablePast
                            slotProps={{
                                textField: {
                                    helperText: dayjs(formData.project.milestones.implementationStart).isBefore(dayjs(formData.project.milestones.order)) ? 'Data rozpoczęcia przed datą zamowienia' : '',
                                },
                            }}
                        />
                        <DatePicker
                            label={t('project-milestones-launch')}
                            value={dayjs(formData.project.milestones.launch)}
                            onChange={(e) => handleInputMethod('project.milestones.launch', dayjs(e).format('YYYY-MM-DD'))}
                            disablePast
                            slotProps={{
                                textField: {
                                    helperText: dayjs(formData.project.milestones.launch).isBefore(dayjs(formData.project.milestones.implementationStart)) ? 'Data rozpoczęcia przed datą zamowienia' : '',
                                },
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
            </Stack>
        </Stack>

    )
}