import { Dispatch, SetStateAction } from "react";
import { IFormData } from "../App";
import { Box, Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { IHandleInputMethod } from "./Form";
import { useTranslation } from "react-i18next";

export default function FormASRSStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {
    const { t } = useTranslation();

    return (
        <Stack spacing={5}>
            <Typography variant="h4" textAlign='left'>{t('system.asrs.header')}</Typography>
            <Stack spacing={2}>
                <Typography variant="h6" textAlign='left'>{t('system.asrs.subheader.workTime')}</Typography>

                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workTime.workDays"
                                fullWidth
                                label={t("system.asrs.workTime.workDay")}
                                type="number"
                                value={formData.system.asrs.workTime.workDays}
                                onChange={(e) => handleInputMethod('system.asrs.workTime.workDays', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 7,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workTime.shiftsPerDay"
                                fullWidth
                                label={t("system.asrs.workTime.shiftsPerDay")}
                                type="number"
                                value={formData.system.asrs.workTime.shiftsPerDay}
                                onChange={(e) => handleInputMethod('system.asrs.workTime.shiftsPerDay', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 3,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workTime.hoursPerShift"
                                fullWidth
                                label={t("system.asrs.workTime.hoursPerShift")}
                                type="number"
                                value={formData.system.asrs.workTime.hoursPerShift}
                                onChange={(e) => handleInputMethod('system.asrs.workTime.hoursPerShift', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 8,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={12} lg={3}>
                            <TextField
                                id="system-asrs.workTime.hoursPerWeek"
                                fullWidth
                                label={t("system.asrs.workTime.hoursPerWeek")}
                                disabled
                                value={formData.system.asrs.workTime.shiftsPerDay * formData.system.asrs.workTime.hoursPerShift * formData.system.asrs.workTime.workDays}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h6" textAlign='left'>{t('system.asrs.subheader.workConditions')}</Typography>
                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography align="left">{t('system.asrs.workConditions.temperature')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'Temperature range'}
                                value={formData.system.asrs.workConditions.temperature}
                                onChange={(e, v) => handleInputMethod('system.asrs.workConditions.temperature', v)}
                                valueLabelDisplay="auto"
                                min={-30}
                                max={60}
                                marks={[{ value: -30, label: '-30°C' }, { value: 0, label: '0°C' }, { value: 60, label: '60°C' }]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography align="left">{t('system.asrs.workConditions.humidity')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'Humidity range'}
                                value={formData.system.asrs.workConditions.humidity}
                                onChange={(e, v) => handleInputMethod('system.asrs.workConditions.humidity', v)}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Stack>
                                    <FormControlLabel
                                        sx={{ width: '100%' }}
                                        id="system-asrs-workConditions-freezer"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.freezer || formData.system.asrs.workConditions.temperature[0] < 0}
                                                onChange={(e) => handleInputMethod('system.asrs.workConditions.freezer', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={t('system.asrs.workConditions.freezer')}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-EX"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.EX}
                                                onChange={(e) => handleInputMethod('system.asrs.workConditions.EX', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={t('system.asrs.workConditions.EX')}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-dangerousMaterials"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.dangerousMaterials}
                                                onChange={(e) => handleInputMethod('system.asrs.workConditions.dangerousMaterials', e.target.checked)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={t('system.asrs.workConditions.dangerousMaterials')}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                id="system-asrs.workConditions.other"
                                fullWidth
                                label={t("system.asrs.workConditions.other")}
                                multiline
                                rows={4}
                                value={formData.system.asrs.workConditions.other}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.other', e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Box><Typography variant="h6" textAlign='left'>{t('system.asrs.subheader.building')}</Typography></Box>
                <Box><Grid container direction='row' spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Stack direction='row' alignItems='center'>
                            <Typography>t('system.asrs.building.existing')</Typography>
                            <Switch
                                checked={formData.system.asrs.building.new}
                                onChange={(e) => handleInputMethod('system.asrs.building.new', e.target.checked)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <Typography>t('system.asrs.building.new')</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            id="system-asrs-building-silo"
                            control={
                                <Checkbox
                                    checked={formData.system.asrs.building.silo}
                                    onChange={(e) => handleInputMethod('system.asrs.building.silo', e.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            labelPlacement="end"
                            label={t('system.asrs.building.silo')}
                        />
                    </Grid>
                </Grid>
                </Box>
                <Box>
                    {!formData.system.asrs.building.silo &&
                        <Grid container direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                            <Grid item xs>
                                <TextField
                                    id="system.asrs.building.existingBuilding.height"
                                    fullWidth
                                    label={t("system.asrs.building.existingBuilding.height")}
                                    type="number"
                                    value={formData.system.asrs.building.existingBuilding.height}
                                    onChange={(e) => handleInputMethod('system.asrs.building.existingBuilding.height', e.target.value)}
                                    inputProps={{
                                        min: 1,
                                        max: 30,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}>X</Grid>

                            <Grid item xs>
                                <TextField
                                    id="system.asrs.building.existingBuilding.width"
                                    fullWidth
                                    label={t("system.asrs.building.existingBuilding.width")}
                                    type="number"
                                    value={formData.system.asrs.building.existingBuilding.width}
                                    onChange={(e) => handleInputMethod('system.asrs.building.existingBuilding.width', e.target.value)}
                                    inputProps={{
                                        min: 5,
                                        max: 1000,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={1}>X</Grid>
                            <Grid item xs>
                                <TextField
                                    id="system.asrs.building.existingBuilding.length"
                                    fullWidth
                                    label={t("system.asrs.building.existingBuilding.length")}
                                    type="number"
                                    value={formData.system.asrs.building.existingBuilding.length}
                                    onChange={(e) => handleInputMethod('system.asrs.building.existingBuilding.length', e.target.value)}
                                    inputProps={{
                                        min: 5,
                                        max: 1000,
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    }
                </Box>
            </Stack>
        </Stack >
    )
}