import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { handleDeleteLoad } from "../../../../features/redux/reducers/formDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { updateDeleteLoadDialog } from "../../../../features/redux/reducers/deleteLoadDialogSlice";
import tinycolor from "tinycolor2";

export default function DeleteLoadWarningDialog() {
    const { t } = useTranslation()
    const theme = useTheme();
    const dispatch = useDispatch()

    const deleteLoadDialog = useSelector((state: RootState) => state.deleteLoadDialog)

    return (
        <Dialog
            open={deleteLoadDialog.open}
            onClose={() => dispatch(updateDeleteLoadDialog({ open: false, updatedLoads: [], selectedSystem: undefined }))}
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
                <Stack direction='row' flex={1} justifyContent='end' spacing={2} sx={{ mt: 4 }}>

                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        sx={{ color: tinycolor(theme.palette.error.main).lighten(55).toHexString() }}
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
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}