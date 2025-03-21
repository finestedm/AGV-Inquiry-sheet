import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, CircularProgress, CircularProgressProps, Grid, InputLabel, LinearProgress, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { minimalReasonableWeekWorkHours } from "../../../../data/minimalReasonableWeekWorkHours";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import theme from "../../../../theme";
import tinycolor from "tinycolor2";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

export default function WorkTime({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData.present);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const [tempWorkDays, setTempWorkDays] = useState(0)
    const [tempHoursPerShift, setTempHoursPerShift] = useState(0)
    const [tempShiftsPerDay, setTempShiftsPerDay] = useState(0)

    const dispatch = useDispatch();

    const theme = useTheme();
    const { t } = useTranslation();

    const [circularValue, setCircularValue] = useState(0)
    const [isWorthIt, setIsWorthIt] = useState(false)

    useEffect(() => {
        setCircularValue((((tempShiftsPerDay * tempHoursPerShift * tempWorkDays) - 0) * 100) / (8 * 3 * 7 - 0))
        setIsWorthIt((tempShiftsPerDay * tempHoursPerShift * tempWorkDays) >= minimalReasonableWeekWorkHours)
    }, [tempShiftsPerDay, tempHoursPerShift, tempWorkDays])

    useEffect(() => {
        const systemWorkTime = formData.system[selectedSystem]?.workTime || {};
        setTempWorkDays(systemWorkTime.workDays || 0);
        setTempHoursPerShift(systemWorkTime.hoursPerShift || 0);
        setTempShiftsPerDay(systemWorkTime.shiftsPerDay || 0);
    }, [selectedSystem, formData]);

    return (
        <InputGroup
            title={t(`system.subheader.workTime`)}
            subTitle={t(`system.subheader.workTimeSubtitle`)}
            icon={AccessTimeOutlinedIcon}
            content={
                <Box>
                    <Grid container direction='row' spacing={4} rowGap={2}>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Stack spacing={1} textAlign='center'>
                                <InputLabel>{t(`system.workTime.workDays`)}</InputLabel>
                                <Box>
                                    <Slider
                                        sx={{ width: '95%' }}
                                        disabled={!editMode}
                                        getAriaLabel={() => 'workDays'}
                                        value={tempWorkDays}
                                        onChange={(e, v) => setTempWorkDays(v as number)}
                                        onChangeCommitted={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.workDays`, value: tempWorkDays }))}
                                        valueLabelDisplay="auto"
                                        min={1}
                                        max={7}
                                        marks={[{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 7, label: '7' }]}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Stack spacing={1} textAlign='center'>
                                <InputLabel>{t(`system.workTime.shiftsPerDay`)}</InputLabel>
                                <Box>
                                    <Slider
                                        disabled={!editMode}
                                        sx={{ width: '95%' }}
                                        getAriaLabel={() => 'shiftsPerDay'}
                                        value={tempShiftsPerDay}
                                        onChange={(e, v) => setTempShiftsPerDay(v as number)}
                                        onChangeCommitted={() => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.shiftsPerDay`, value: tempShiftsPerDay }))}
                                        valueLabelDisplay="auto"
                                        min={1}
                                        max={3}
                                        marks={[{ value: 1, label: '1' }, { value: 3, label: '3' }]}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Stack spacing={1} textAlign='center'>
                                <InputLabel>{t(`system.workTime.hoursPerShift`)}</InputLabel>
                                <Box>
                                    <Slider
                                        disabled={!editMode}
                                        sx={{ width: '95%' }}
                                        getAriaLabel={() => 'hoursPerShift'}
                                        value={tempHoursPerShift}
                                        onChange={(e, v) => setTempHoursPerShift(v as number)}
                                        onChangeCommitted={() => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.hoursPerShift`, value: tempHoursPerShift }))}
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
                                <Box position='relative'>
                                    <LinearProgress
                                        color={!isWorthIt ? 'error' : 'success'}
                                        variant="determinate"
                                        value={circularValue}
                                        sx={{ height: '2rem', borderRadius: 1000 }}
                                    />
                                    <Typography
                                        variant="h6"
                                        color={!isWorthIt ? tinycolor(theme.palette.error.main).lighten(20).toRgbString() : tinycolor(theme.palette.success.main).darken(42).toRgbString()}
                                        position='absolute'
                                        top='50%'
                                        left='50%'
                                        sx={{
                                            transform: 'translate(-50%, -50%)', // Center the text
                                            textAlign: 'center', // Optional: ensure the text is centered if it spans multiple lines
                                        }}
                                    >
                                        {tempShiftsPerDay * tempHoursPerShift * tempWorkDays} h
                                    </Typography>
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    )
}


export function ArcProgress({ value, ...props }: { value: number }) {
    const theme = useTheme()
    return (
        <Box
            id="container"
        // height={55}
        >
            <Box
                sx={{
                    height: 55
                    // transform: "rotate(-90deg)"
                }}
            >
                <CircularProgressbar
                    text={`${value} h`}
                    value={value * 100 / 168}
                    circleRatio={0.5}
                    strokeWidth={12}
                    styles={{
                        root: {
                            transform: "rotate(0.75turn)",
                            height: 75
                        },
                        path: { stroke: value < 60 ? theme.palette.warning.dark : theme.palette.success.dark, strokeLinecap: "round" },
                        trail: { stroke: value < 60 ? theme.palette.warning.light : theme.palette.success.light, strokeLinecap: "round" },
                        text: { transform: "rotate(90deg) translate(0px, -100px)", fill: value < 60 ? theme.palette.warning.main : theme.palette.success.main, fontSize: 24 }
                    }}
                />
            </Box>
        </Box>
    );
}