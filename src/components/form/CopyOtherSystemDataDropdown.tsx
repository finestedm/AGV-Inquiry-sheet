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
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { RootState } from "../../features/redux/store";
import { useSelector } from "react-redux";
import { initialFormDataState } from "../../features/redux/reducers/formDataSlice";
import { IFormData, ISystemData, ISystems } from "../../features/interfaces";
import availableSystems from "../../data/availableSystems";

export default function CopyOtherSystemDataButton({ selectedSystem }: { selectedSystem: keyof ISystems }): JSX.Element {
    const [copyOtherSystemDataDialogOpen, setCopyOtherSystemDataDialogOpen] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleClose = () => { setCopyOtherSystemDataDialogOpen(false) };

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

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: keyof ISystems) {
        setSelectedParts((prevSelectedParts) => ({
            ...prevSelectedParts, [system]: event.target.value,
        }));
    }


    const systems = (Object.keys(initialFormDataState.system) as Array<keyof ISystems>).filter(system => system !== selectedSystem);
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
                    {systems.map((system) => (
                        system !== selectedSystem && (
                            <TableCell key={system}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            value={part}
                                            checked={selectedParts[system as keyof ISystems] === part}
                                            onChange={(e) => handleChange(e, system as keyof ISystems)}
                                            disabled={isPartUnchanged(part, system)}
                                        />
                                    }
                                    label=""
                                />
                            </TableCell>
                        )
                    ))}
                </TableRow>
            ));
        return dataRows;
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{t("ui.dialog.copyDialog.title")}</DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("ui.table.head.part")}</TableCell>
                                {systems.map(system => (
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
