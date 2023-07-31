import { Dispatch, SetStateAction } from "react";
import { IFormData } from "../App";
import { Box, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { IHandleInputMethod } from "./Form";
import { useTranslation } from "react-i18next";

export default function FormASRSStep({ formData, handleInputMethod }: { formData: IFormData, handleInputMethod: IHandleInputMethod }) {
    const { t } = useTranslation();

    return (
        <Stack spacing={5}>
            <Typography variant="h4" textAlign='left'>{t('system.asrs.header')}</Typography>
            <Stack spacing={2}>
                <Typography variant="h6" textAlign='left'>{t('system.asrs.subheader.workConditions')}</Typography>

                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.workDays"
                                fullWidth
                                label={t("system.asrs.workConditions.workDay")}
                                type="number"
                                value={formData.system.asrs.workConditions.workDays}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.workDays', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 7,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.shiftsPerDay"
                                fullWidth
                                label={t("system.asrs.workConditions.shiftsPerDay")}
                                type="number"
                                value={formData.system.asrs.workConditions.shiftsPerDay}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.shiftsPerDay', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 3,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.hoursPerShift"
                                fullWidth
                                label={t("system.asrs.workConditions.hoursPerShift")}
                                type="number"
                                value={formData.system.asrs.workConditions.hoursPerShift}
                                onChange={(e) => handleInputMethod('system.asrs.workConditions.hoursPerShift', e.target.value)}
                                inputProps={{
                                    min: 1,
                                    max: 8,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6} sm={12} lg={3}>
                            <TextField
                                id="system-asrs.workConditions.hoursPerWeek"
                                fullWidth
                                label={t("system.asrs.workConditions.hoursPerWeek")}
                                disabled
                                value={formData.system.asrs.workConditions.shiftsPerDay * formData.system.asrs.workConditions.hoursPerShift * formData.system.asrs.workConditions.workDays}
                            />
                        </Grid>
                    </Grid>
                </Box>

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
                    </Grid>
                </Box>

            </Stack>

        </Stack>
    )
}
