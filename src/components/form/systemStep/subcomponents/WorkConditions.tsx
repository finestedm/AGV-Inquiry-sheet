import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { calculateDewPoint } from "../../../../features/variousMethods/dewPointCalculation";
import { AcUnit, Warning, Whatshot } from "@mui/icons-material";
import CustomTextField from "../../CustomTextField";
import { criticalElectronicsTemperature } from "../../../../data/criticalElectronicsTemperature";
import theme from "../../../../theme";
import { ISystems } from "../../../../features/interfaces";

export default function WorkConditions({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();
    const { t } = useTranslation();

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
                    <Grid item xs={12}>
                        <Collapse in={((formData.system[selectedSystem].workConditions.humidity[1] > 15 && calculateDewPoint(formData.system[selectedSystem].workConditions.temperature[0], formData.system[selectedSystem].workConditions.humidity[0]) <= criticalElectronicsTemperature))} collapsedSize={0}>
                            <Alert sx={{ border: `1px solid ${theme.palette.warning.light}` }} id='system.asrs.condendartionWarning' severity="warning">{t(`system.condensationWarning`)}</Alert>
                        </Collapse>
                    </Grid>
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