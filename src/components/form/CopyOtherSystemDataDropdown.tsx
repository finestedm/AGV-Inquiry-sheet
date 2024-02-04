import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Box,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
    Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { RootState } from "../../features/redux/store";
import { useSelector } from "react-redux";
import { handleCopySystemData, initialFormDataState } from "../../features/redux/reducers/formDataSlice";
import { IFormData, ISystemData, ISystems } from "../../features/interfaces";
import availableSystems from "../../data/availableSystems";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../features/redux/reducers/snackBarSlice";
import isPartUnchanged from "../../features/variousMethods/isPartUnchanged";
import tinycolor from "tinycolor2";


export default function CopyOtherSystemDataButton({ selectedSystem }: { selectedSystem: keyof ISystems }): JSX.Element {
    const [copyOtherSystemDataDialogOpen, setCopyOtherSystemDataDialogOpen] = useState<boolean>(false);
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary' ;

    const { t } = useTranslation();

    function handleClose() {
        setCopyOtherSystemDataDialogOpen(false)
    };

    return (
        <Box>
            <Tooltip title={t("ui.tooltip.copyOtherSystemData")}>
                <IconButton disabled={!editMode} onClick={() => setCopyOtherSystemDataDialogOpen(true)}>
                    <ContentCopyIcon />
                </IconButton>
            </Tooltip>
            <CopyOtherSystemDataDialog
                isOpen={copyOtherSystemDataDialogOpen}
                handleClose={handleClose}
                selectedSystem={selectedSystem}
            />
        </Box>
    );
}

interface CopyOtherSystemDataDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    selectedSystem: keyof ISystems;
}

function CopyOtherSystemDataDialog({ isOpen, handleClose, selectedSystem }: CopyOtherSystemDataDialogProps): JSX.Element {
    const { t } = useTranslation();
    const theme = useTheme();
    const darkMode = useSelector((state: RootState) => state.darkMode);
    const formData = useSelector((state: RootState) => state.formData.present);
    const systems = (Object.keys(initialFormDataState.system) as Array<keyof ISystems>);
    const parts = (Object.keys(initialFormDataState.system[selectedSystem]) as Array<keyof ISystemData>).filter(key => key !== 'selected' && key !== 'flow');
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const dispatch = useDispatch();

    const [selectedParts, setSelectedParts] = useState<{ [key in keyof ISystems]: (keyof ISystemData)[] }>({
        asrs: [],
        lrkprk: [],
        agv: [],
        autovna: [],

    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: keyof ISystems) {
        const selectedPart = event.target.value as keyof ISystemData;

        // if system is the currently selected system then remove the part from all other systems selected part arrays
        if (system === selectedSystem) {
            setSelectedParts((prevSelectedParts) => {
                const updatedParts = { ...prevSelectedParts };
                systems.forEach((system) => {
                    updatedParts[system] = updatedParts[system].filter((part) => part !== selectedPart);
                });
                return updatedParts;
            })
        } else { // if it is other system the add the part to the other system array
            setSelectedParts((prevSelectedParts) => {
                const updatedParts = { ...prevSelectedParts };

                // Remove the selected part from other systems
                systems.forEach((otherSystem) => {
                    if (otherSystem !== system) {
                        updatedParts[otherSystem] = updatedParts[otherSystem].filter((part) => part !== selectedPart);
                    }
                });

                // Check if the selected part is already in the current system
                const isPartInSystem = updatedParts[system].includes(selectedPart as keyof ISystemData);

                // Add or update the selected part in the current system only if it's not already there
                if (!isPartInSystem) {
                    updatedParts[system] = [...updatedParts[system], selectedPart as keyof ISystemData];
                }

                return updatedParts;
            });
        }
    }

    function generateTableRows() {
        const dataRows = parts
            .filter((part) => {
                return !isPartUnchanged({ formData, part });
            })
            .map((part) => (
                <TableRow key={part}>
                    <TableCell><Typography variant="body2" color={!systems.some((otherSystem) => selectedParts[otherSystem].includes(part)) ? 'text.secondary' : 'text.primary'}>{t(`system.subheader.${part}`)}</Typography></TableCell>
                    {systems
                        .filter(system => system === selectedSystem)
                        .map(system => (
                            <TableCell key={system}>
                                <Radio
                                    value={part}
                                    checked={!systems.some((otherSystem) => selectedParts[otherSystem].includes(part))}
                                    onChange={(e) => handleChange(e, system as keyof ISystems)}
                                />
                            </TableCell>
                        ))
                    }
                    {systems
                        .filter(system => system !== selectedSystem)
                        .map((system) => (
                            <TableCell key={system}>
                                <Radio
                                    color='primary'
                                    value={part}
                                    checked={selectedParts[system as keyof ISystems].includes(part)}
                                    onChange={(e) => handleChange(e, system as keyof ISystems)}
                                    disabled={isPartUnchanged({ formData, part, systemToCheck: system }) || !formData.system[system].selected}
                                />
                            </TableCell>
                        ))}
                </TableRow>
            ))

        return dataRows;
    }

    return (
        <Dialog fullScreen={fullScreen} maxWidth='lg' open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h5" >
                    {t("ui.dialog.copyDialog.title")}
                </Typography>
            </DialogTitle>
            <DialogContent sx={{px: 2}}>
                <TableContainer>
                    <Box mt={2} >
                        <Table  sx={{ backgroundColor: theme.palette.background.default }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell><Typography fontWeight={600} variant="body2">{t("ui.table.head.part")}</Typography></TableCell>
                                    <TableCell><Typography fontWeight={600} variant="body2">{t('ui.dialog.copyDialog.noChange')}</Typography></TableCell>
                                    {systems
                                        .filter(system => system !== selectedSystem)
                                        .map(system => (
                                            <TableCell><Typography fontWeight={600} variant="body2">{t(`${availableSystems.filter(avSys => avSys.alt === system)[0].labelShort}`)}</Typography></TableCell>
                                        ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>{generateTableRows()}</TableBody>
                        </Table>
                    </Box>
                </TableContainer>
            </DialogContent>
            <DialogActions sx={{px: 2}}>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{ color: darkMode ? tinycolor(theme.palette.primary.main).darken(45).toHexString() : theme.palette.background.default, fontWeight: 500 }}
                    onClick={() => {
                        dispatch(handleCopySystemData({ selectedSystem, selectedParts }))
                        dispatch(openSnackbar({ message: 'Data has been copied' }));
                        handleClose()
                    }}>
                    {t("ui.button.copyDialog.accept")}
                </Button>
                <Button color="primary" variant="outlined" onClick={handleClose}>
                    {t("ui.button.copyDialog.cancel")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}