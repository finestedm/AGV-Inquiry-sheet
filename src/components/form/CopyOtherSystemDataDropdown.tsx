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
import { IFormData, ISystems, Iasrs } from "../../features/interfaces";

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
    const [selectedParts, setSelectedParts] = useState<{ [part: keyof Iasrs]: keyof ISystems }>({});

    // useEffect(() => console.log(selectedParts), [selectedParts])

    const { t } = useTranslation();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: keyof ISystems) {
        const selectedPart = event.target.value;

        setSelectedParts((prevSelectedParts) => {
            const updatedParts = { ...prevSelectedParts };
            updatedParts[selectedPart] = system;
            return updatedParts;
        });
    }

    function isPartUnchanged(system: keyof ISystems, part: keyof Iasrs, initialFormData: IFormData) {
        console.log(formData.system[system][part], initialFormData.system[system][part])
        return (formData.system[system][part] === initialFormData.system[system][part]);
    }

    const systems: ISystems = formData.system;
    const parts = Object.keys(initialFormDataState.system[selectedSystem]);

    function generateTableRows() {
        const dataRows = (
            <>
                {/* Header row with part names and systems */}
                <TableRow>
                    <TableCell>{t("ui.table.head.part")}</TableCell>
                    {Object.keys(systems)
                        .filter((systemKey) => systemKey !== selectedSystem)
                        .filter((systemKey) => systems[systemKey as keyof ISystems].selected)
                        .filter((systemKey) => parts.some((part) => !isPartUnchanged(systemKey as keyof ISystems, part, initialFormDataState)))
                        .map((systemKey) => (
                            <TableCell key={systemKey}>{systemKey}</TableCell>
                        ))}
                </TableRow>
    
                {/* Rows with radio buttons for each part */}
                {parts
                    .filter((part) => part !== "selected")
                    .map((part) => (
                        <TableRow key={part}>
                            <TableCell>{part}</TableCell>
                            {Object.keys(systems)
                                .filter((systemKey) => systemKey !== selectedSystem)
                                .filter((systemKey) => systems[systemKey as keyof ISystems].selected)
                                .filter((systemKey) => !isPartUnchanged(systemKey as keyof ISystems, part, initialFormDataState))
                                .map((systemKey) => {
                                    const system = systemKey as keyof ISystems;
    
                                    return (
                                        <TableCell key={system}>
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        value={part}
                                                        checked={selectedParts[part] === system}
                                                        onChange={(e) => handleChange(e, system)}
                                                        disabled={isPartUnchanged(system, part, initialFormDataState)}
                                                    />
                                                }
                                                label=""
                                            />
                                        </TableCell>
                                    );
                                })}
                        </TableRow>
                    ))}
            </>
        );
    
        return dataRows;
    }
    
    


    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{t("ui.dialog.copyDialog.title")}</DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
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
