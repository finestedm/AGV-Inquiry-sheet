import { useEffect, useState } from "react";
import { Alert, Box, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AcUnit, Warning, Whatshot } from "@mui/icons-material";
import { calculateDewPoint } from "../features/variousMethods/dewPointCalculation";
import LoadTable from "./LoadTable";
import LoadDimensionPicture from '../images/loadDimensionsPicture.png'
import LoadDimensionPicture2 from '../images/loadDimensionsPicture2.png'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { handleInputMethod } from "../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../features/variousMethods/trimLeadingZero";


const criticalElectronicsTemperature = 8

export default function FormASRSStep(): JSX.Element {
    const { t } = useTranslation();
    const theme = useTheme();
    const [circularValue, setCircularValue] = useState(0)

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

    useEffect(() => {
        setCircularValue(formData.system.asrs.workTime.shiftsPerDay * formData.system.asrs.workTime.hoursPerShift * formData.system.asrs.workTime.workDays)
    }, [formData.system.asrs.workTime.shiftsPerDay, formData.system.asrs.workTime.hoursPerShift, formData.system.asrs.workTime.workDays])

    const minimalReasonableWeekWorkHours = 60

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('system.asrs.header')}</Typography>
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t('system.asrs.subheader.workTime')}</Typography>

                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t('system.asrs.workTime.workDays')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'workDayse'}
                                value={formData.system.asrs.workTime.workDays}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: 'system.asrs.workTime.workDays', value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={7}
                                marks={[{ value: 1, label: '1' }, { value: 7, label: '7' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t('system.asrs.workTime.shiftsPerDay')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'shiftsPerDay'}
                                value={formData.system.asrs.workTime.shiftsPerDay}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: 'system.asrs.workTime.shiftsPerDay', value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={3}
                                marks={[{ value: 1, label: '1' }, { value: 3, label: '3' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t('system.asrs.workTime.hoursPerShift')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'hoursPerShift'}
                                value={formData.system.asrs.workTime.hoursPerShift}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: 'system.asrs.workTime.hoursPerShift', value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={8}
                                marks={[{ value: 1, label: '1' }, { value: 8, label: '8' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3}>
                            <Typography align="left">{t('system.asrs.workTime.hoursPerWeek')}</Typography>

                            <Stack direction='row' justifyContent='space-evenly' alignItems='center' sx={{ p: '.25rem' }}>
                                <Box sx={{ position: 'relative' }} >
                                    <CircularProgress
                                        sx={{ position: 'absolute', left: 0, color: theme.palette.grey[400] }}
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
                                        sx={{ color: circularValue < minimalReasonableWeekWorkHours ? theme.palette.error.main : theme.palette.primary.main }}
                                    >
                                        {circularValue}
                                    </Typography>
                                    <Typography
                                        sx={{ color: circularValue < minimalReasonableWeekWorkHours ? theme.palette.error.light : theme.palette.primary.light }}
                                    >
                                        h
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t('system.asrs.subheader.workConditions')}</Typography>
                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography align="left">{t('system.asrs.workConditions.temperature')}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'Temperature range'}
                                value={formData.system.asrs.workConditions.temperature}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.temperature', value: v }))}
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
                                onChange={(e, v) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.humidity', value: v }))}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                            />
                        </Grid>
                        {((formData.system.asrs.workConditions.humidity[1] > 15 && calculateDewPoint(formData.system.asrs.workConditions.temperature[0], formData.system.asrs.workConditions.humidity[1]) <= criticalElectronicsTemperature)) && (
                            <Grid item xs={12}>
                                <Alert id='system.asrs.condendartionWarning' severity="warning">{t('system.asrs.condensationWarning')}</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Stack>
                                    <FormControlLabel
                                        id="system-asrs-workConditions-freezer"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.freezer || formData.system.asrs.workConditions.temperature[0] < 0}
                                                onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.freezer', value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t('system.asrs.workConditions.freezer')} <AcUnit fontSize="small" /></>}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-EX"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.EX}
                                                onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.EX', value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t('system.asrs.workConditions.EX')} <Warning fontSize="small" /></>}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-dangerousMaterials"
                                        control={
                                            <Checkbox
                                                checked={formData.system.asrs.workConditions.dangerousMaterials}
                                                onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.dangerousMaterials', value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t('system.asrs.workConditions.dangerousMaterials')} <Whatshot fontSize="small" /></>}
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
                                onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.workConditions.other', value: e.target.value }))}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Box><Typography variant="h5" textAlign='left'>{t('system.asrs.subheader.building')}</Typography></Box>
                <Stack direction='row' alignItems='center'>
                    <Typography>{t('system.asrs.building.existing')}</Typography>
                    <Switch
                        checked={formData.system.asrs.building.new}
                        onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.building.new', value: e.target.checked }))}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography>{t('system.asrs.building.new')}</Typography>
                </Stack>
                <Stack>
                    <FormControlLabel
                        id="system-asrs-building-silo"
                        control={
                            <Checkbox
                                checked={formData.system.asrs.building.silo}
                                onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.building.silo', value: e.target.checked }))}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        labelPlacement="end"
                        label={t('system.asrs.building.silo')}
                    />
                </Stack>
                <Box>
                    {!formData.system.asrs.building.silo &&
                        <Grid container direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                            <Grid item xs>
                                <TextField
                                    id="system.asrs.building.existingBuilding.height"
                                    fullWidth
                                    label={t("system.asrs.building.existingBuilding.height")}
                                    type="number"
                                    value={trimLeadingZeros(formData.system.asrs.building.existingBuilding.height)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.building.existingBuilding.height', value: e.target.value }))}
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
                                    value={trimLeadingZeros(formData.system.asrs.building.existingBuilding.width)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.building.existingBuilding.width', value: e.target.value }))}
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
                                    value={trimLeadingZeros(formData.system.asrs.building.existingBuilding.length)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'system.asrs.building.existingBuilding.length', value: e.target.value }))}
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
                            {/* <Box sx={{border: '3px solid black', width: '100%', aspectRatio: formData.system.asrs.building.existingBuilding.length / formData.system.asrs.building.existingBuilding.width}} /> */}
                        </Grid>
                    }
                </Box>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t('system.asrs.subheader.loads')}</Typography>
                <Container>
                    <img style={{ width: '100%', maxWidth: 800 }} src={LoadDimensionPicture} alt="load dimensions" />
                    <img src={LoadDimensionPicture2} alt="load dimensions 2" />
                </Container>
                <LoadTable selectedSystem='asrs' />
            </Stack>
        </Stack >
    )
}
