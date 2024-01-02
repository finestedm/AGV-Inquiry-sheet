import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, CircularProgress, Grid, InputLabel, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { minimalReasonableWeekWorkHours } from "../../../../data/minimalReasonableWeekWorkHours";
import { ISystems } from "../../../../features/interfaces";

export default function WorkTime({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';

    const dispatch = useDispatch();

    const theme = useTheme();
    const { t } = useTranslation();

    const [circularValue, setCircularValue] = useState(0)
    useEffect(() => {
        setCircularValue(formData.system[selectedSystem].workTime.shiftsPerDay * formData.system[selectedSystem].workTime.hoursPerShift * formData.system[selectedSystem].workTime.workDays)
    }, [formData.system[selectedSystem].workTime.shiftsPerDay, formData.system[selectedSystem].workTime.hoursPerShift, formData.system[selectedSystem].workTime.workDays])


    return (
        <Stack spacing={2}>
            <Typography variant="h5" textAlign='left'>{t(`system.subheader.workTime`)}</Typography>
            <Box>
                <Grid container direction='row' spacing={2} rowGap={2}>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack spacing={1}>
                            <InputLabel>{t(`system.workTime.workDays`)}</InputLabel>
                            <Box>
                                <Slider
                                    sx={{ width: '95%' }}
                                    disabled={!editMode}
                                    getAriaLabel={() => 'workDays'}
                                    value={formData.system[selectedSystem].workTime.workDays}
                                    onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.workDays`, value: v }))}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={7}
                                    marks={[{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 7, label: '7' }]}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack spacing={1}>
                            <InputLabel>{t(`system.workTime.shiftsPerDay`)}</InputLabel>
                            <Box>
                                <Slider
                                    disabled={!editMode}
                                    sx={{ width: '95%' }}
                                    getAriaLabel={() => 'shiftsPerDay'}
                                    value={formData.system[selectedSystem].workTime.shiftsPerDay}
                                    onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.shiftsPerDay`, value: v }))}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={3}
                                    marks={[{ value: 1, label: '1' }, { value: 3, label: '3' }]}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Stack spacing={1} textAlign='left'>
                            <InputLabel>{t(`system.workTime.hoursPerShift`)}</InputLabel>
                            <Box>
                                <Slider
                                    disabled={!editMode}
                                    sx={{ width: '95%' }}
                                    getAriaLabel={() => 'hoursPerShift'}
                                    value={formData.system[selectedSystem].workTime.hoursPerShift}
                                    onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.hoursPerShift`, value: v }))}
                                    valueLabelDisplay="auto"
                                    min={1}
                                    max={8}
                                    marks={[{ value: 1, label: '1' }, { value: 6, label: '6' }, { value: 8, label: '8' }]}
                                />
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={3}>
                        <Stack spacing={1} textAlign='left'>
                            <InputLabel>{t(`system.workTime.hoursPerWeek`)}</InputLabel>
                            <Stack direction='row' justifyContent='space-evenly' alignItems='center' sx={{ p: '.25rem' }}>
                                <Box sx={{ position: 'relative' }} >
                                    <CircularProgress
                                        sx={{ position: 'absolute', left: 0, color: theme.palette.grey[400], opacity: .3 }}
                                        thickness={6}
                                        variant="determinate"
                                        value={100}
                                    />
                                    <CircularProgress
                                        sx={{ color: circularValue < minimalReasonableWeekWorkHours ? theme.palette.error.main : theme.palette.success.main }}
                                        thickness={6}
                                        variant="determinate"
                                        value={circularValue * 100 / 168}
                                    />
                                </Box>
                                <Stack direction='row'>
                                    <Typography
                                        variant='h4'
                                        sx={{ color: circularValue < minimalReasonableWeekWorkHours ? theme.palette.error.main : theme.palette.success.main }}
                                    >
                                        {circularValue}
                                    </Typography>
                                    <Typography
                                        sx={{ color: circularValue < minimalReasonableWeekWorkHours ? theme.palette.error.light : theme.palette.success.light }}
                                    >
                                        h
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Stack>
    )
}