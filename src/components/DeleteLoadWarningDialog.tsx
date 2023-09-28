import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad } from "../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { updateDeleteLoadDialog } from "../features/redux/reducers/deleteLoadDialogSlice";

export default function DeleteLoadWarningDialog() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const deleteLoadDialog = useSelector((state: RootState) => state.deleteLoadDialog)

    return (
        <Dialog
            open={deleteLoadDialog.open}
            onClose={() => dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: '' }))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("ui.dialog.loadDelete.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("ui.dialog.loadDelete.description1")} <br />  {t("ui.dialog.loadDelete.description2")}
                </DialogContentText>
                <Stack direction='row' flex={1} justifyContent='space-between' spacing={2} sx={{ mt: 4 }}>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            dispatch(handleDeleteLoad({ updatedLoads: deleteLoadDialog.temporaryUpdatedLoads, selectedSystem: deleteLoadDialog.temporarySelectedSystem }));
                            dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: '' }))
                        }}
                    >
                        {t("ui.dialog.loadDelete.confirm")}
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: '' }))}
                        autoFocus
                    >
                        {t("ui.dialog.loadDelete.cancel")}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}