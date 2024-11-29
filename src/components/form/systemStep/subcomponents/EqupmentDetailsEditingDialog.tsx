import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, Grid, InputAdornment, InputLabel, Stack, SwipeableDrawer, TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad, updateEquipment } from "../../../../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateDeleteLoadDialog } from "../../../../features/redux/reducers/deleteLoadDialogSlice";
import tinycolor from "tinycolor2";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IEquipment, ISystems } from "../../../../features/interfaces";
import CustomTextField from "../../CustomTextField";

export default function EquipmentDetailsEditingDialog({ equipmentDetailsEditingDialogOpen, handleClosingEqDetailsDialog, selectedEq, selectedSystem }: { equipmentDetailsEditingDialogOpen: boolean, handleClosingEqDetailsDialog: () => void, selectedEq: IEquipment["id"], selectedSystem: keyof ISystems }) {
    const { t } = useTranslation()
    const theme = useTheme();
    const dispatch = useDispatch()
    const equipments = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding.equipment)
    const eqDetails = useSelector((state: RootState) => equipments.find(eq => eq.id === selectedEq))
    const [eqTempDetails, setEqTempDetails] = useState(eqDetails)

    useEffect(() => {
        setEqTempDetails(eqDetails)
    }, [eqDetails])

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
            anchor='bottom'
            open={equipmentDetailsEditingDialogOpen}
            onClose={handleClosingEqDetailsDialog}
        >
            <DialogTitle id="alert-dialog-equipment-editing-dialog">
                {t("ui.dialog.equipmentEditing.title")} {eqDetails?.type}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-equipment-editing-dialog">
                    {eqTempDetails && (
                        <Grid container spacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.x`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.x).toFixed(1)}
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
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.y`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.y).toFixed(1)}
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
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.rotation`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.rotation).toFixed(0)}
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
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.width`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.width).toFixed(1)}
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
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.equipment.height`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.height).toFixed(1)}
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
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                <InputLabel>{t(`system.building.existingBuilding.zHeight`)}</InputLabel>
                                <TextField
                                    value={Number(eqTempDetails?.zHeight).toFixed(2)}
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
                            </Grid>
                        </ Grid>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
                <Button
                    variant="contained"
                    color="error"
                    disableElevation
                    sx={{ color: tinycolor(theme.palette.error.main).lighten(50).toHexString(), fontWeight: 700 }}
                    onClick={handleEqDetailsChange}

                >
                    {t("ui.dialog.EquipmentDetailsEditing.confirm")}
                </Button>
                <Button
                    variant="outlined"
                    autoFocus
                    onClick={handleClosingEqDetailsDialog}
                >
                    {t("ui.dialog.EquipmentDetailsEditing.cancel")}
                </Button>
            </DialogActions>
        </Drawer >
    )
}