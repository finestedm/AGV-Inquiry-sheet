import { Dispatch, SetStateAction } from "react";
import { IFormData } from "../App";
import { Box, FormControlLabel, Grid, InputAdornment, Stack, Switch, TextField, Typography } from "@mui/material";
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
                        <Grid item xs={6} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.temperature"
                                fullWidth
                                label={t("system.asrs.workConditions.temperature")}
                                type="number"
                                value={formData.system.asrs.workConditions.temperature}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.temperature', e.target.value)}
                                inputProps={{
                                    min: -30,
                                    max: 60,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            °C
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.humidity"
                                fullWidth
                                label={t("system.asrs.workConditions.humidity")}
                                type="number"
                                value={formData.system.asrs.workConditions.humidity}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.humidity', e.target.value)}
                                inputProps={{
                                    min: -30,
                                    max: 60,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <FormControlLabel
                                id="system-asrs-workConditions-freezer"
                                control={
                                    <Switch
                                        checked={formData.system.asrs.workConditions.freezer}
                                        onChange={(e) => handleInputMethod('system.asrs.workConditions.freezer', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('system.asrs.workConditions.freezer')}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <FormControlLabel
                                id="system-asrs-workConditions-EX"
                                control={
                                    <Switch
                                        checked={formData.system.asrs.workConditions.EX}
                                        onChange={(e) => handleInputMethod('system.asrs.workConditions.EX', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('system.asrs.workConditions.EX')}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <FormControlLabel
                                id="system-asrs-workConditions-dangerousMaterials"
                                control={
                                    <Switch
                                        checked={formData.system.asrs.workConditions.dangerousMaterials}
                                        onChange={(e) => handleInputMethod('system.asrs.workConditions.dangerousMaterials', e.target.checked)}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="start"
                                label={t('system.asrs.workConditions.dangerousMaterials')}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.other"
                                fullWidth
                                label={t("system.asrs.workConditions.other")}
                                multiline
                                rows={2}
                                value={formData.system.asrs.workConditions.other}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.other', e.target.value)}
                                inputProps={{
                                    min: -30,
                                    max: 60,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h6" textAlign='left'>{t('system.asrs.subheader.building')}</Typography>
                <Grid container direction='row' spacing={2}>
                    <Grid item xs={6} lg={3}>
                        <FormControlLabel
                            id="system-asrs-building-new"
                            control={
                                <Switch
                                    checked={formData.system.asrs.building.new}
                                    onChange={(e) => handleInputMethod('system.asrs.building.new', e.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            labelPlacement="start"
                            label={formData.system.asrs.building.new ? t('system.asrs.building.silo.new') : t('system.asrs.building.silo.existing')}
                        />
                    </Grid>
                    <Grid item xs={6} lg={3}>
                        <FormControlLabel
                            id="system-asrs-building-silo"
                            control={
                                <Switch
                                    checked={formData.system.asrs.building.silo}
                                    onChange={(e) => handleInputMethod('system.asrs.building.silo', e.target.checked)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            labelPlacement="start"
                            label={t('system.asrs.building.silo')}
                        />
                    </Grid>
                </Grid>
                {!formData.system.asrs.building.silo &&
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={6} lg={3}>
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
                        <Grid item xs>X</Grid>

                        <Grid item xs={6} lg={3}>
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
                        <Grid item xs>X</Grid>
                        <Grid item xs={6} lg={3}>
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
            </Stack>
        </Stack>
    )
}
