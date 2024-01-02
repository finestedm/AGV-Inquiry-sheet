import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, Checkbox, FormControlLabel, Grid, InputAdornment, InputLabel, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";
import { ISystems } from "../../../../features/interfaces";
import WarehouseLayout from "./Warehouse";
import Incline from "./Incline";
import { useState } from "react";

export default function Building({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode)
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [tempDimensions, setTempDimensions] = useState({
        width: trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.width),
        length: trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.length),
    });

    const handleInputChange = (field: 'width' | 'length') => (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempDimensions((prevDimensions) => ({
            ...prevDimensions,
            [field]: e.target.value,
        }));
    };

    const handleBlur = () => {
        const newWidth = +tempDimensions.width;
        const newLength = +tempDimensions.length;

        try {
            if (newWidth < newLength) {
                // Swap the values if the condition is met
                dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.width`, value: newLength.toString() }));
                dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.length`, value: newWidth.toString() }));
            } else {
                dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.width`, value: newWidth.toString() }));
                dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.length`, value: newLength.toString() }));
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <Stack spacing={2}>
            <Box><Typography variant="h5" textAlign='left'>{t(`system.subheader.building`)}</Typography></Box>
            <Stack direction='row' alignItems='center'>
                <InputLabel>{t(`system.building.existing`)}</InputLabel>
                <Switch
                    disabled={!editMode}
                    checked={formData.system[selectedSystem].building.new}
                    onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.new`, value: e.target.checked }))}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <InputLabel>{t(`system.building.new`)}</InputLabel>
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
                            <Stack spacing={1} textAlign='left'>
                                <InputLabel>{t(`system.building.existingBuilding.height`)}</InputLabel>
                                <TextField
                                    disabled={!editMode}
                                    id="system.asrs.building.existingBuilding.height"
                                    fullWidth
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
                            </Stack>
                        </Grid>
                        <Grid item>X</Grid>

                        <Grid item xs>
                            <Stack spacing={1} textAlign='left'>
                                <InputLabel>{t(`system.building.existingBuilding.width`)}</InputLabel>
                                <TextField
                                    disabled={!editMode}
                                    id="system.asrs.building.existingBuilding.width"
                                    fullWidth
                                    type="number"
                                    value={trimLeadingZeros(tempDimensions.width)}
                                    onChange={handleInputChange('width')}
                                    onBlur={handleBlur}
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
                            </Stack>
                        </Grid>
                        <Grid item>X</Grid>
                        <Grid item xs>
                            <Stack spacing={1} textAlign='left'>
                                <InputLabel>{t(`system.building.existingBuilding.length`)}</InputLabel>
                                <TextField
                                    disabled={!editMode}
                                    id="system.asrs.building.existingBuilding.length"
                                    fullWidth
                                    type="number"
                                    value={trimLeadingZeros(tempDimensions.length)}
                                    onChange={handleInputChange('length')}
                                    onBlur={handleBlur}
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
                            </Stack>
                        </Grid>
                        {/* <Box sx={{border: '3px solid black', width: '100%', aspectRatio: formData.system[selectedSystem].building.existingBuilding.length / formData.system[selectedSystem].building.existingBuilding.width}} /> */}
                    </Grid>
                }
            </Box>
            <WarehouseLayout selectedSystem={selectedSystem} />
        </Stack>
    )
}