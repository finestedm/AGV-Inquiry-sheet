import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad, resetFormData } from "../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { updateDeleteLoadDialog } from "../features/redux/reducers/deleteLoadDialogSlice";
import { updateClearFormDataDialog } from "../features/redux/reducers/clearFormDataDialogSlice";
import { openSnackbar } from "../features/redux/reducers/snackBarSlice";

export default function ClearFormDataDialog() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const clearFormDataDialogOpen = useSelector((state: RootState) => state.clearFormDataDialog.open)

    function handleReset() {
        dispatch(resetFormData())
        dispatch(openSnackbar({ message: t('ui.snackBar.message.clearForm') }));
        dispatch(updateClearFormDataDialog({ open: false }))
    }

    return (
        <Dialog
            open={clearFormDataDialogOpen}
            onClose={() => dispatch(updateClearFormDataDialog({ open: false }))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("ui.dialog.clearForm.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("ui.dialog.clearForm.description1")} <br />  {t("ui.dialog.clearForm.description2")}
                </DialogContentText>
                <Stack direction='row' flex={1} justifyContent='end' spacing={2} sx={{ mt: 4 }}>

                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        onClick={() => { handleReset() }}
                    >
                        {t("ui.dialog.clearForm.confirm")}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(updateClearFormDataDialog({ open: false }))}
                        autoFocus
                    >
                        {t("ui.dialog.clearForm.cancel")}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}