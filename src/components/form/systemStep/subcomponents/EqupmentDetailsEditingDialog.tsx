import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad } from "../../../../features/redux/reducers/formDataSlice";
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
    const eqDetails = useSelector((state: RootState) => state.formData.system[selectedSystem].building.existingBuilding.equipment.find(eq => eq.id === selectedEq))
    const [eqTempDetails, setEqTempDetails] = useState(eqDetails)

    useEffect(() => {
        setEqTempDetails(eqDetails)
    }, [eqDetails])

    return (
        <Dialog
            open={equipmentDetailsEditingDialogOpen}
            onClose={handleClosingEqDetailsDialog}
            aria-labelledby="alert-dialog-equipment-editing-dialog"
            aria-describedby="alert-dialog-equipment-editing-dialog"
        >
            <DialogTitle id="alert-dialog-equipment-editing-dialog">
                {t("ui.dialog.equipmentEditing.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-equipment-editing-dialog">
                    {eqTempDetails && (
                        <>
                            <TextField
                                value={eqTempDetails?.width}
                                type="number"
                                onChange={(e) => setEqTempDetails({ ...eqTempDetails, width: Number(e.target.value) })}
                            />

                            {eqTempDetails?.height}
                        </>
                    )}
                </DialogContentText>
                <Stack direction='row' flex={1} justifyContent='end' spacing={2} sx={{ mt: 4 }}>

                    {/* <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        sx={{ color: tinycolor(theme.palette.error.main).lighten(50).toHexString(), fontWeight: 700 }}
                        onClick={() => {
                            if (deleteLoadDialog.temporarySelectedSystem) {
                                dispatch(handleDeleteLoad({ updatedLoads: deleteLoadDialog.temporaryUpdatedLoads, selectedSystem: deleteLoadDialog.temporarySelectedSystem }));
                                dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: undefined }))
                            }
                        }}
                    >
                        {t("ui.dialog.loadDelete.confirm")}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: undefined }))}
                        autoFocus
                    >
                        {t("ui.dialog.loadDelete.cancel")}
                    </Button> */}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}