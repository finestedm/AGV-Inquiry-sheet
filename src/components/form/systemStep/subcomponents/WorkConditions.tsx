import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Alert, Box, Checkbox, Collapse, FormControlLabel, FormHelperText, Grid, InputLabel, Slider, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { calculateDewPoint } from "../../../../features/variousMethods/dewPointCalculation";
import { AcUnit, Warning, Whatshot } from "@mui/icons-material";
import CustomTextField from "../../CustomTextField";
import { criticalElectronicsTemperature } from "../../../../data/criticalElectronicsTemperature";
import theme from "../../../../theme";
import { IFormData, ISystems } from "../../../../features/interfaces";
import CustomAlert from "../../../CustomAlert";
import InputGroup from "../../InputGroup";
import CustomCheckbox from "../../CustomCheckbox";
import ThermostatAutoOutlinedIcon from '@mui/icons-material/ThermostatAutoOutlined';
import { isCondensationRisk } from "../../../../features/variousMethods/isCondensationRisk";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import floorTypes from "../../../../data/floorTypes";
import { FormikProps, useFormikContext } from "formik";

export default function WorkConditions({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData.present);
    const workConditions = formData.system[selectedSystem].workConditions;
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [tempTemperature, setTempTemperature] = useState(workConditions.temperature)
    const [tempHumidity, setTempHumidity] = useState(workConditions.humidity)

    const formikProps: FormikProps<IFormData> = useFormikContext();

    useEffect(() => {
        const systemCond = formData.system[selectedSystem]?.workConditions || {};
        setTempTemperature(systemCond.temperature || [20, 30]);
        setTempHumidity(systemCond.humidity || [0, 5]);
    }, [formData, selectedSystem]);

    return (
        <InputGroup
            title={t(`system.subheader.workConditions`)}
            subTitle={t(`system.subheader.workConditionsSubtitle`)}
            icon={ThermostatAutoOutlinedIcon}
            content={
                <Box>
                    <Grid container direction='row' spacing={4}>
                    <Grid item xs={12}>
                            <Stack spacing={1}>
                                <InputLabel>{t(`system.workConditions.floor`)}</InputLabel>
                                <ToggleButtonGroup
                                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    color='primary'
                                    disabled={!editMode}
                                    exclusive
                                    fullWidth
                                    aria-label="floor type buttons"
                                    onChange={(e, v) => {
                                        dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.floorType`, value: v }))
                                        formikProps.setFieldValue(`system.${selectedSystem}.workConditions.floorType`, v);
                                    }}
                                >
                                    {floorTypes.map((floorType) => (
                                        <ToggleButton
                                            className="buttongroup-deep"
                                            sx={{ color: Boolean(formikProps.errors.system?.[selectedSystem]?.workConditions?.floorType) ? theme.palette.error.main : '', borderColor: Boolean(formikProps.errors.system?.[selectedSystem]?.workConditions?.floorType) ? theme.palette.error.main : '' }}
                                            value={floorTypes.indexOf(floorType)}
                                            color="primary"
                                            key={floorType}
                                            selected={formData.system[selectedSystem].workConditions.floorType === floorTypes.indexOf(floorType)}
                                        >
                                            {t(`floorType.${floorType}`)}
                                            </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                <ToggleButtonGroup
                                    sx={{ display: { sm: 'none' } }}
                                    size="small"
                                    className="buttongroup-deep"
                                    exclusive
                                    disabled={!editMode}
                                    aria-label="investment type buttons"
                                    orientation="vertical"
                                    fullWidth
                                    color='primary'
                                    onChange={(e, v) => {
                                        dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.floorType`, value: v }))
                                        formikProps.setFieldValue(`system.${selectedSystem}.workConditions.floorType`, v);
                                    }}
                                >
                                    {floorTypes.map((floorType) => (
                                        <ToggleButton
                                            className="buttongroup-deep"
                                            value={floorTypes.indexOf(floorType)}
                                            key={floorType}
                                            color="primary"
                                            selected={formData.system[selectedSystem].workConditions.floorType === floorTypes.indexOf(floorType)}
                                        >
                                            {t(`floorType.${floorType}`)}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                                {formikProps.errors.system?.[selectedSystem]?.workConditions?.floorType && <FormHelperText error>{t(`${formikProps.errors.system?.[selectedSystem]?.workConditions?.floorType}`)}</ FormHelperText>}
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1} textAlign='center'>
                                <InputLabel>{t(`system.workConditions.temperature`)}</InputLabel>
                                <Box>
                                    <Slider
                                        disabled={!editMode}
                                        sx={{ width: '90%' }}
                                        getAriaLabel={() => 'Temperature range'}
                                        value={tempTemperature}
                                        onChange={(e, v) => setTempTemperature(v as number[])}
                                        onChangeCommitted={() => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.temperature`, value: tempTemperature }))}
                                        valueLabelDisplay="auto"
                                        min={-30}
                                        max={60}
                                        marks={[{ value: -30, label: '-30°C' }, { value: 0, label: '0°C' }, { value: 30, label: '30°C' }, { value: 60, label: '60°C' }]}
                                    />
                                </Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1} textAlign='center'>
                                <InputLabel>{t(`system.workConditions.humidity`)}</InputLabel>
                                <Box>
                                    <Slider
                                        disabled={!editMode}
                                        sx={{ width: '90%' }}
                                        getAriaLabel={() => 'Humidity range'}
                                        value={tempHumidity}
                                        onChange={(e, v) => setTempHumidity(v as number[])}
                                        onChangeCommitted={() => dispatch(handleInputMethod({ path: `system.${selectedSystem}.workConditions.humidity`, value: tempHumidity }))}
                                        valueLabelDisplay="auto"
                                        min={0}
                                        max={100}
                                        marks={[{ value: 0, label: '0%' }, { value: 25, label: '25%' }, { value: 50, label: '50%' }, { value: 75, label: '75%' }, { value: 100, label: '100%' }]}
                                    />
                                </Box>
                            </Stack>
                        </Grid>

                        {
                            (selectedSystem === 'lrkprk' || selectedSystem === 'autovna' || selectedSystem === 'agv')
                            &&
                            <Grid item xs={12}>
                                <CustomAlert collapseTrigger={(selectedSystem === 'lrkprk' || selectedSystem === 'autovna' || selectedSystem === 'agv') && (formData.system[selectedSystem].workConditions.temperature[0] <= 5)} severity="error" title={t(`system.${selectedSystem}.temperatureWarningTitle`)} text={t(`system.${selectedSystem}.temperatureWarning`)} />
                            </Grid>
                        }
                        {
                            isCondensationRisk(workConditions.temperature, workConditions.humidity)
                            &&
                            <Grid item xs={12}>
                                <CustomAlert collapseTrigger={((formData.system[selectedSystem].workConditions.humidity[1] > 15 && calculateDewPoint(formData.system[selectedSystem].workConditions.temperature[0], formData.system[selectedSystem].workConditions.humidity[1]) <= criticalElectronicsTemperature))} severity="warning" title={t(`system.condensationWarningTitle`)} text={t(`system.condensationWarning`)} />
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Box>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Stack spacing={1}>
                                                <CustomCheckbox
                                                    disabled={!editMode}
                                                    fieldName={`system.${selectedSystem}.workConditions.freezer`}
                                                    label="system.workConditions.freezer"
                                                    icon={AcUnit}
                                                />
                                                <CustomCheckbox
                                                    disabled={!editMode}
                                                    fieldName={`system.${selectedSystem}.workConditions.EX`}
                                                    label="system.workConditions.EX"
                                                    icon={Warning}
                                                />
                                                <CustomCheckbox
                                                    disabled={!editMode}
                                                    fieldName={`system.${selectedSystem}.workConditions.dangerousMaterials`}
                                                    label="system.workConditions.dangerousMaterials"
                                                    icon={Whatshot}
                                                />
                                                <CustomCheckbox
                                                    disabled={!editMode}
                                                    fieldName={`system.${selectedSystem}.workConditions.outside`}
                                                    label="system.workConditions.outside"
                                                    icon={WbSunnyIcon}
                                                />
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <CustomAlert collapseTrigger={((formData.system[selectedSystem].workConditions.EX || formData.system[selectedSystem].workConditions.dangerousMaterials || formData.system[selectedSystem].workConditions.temperature[0] <= 5 || formData.system[selectedSystem].workConditions.outside || formData.system[selectedSystem].workConditions.freezer))} severity="error" title={t(`system.workingConditionsTitle`)} text={t(`system.workingConditions`)} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomTextField
                                disabled={!editMode}
                                fieldName={`system.${[selectedSystem]}.workConditions.other`}
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                </Box>
            }
        />
    )
}