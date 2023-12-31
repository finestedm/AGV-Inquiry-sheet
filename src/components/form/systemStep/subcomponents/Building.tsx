import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";
import { ISystems } from "../../../../features/interfaces";
import WarehouseLayout from "./Warehouse";
import Incline from "./Incline";

export default function Building({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            <Box><Typography variant="h5" textAlign='left'>{t(`system.subheader.building`)}</Typography></Box>
            <Stack direction='row' alignItems='center'>
                <Typography>{t(`system.building.existing`)}</Typography>
                <Switch
                    disabled={!editMode}
                    checked={formData.system[selectedSystem].building.new}
                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.new`, value: e.target.checked }))}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>{t(`system.building.new`)}</Typography>
            </Stack>
            {(selectedSystem === 'agv') &&
                <Incline selectedSystem={selectedSystem} />
            }
            {(selectedSystem === 'asrs') &&
                <Stack>
                    <FormControlLabel
                        id="system-asrs-building-silo"
                        disabled={!editMode}
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
                                disabled={!editMode}
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
                                disabled={!editMode}
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
                                disabled={!editMode}
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
            <WarehouseLayout selectedSystem={selectedSystem} />
        </Stack>
    )
}