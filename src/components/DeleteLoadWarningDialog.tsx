import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad } from "../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { deleteLoadDialogOpen } from "../features/redux/reducers/deleteLoadDialogSlice";

export default function DeleteLoadWarningDialog() {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const deleteLoadDialog = useSelector((state: RootState) => state.deleteLoadDialog)

    return (
        <Dialog
            open={deleteLoadDialog.open}
            onClose={() => dispatch(deleteLoadDialogOpen(false))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("ui.dialog.loadDelete.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("ui.dialog.loadDelete.description")}
                </DialogContentText>
                <Stack direction='row' spacing={2} sx={{mt: 4}}>
                    <Button
                        variant="outlined"
                        onClick={() => dispatch(deleteLoadDialogOpen(false))}
                        autoFocus
                    >
                        {t("ui.dialog.loadDelete.cancel")}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                            dispatch(handleDeleteLoad(deleteLoadDialog.indexToDelete))
                            dispatch(deleteLoadDialogOpen(false))
                        }
                        }
                    >
                        {t("ui.dialog.loadDelete.confirm")}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}