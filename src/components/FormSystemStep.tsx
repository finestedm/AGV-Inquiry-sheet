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
import CustomTextField from "./CustomTextField";
import FlowTable from "./FlowTable";
import CapacityTable from "./CapacityTable";
import { criticalElectronicsTemperature } from "../data/criticalElectronicsTemperature";
import { minimalReasonableWeekWorkHours } from "../data/minimalReasonableWeekWorkHours";

export default function FormSystemStep({ selectedSystem }: { selectedSystem: string }): JSX.Element {

    console.log(selectedSystem)

    const { t } = useTranslation();
    const theme = useTheme();
    const [circularValue, setCircularValue] = useState(0)

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

    useEffect(() => {
        setCircularValue(formData.system[selectedSystem].workTime.shiftsPerDay * formData.system[selectedSystem].workTime.hoursPerShift * formData.system[selectedSystem].workTime.workDays)
    }, [formData.system[selectedSystem].workTime.shiftsPerDay, formData.system[selectedSystem].workTime.hoursPerShift, formData.system[selectedSystem].workTime.workDays])


    function WorkTimeComponent() {
        return (
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t(`system.subheader.workTime`)}</Typography>

                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t(`system.workTime.workDays`)}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'workDays'}
                                value={formData.system[selectedSystem].workTime.workDays}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.workDays`, value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={7}
                                marks={[{ value: 1, label: '1' }, { value: 7, label: '7' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t(`system.workTime.shiftsPerDay`)}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'shiftsPerDay'}
                                value={formData.system[selectedSystem].workTime.shiftsPerDay}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.shiftsPerDay`, value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={3}
                                marks={[{ value: 1, label: '1' }, { value: 3, label: '3' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} lg={3}>
                            <Typography align="left">{t(`system.workTime.hoursPerShift`)}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'hoursPerShift'}
                                value={formData.system[selectedSystem].workTime.hoursPerShift}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workTime.hoursPerShift`, value: v }))}
                                valueLabelDisplay="auto"
                                min={1}
                                max={8}
                                marks={[{ value: 1, label: '1' }, { value: 8, label: '8' }]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3}>
                            <Typography align="left">{t(`system.workTime.hoursPerWeek`)}</Typography>

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
        )
    }

    function WorkConditionsComponent() {
        return (
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t(`system.subheader.workConditions`)}</Typography>
                <Box>
                    <Grid container direction='row' spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Typography align="left">{t(`system.workConditions.temperature`)}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'Temperature range'}
                                value={formData.system[selectedSystem].workConditions.temperature}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.temperature`, value: v }))}
                                valueLabelDisplay="auto"
                                min={-30}
                                max={60}
                                marks={[{ value: -30, label: '-30°C' }, { value: 0, label: '0°C' }, { value: 60, label: '60°C' }]}
                            />
                            {(selectedSystem === 'lrkprk') && (formData.system[selectedSystem].workConditions.temperature[0] <= 5) && (
                            <Grid item xs={12}>
                                <Alert id='system.lrkprk.temperatureWarning' severity="error">{t(`system.lrkprk.temperatureWarning`)}</Alert>
                            </Grid>
                        )}
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <Typography align="left">{t(`system.workConditions.humidity`)}</Typography>
                            <Slider
                                sx={{ width: '95%' }}
                                getAriaLabel={() => 'Humidity range'}
                                value={formData.system[selectedSystem].workConditions.humidity}
                                onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.humidity`, value: v }))}
                                valueLabelDisplay="auto"
                                min={0}
                                max={100}
                                marks={[{ value: 0, label: '0%' }, { value: 100, label: '100%' }]}
                            />
                        </Grid>
                        {((formData.system[selectedSystem].workConditions.humidity[1] > 15 && calculateDewPoint(formData.system[selectedSystem].workConditions.temperature[0], formData.system[selectedSystem].workConditions.humidity[1]) <= criticalElectronicsTemperature)) && (
                            <Grid item xs={12}>
                                <Alert id='system.asrs.condendartionWarning' severity="warning">{t(`system.condensationWarning`)}</Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Stack>
                                    <FormControlLabel
                                        id="system-asrs-workConditions-freezer"
                                        control={
                                            <Checkbox
                                                checked={formData.system[selectedSystem].workConditions.freezer || formData.system[selectedSystem].workConditions.temperature[0] < 0}
                                                onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.freezer`, value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t(`system.workConditions.freezer`)} <AcUnit fontSize="small" /></>}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-EX"
                                        control={
                                            <Checkbox
                                                checked={formData.system[selectedSystem].workConditions.EX}
                                                onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.EX`, value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t(`system.workConditions.EX`)} <Warning fontSize="small" /></>}
                                    />
                                    <FormControlLabel
                                        id="system-asrs-workConditions-dangerousMaterials"
                                        control={
                                            <Checkbox
                                                checked={formData.system[selectedSystem].workConditions.dangerousMaterials}
                                                onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.dangerousMaterials`, value: e.target.checked }))}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        }
                                        labelPlacement="end"
                                        label={<>{t(`system.workConditions.dangerousMaterials`)} <Whatshot fontSize="small" /></>}
                                    />
                                </Stack>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CustomTextField
                                fieldName="system.asrs.workConditions.other"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        )
    }

    function BuildingComponent() {
        return (
            <Stack spacing={2}>
                <Box><Typography variant="h5" textAlign='left'>{t(`system.subheader.building`)}</Typography></Box>
                <Stack direction='row' alignItems='center'>
                    <Typography>{t(`system.building.existing`)}</Typography>
                    <Switch
                        checked={formData.system[selectedSystem].building.new}
                        onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.new`, value: e.target.checked }))}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography>{t(`system.building.new`)}</Typography>
                </Stack>
                {(selectedSystem === 'asrs') &&
                    <Stack>
                        <FormControlLabel
                            id="system-asrs-building-silo"
                            control={
                                <Checkbox
                                    checked={formData.system[selectedSystem].building.silo}
                                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.silo`, value: e.target.checked }))}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            labelPlacement="end"
                            label={t(`system.building.silo`)}
                        />
                    </Stack>
                }
                <Box>
                    {!formData.system[selectedSystem].building.silo &&
                        <Grid container direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                            <Grid item xs>
                                <TextField
                                    id="system.asrs.building.existingBuilding.height"
                                    fullWidth
                                    label={t(`system.building.existingBuilding.height`)}
                                    type="number"
                                    value={trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.height)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.height`, value: e.target.value }))}
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
                                    label={t(`system.building.existingBuilding.width`)}
                                    type="number"
                                    value={trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.width)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.width`, value: e.target.value }))}
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
                                    label={t(`system.building.existingBuilding.length`)}
                                    type="number"
                                    value={trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.length)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.length`, value: e.target.value }))}
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
                            {/* <Box sx={{border: '3px solid black', width: '100%', aspectRatio: formData.system[selectedSystem].building.existingBuilding.length / formData.system[selectedSystem].building.existingBuilding.width}} /> */}
                        </Grid>
                    }
                </Box>
            </Stack>
        )
    }

    function LoadsComponent() {
        return (
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t(`system.subheader.loads`)}</Typography>
                <Box>
                    <img style={{ width: '100%', maxWidth: 800 }} src={LoadDimensionPicture} alt="load dimensions" />
                    <img src={LoadDimensionPicture2} alt="load dimensions 2" />
                </Box>
                <LoadTable selectedSystem={selectedSystem} />
                {(selectedSystem === ('asrs' || 'agv' || 'autovna')) && (formData.system[selectedSystem].loads.length > 1) && (
                    <Grid item xs={12}>
                        <Alert id='system.manyLoadsWarning' severity="warning">{t(`system.manyLoadsWarning`)}</Alert>
                    </Grid>
                )}
            </Stack>
        )
    }

    function CapacityComponent() {
        return (
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t(`system.subheader.capacity`)}</Typography>
                <CapacityTable selectedSystem={selectedSystem} />
            </Stack>
        )
    }

    function FlowsComponent() {
        return (
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t(`system.subheader.flow`)}</Typography>
                <FlowTable selectedSystem={selectedSystem} />
            </Stack>
        )
    }

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t(`system.${selectedSystem}.header`)}</Typography>
            <WorkTimeComponent />
            <WorkConditionsComponent />
            <BuildingComponent />
            <LoadsComponent />
            {(selectedSystem === ('asrs' || 'lrkprk')) && <CapacityComponent />}
            {(selectedSystem === ('agv' || 'autovna')) && <FlowsComponent />}
        </Stack >
    )
}
