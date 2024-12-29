import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Grid, InputAdornment, InputLabel, ListItemText, MenuItem, Select, Stack, SwipeableDrawer, TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad, updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import tinycolor from "tinycolor2";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import { updateEditEquipmentDrawer } from "../../../../features/redux/reducers/editEquipmentDrawer";
import availableEquipment from "../../../../data/availableEquipment";
import trimLeadingZeros from "../../../../features/variousMethods/trimLeadingZero";

export default function EquipmentDetailsEditingDialog({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const { t } = useTranslation()
    const theme = useTheme();
    const dispatch = useDispatch()
    const equipmentDetailsEditingDialogOpen = useSelector((state: RootState) => state.editEquipmentDrawer.open)
    const eqId = useSelector((state: RootState) => state.editEquipmentDrawer.eqId)
    const equipments = useSelector((state: RootState) => state.formData.present.system[selectedSystem].building.existingBuilding.equipment)
    const eqDetails = useSelector((state: RootState) => equipments.find(eq => eq.id === eqId))
    const [eqTempDetails, setEqTempDetails] = useState(eqDetails)

    useEffect(() => {
        setEqTempDetails(eqDetails)
    }, [eqDetails])

    function handleClosingEqDetailsDialog() {
        dispatch(updateEditEquipmentDrawer({ open: false }))
    }

    function handleEqDetailsChange() {
        if (eqTempDetails) {
            const updatedEquipment = equipments.map(eq =>
                eq.id === eqTempDetails.id ? { ...eq, ...eqTempDetails } : eq
            );

            // Dispatch the updated equipment array to Redux
            dispatch(updateEquipment({ updatedEquipment, selectedSystem }))
            handleClosingEqDetailsDialog()
        }
    }

    return (
        <Drawer
            open={equipmentDetailsEditingDialogOpen}
            onClose={handleClosingEqDetailsDialog}
        >
            <DialogTitle id="alert-dialog-equipment-editing-dialog">
                {t("ui.dialog.equipmentEditing.title")} {eqDetails?.type}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-equipment-editing-dialog">
                    {eqTempDetails && (
                        <Stack spacing={3}>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.type`)}</InputLabel>
                                <Autocomplete
                                    freeSolo
                                    value={eqTempDetails?.type}
                                    options={availableEquipment}
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                    onChange={(e, v) => {
                                        v && setEqTempDetails({ ...eqTempDetails, type: v });
                                    }}
                                    onInputChange={(e, newInputValue) => {
                                        setEqTempDetails({ ...eqTempDetails, type: newInputValue });
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.x`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.x)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, x: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.y`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.y)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, y: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.rotation`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.rotation)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, rotation: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                °
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.width`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.width)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, width: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.height`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.height)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, height: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                            <Box>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.zHeight`)}</InputLabel>
                                <TextField
                                    value={trimLeadingZeros(eqTempDetails?.zHeight)}
                                    fullWidth
                                    type="number"
                                    onChange={(e) => setEqTempDetails({ ...eqTempDetails, zHeight: Number(e.target.value) })}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                m
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </ Stack>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    sx={{ color: tinycolor(theme.palette.error.main).lighten(50).toHexString(), fontWeight: 700 }}
                    onClick={handleEqDetailsChange}

                >
                    {t("ui.dialog.equipmentEditing.confirm")}
                </Button>
                <Button
                    variant="outlined"
                    autoFocus
                    onClick={handleClosingEqDetailsDialog}
                >
                    {t("ui.dialog.equipmentEditing.cancel")}
                </Button>
            </DialogActions>
        </Drawer >
    )
}