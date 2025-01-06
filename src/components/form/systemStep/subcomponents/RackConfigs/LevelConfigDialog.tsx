import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import LevelsConfigTable from "./LevelsConfigTable";
import { ISystems, TLevelsConfig } from "../../../../../features/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/redux/store";
import CloseIcon from '@mui/icons-material/Close';
import LevelConfigDrawing from "./LevelConfigDrawing";

export default function LevelConfigDialog({ levelConfigDialogOpen, handleLevelConfigDialogClose, selectedSystem, configId }: { levelConfigDialogOpen: boolean, handleLevelConfigDialogClose: () => void, selectedSystem: keyof ISystems; configId?: TLevelsConfig['id'] }) {
    const formData = useSelector((state: RootState) => state.formData)
    const levelConfigs = formData.system[selectedSystem].levelConfigs
    const selectedLevelConfig = levelConfigs.find(level => level.id === configId)
    const { t } = useTranslation();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog
            maxWidth='lg'
            fullScreen={fullScreen}
            open={levelConfigDialogOpen}
            onClose={() => handleLevelConfigDialogClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction='row' justifyContent='space-between' alignItems='baseline'>
                    <Stack spacing={1} direction='row'>
                        <Box>Konfiguracja {levelConfigs.findIndex(conf => conf.id === configId) + 1}</Box>
                        <Box color={theme.palette.text.secondary}>(0 + {levelConfigs.find(conf => conf.id === configId)?.levels.length})</Box>
                    </Stack>
                    <Box>
                        <IconButton onClick={handleLevelConfigDialogClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Stack>
            </DialogTitle>
            <DialogContent sx={{ px: 0 }}>
                <Stack spacing={2}>
                    <Box>{configId && <LevelsConfigTable selectedSystem={selectedSystem} configId={configId} />}</Box>
                    <Box sx={{ px: 2 }}>
                        <Typography gutterBottom variant="h6" color="textPrimary">Podgląd</Typography>
                        {selectedLevelConfig && <LevelConfigDrawing selectedSystem={selectedSystem} levels={selectedLevelConfig.levels} />}
                    </Box>
                </Stack>
            </DialogContent>
            {/* <DialogActions>
                <Stack direction='row' flex={1} justifyContent='end' spacing={2}>

                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        sx={{ fontWeight: 700 }}
                        onClick={() => {

                        }}
                    >
                        {t("ui.dialog.levelConfigChange.confirm")}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => { }}
                        autoFocus
                    >
                        {t("ui.dialog.levelConfigChange.cancel")}
                    </Button>
                </Stack>
            </DialogActions> */}
        </Dialog >
    )
}

