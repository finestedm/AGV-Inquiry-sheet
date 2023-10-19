import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, Box, Typography, useMediaQuery, useTheme, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { RootState } from "../../features/redux/store";
import { useSelector } from "react-redux";
import { initialFormDataState } from "../../features/redux/reducers/formDataSlice";
import { ISystemData, ISystems } from "../../features/interfaces";
import availableSystems from "../../data/availableSystems";
import CloseIcon from '@mui/icons-material/Close';


export default function CopyOtherSystemDataButton({ selectedSystem }: { selectedSystem: keyof ISystems }): JSX.Element {

    const [copyOtherSystemDataDialogOpen, setCopyOtherSystemDataDialogOpen] = useState<boolean>(false);

    const { t } = useTranslation();

    function handleClose() {
        setCopyOtherSystemDataDialogOpen(false)
    };

    return (
        <Box>
            <Tooltip title={t("ui.tooltip.copyOtherSystemData")}>
                <IconButton onClick={() => setCopyOtherSystemDataDialogOpen(true)}>
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
    const formData = useSelector((state: RootState) => state.formData);

    // Track the selected part for each system
    const [selectedParts, setSelectedParts] = useState<{ [key in keyof ISystems]?: keyof ISystemData }>({});

    useEffect(() => console.log(selectedParts), [selectedParts])

    const { t } = useTranslation();
    const theme = useTheme();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: keyof ISystems) {
        setSelectedParts((prevSelectedParts) => ({
            ...prevSelectedParts, [system]: event.target.value,
        }));
    }


    const systems = (Object.keys(initialFormDataState.system) as Array<keyof ISystems>);
    const parts = (Object.keys(initialFormDataState.system[selectedSystem]) as Array<keyof ISystemData>).filter(key => key !== 'selected');

    function isPartUnchanged(part: keyof ISystemData, systemToCheck?: keyof ISystems) {
        const systemsToCheck = systemToCheck ? [systemToCheck] : Object.keys(formData.system) as Array<keyof ISystems>;

        return systemsToCheck.every(system => {
            // the stringify below is needed for some weird reason - when loading localstorage data it is not recognized as the same as initialFormDataState even though it is virtually the same! JS in it's peak
            return JSON.stringify(formData.system[system][part]) === JSON.stringify(initialFormDataState.system[system][part]);
        });
    }


    function generateTableRows() {
        const dataRows = parts
            .filter((part) => {
                return !isPartUnchanged(part);
            })
            .map((part) => (
                <TableRow key={part}>
                    <TableCell>{t(`system.subheader.${part}`)}</TableCell>
                    {systems
                        .filter(system => system === selectedSystem)
                        .map((system) => (
                            <TableCell key={system}>
                                <Radio
                                    value={part}
                                    checked={selectedParts[system as keyof ISystems] === part}
                                    onChange={(e) => handleChange(e, system as keyof ISystems)}
                                    disabled={isPartUnchanged(part, system)}
                                />
                            </TableCell>
                        ))
                    }
                    {systems
                        .filter(system => system !== selectedSystem)
                        .map((system) => (
                            <TableCell key={system}>
                                <Radio
                                    value={part}
                                    checked={selectedParts[system as keyof ISystems] === part}
                                    onChange={(e) => handleChange(e, system as keyof ISystems)}
                                    disabled={isPartUnchanged(part, system)}
                                />
                            </TableCell>
                        ))
                    }
                </TableRow>
            ))

        return dataRows;
    }

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Dialog fullScreen={fullScreen} maxWidth='lg' open={isOpen} onClose={handleClose}>
            <DialogTitle>
                <Stack direction='row' spacing={2} flex={1} alignItems='start' justifyContent='space-between'>

                    <Typography variant="h5" >

                        {t("ui.dialog.copyDialog.title")}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("ui.table.head.part")}</TableCell>
                                <TableCell>{t('ui.dialog.copyDialog.noChange')}</TableCell>
                                {systems
                                    .filter(system => system !== selectedSystem)
                                    .map(system => (
                                        <TableCell>{t(`${availableSystems.filter(avSys => avSys.alt === system)[0].labelShort}`)}</TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>{generateTableRows()}</TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    {t("ui.button.copyDialog.cancel")}
                </Button>
                <Button color="secondary" onClick={() => console.log(selectedParts)}>
                    {t("ui.button.copyDialog.accept")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
