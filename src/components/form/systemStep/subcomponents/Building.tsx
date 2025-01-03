import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Box, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, InputAdornment, InputLabel, Slider, Stack, Switch, TextField, Typography, useTheme, IconButton, Collapse, Alert, DialogTitle, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";
import { ISystemData, ISystems } from "../../../../features/interfaces";
import WarehouseLayout from "./WarehouseLayout";
import Incline from "./Incline";
import { useEffect, useState } from "react";
import InputGroup from "../../InputGroup";
import CloseIcon from '@mui/icons-material/Close';

export default function Building({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData.present);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [tempDimensions, setTempDimensions] = useState({
        width: trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.width),
        length: trimLeadingZeros(formData.system[selectedSystem].building.existingBuilding.length),
    });

    const [warehouseDialogOpen, setWarehouseDialogOpen] = useState(false);
    function extenderHandler() {
        setWarehouseDialogOpen(current => !current)
    }

    return (
        <InputGroup
            title={t(`system.subheader.building`)}
            extendedOpener={warehouseDialogOpen}
            extendedHandler={extenderHandler}
            content={
                <Stack spacing={2}>
                    <Stack direction='row' alignItems='center'>
                        <Typography color={!editMode ? 'text.disabled' : 'text.primary'} variant='body1'> {t(`system.building.existing`)}</Typography>
                        <Switch
                            disabled={!editMode}
                            checked={formData.system[selectedSystem].building.new}
                            onChange={(e) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.new`, value: e.target.checked }))}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography color={!editMode ? 'text.disabled' : 'text.primary'} variant='body1'>{t(`system.building.new`)}</Typography>
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
                                        readOnly={!editMode}
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
                    {!formData.system[selectedSystem].building.silo &&
                        <Stack spacing={2}>
                            <WarehouseSizeEditingFields selectedSystem={selectedSystem} />
                            <Divider />
                            <InputLabel>{t(`system.building.layout`)}</InputLabel>
                            <WarehouseLayout selectedSystem={selectedSystem} />
                            <Collapse in={(selectedSystem === 'agv') && (formData.system[selectedSystem].building.existingBuilding.equipment.filter(eq => eq.zHeight > 5).length >= 1)} >
                                <Alert id='system.tooHighPickupPoint' severity="error">{t(`system.tooHighPickupPoint`)}</Alert>
                            </Collapse>
                        </Stack>
                    }
                    <Dialog
                        sx={{ zIndex: 900 }}
                        fullScreen
                        open={warehouseDialogOpen}
                        onClose={extenderHandler}
                    >
                        <DialogTitle>
                            {t('ui.warehouseDialog.title')}
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={extenderHandler}
                            sx={{ ml: 'auto', position: 'absolute', top: 12, right: 20 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <DialogContent>
                            <Stack spacing={3}>
                                <WarehouseSizeEditingFields selectedSystem={selectedSystem} />
                                <WarehouseLayout selectedSystem={selectedSystem} />
                                <Collapse in={(selectedSystem === 'agv') && (formData.system[selectedSystem].building.existingBuilding.equipment.filter(eq => eq.zHeight > 5).length >= 1)} >
                                    <Alert id='system.tooHighPickupPoint' severity="error">{t(`system.tooHighPickupPoint`)}</Alert>
                                </Collapse>
                            </Stack>
                        </DialogContent>
                    </Dialog>
                </Stack>
            }
        />

    )
}

export function WarehouseSizeEditingFields({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const formData = useSelector((state: RootState) => state.formData.present);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [tempDimensions, setTempDimensions] = useState({
        width: 0,
        length: 0,
        height: 0
    });

    useEffect(() => {
        const systemCond = formData.system[selectedSystem]?.building.existingBuilding || {};
        setTempDimensions({
            width: systemCond.width || 0,
            length: systemCond.length || 0,
            height: systemCond.height || 0
        });
    }, [formData, selectedSystem]);

    const handleInputChange = (field: keyof ISystemData['building']['existingBuilding']) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempDimensions((prevDimensions) => ({
            ...prevDimensions,
            [field]: e.target.value,
        }));
    };

    function handleBlur() {
        const newWidth = +tempDimensions.width;
        const newLength = +tempDimensions.length;
        const newHeight = +tempDimensions.height;

        dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.width`, value: newWidth.toString() }));
        dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.length`, value: newLength.toString() }));
        dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.existingBuilding.height`, value: newHeight.toString() }));
    }

    return (
        <Box>
            <Grid container direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                <Grid item xs>
                    <Stack spacing={1} textAlign='left'>
                        <InputLabel>{t(`system.building.existingBuilding.height`)}</InputLabel>
                        <TextField
                            disabled={!editMode}
                            id={`system${[selectedSystem]}.building.existingBuilding.height`}
                            size="small"
                            fullWidth
                            type="number"
                            value={trimLeadingZeros(tempDimensions.height)}
                            onChange={handleInputChange('height')}
                            onBlur={handleBlur}
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
                <Grid item xs>
                    <Stack spacing={1} textAlign='left'>
                        <InputLabel>{t(`system.building.existingBuilding.width`)}</InputLabel>
                        <TextField
                            disabled={!editMode}
                            id={`system${[selectedSystem]}.building.existingBuilding.width`}
                            size="small"
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
                <Grid item xs>
                    <Stack spacing={1} textAlign='left'>
                        <InputLabel>{t(`system.building.existingBuilding.length`)}</InputLabel>
                        <TextField
                            disabled={!editMode}
                            id={`system${[selectedSystem]}.building.existingBuilding.length`}
                            size="small"
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
            </Grid>
        </Box>
    )
}