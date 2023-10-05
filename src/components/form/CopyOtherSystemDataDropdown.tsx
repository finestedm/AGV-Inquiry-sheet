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
import { IFormData, ISystems } from "../../features/interfaces";

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
    const [selectedParts, setSelectedParts] = useState<{ [key in keyof ISystems]?: string }>({});

    useEffect(() => console.log(selectedParts), [selectedParts])

    const { t } = useTranslation();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: keyof ISystems) {
        console.log(event.target)
        setSelectedParts((prevSelectedParts) => ({
            ...prevSelectedParts, [system]: event.target.value,
        }));
    }

    function isPartUnchanged(system: keyof ISystems, part: string, initialFormData: IFormData) {
        return formData.system[system][part] === initialFormData.system[system][part];
    }

    const systems: ISystems = formData.system;
    const parts = Object.keys(initialFormDataState.system[selectedSystem]);

    function generateTableRows() {
        const dataRows = parts
            .filter((part) => {
                return systems[selectedSystem] && !isPartUnchanged(selectedSystem, part, initialFormDataState);
            })
            .map((part) => (
                <TableRow key={part}>
                    <TableCell>{part}</TableCell>
                    {Object.keys(systems).map((system) => (
                        system !== selectedSystem && (
                            <TableCell key={system}>
                                <FormControlLabel
                                    control={
                                        <Radio
                                            value={part}
                                            checked={selectedParts[system as keyof ISystems] === part}
                                            onChange={(e) => handleChange(e, system as keyof ISystems)}
                                            disabled={isPartUnchanged(system as keyof ISystems, part, initialFormDataState)}
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
                                {Object.keys(systems)
                                    .filter(system => system !== selectedSystem)
                                    .map(system => (
                                        <TableCell>{system}</TableCell>
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
