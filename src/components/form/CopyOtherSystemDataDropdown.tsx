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
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { RootState } from "../../features/redux/store";
import { useSelector } from "react-redux";
import { initialFormDataState } from "../../features/redux/reducers/formDataSlice";

interface CopyOtherSystemDataProps {
    selectedSystem: string;
}

export default function CopyOtherSystemDataButton({ selectedSystem }: CopyOtherSystemDataProps): JSX.Element {
    const [copyOtherSystemDataDialogOpen, setCopyOtherSystemDataDialogOpen] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleClose = () => { setCopyOtherSystemDataDialogOpen(false) };

    return (
        <>
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
        </>
    );
}

interface CopyOtherSystemDataDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    selectedSystem: string;
}

function CopyOtherSystemDataDialog({ isOpen, handleClose, selectedSystem, }: CopyOtherSystemDataDialogProps): JSX.Element {
    const formData = useSelector((state: RootState) => state.formData);

    // Track the selected part for each system
    const [selectedParts, setSelectedParts] = useState<Record<string, string>>({});

    const { t } = useTranslation();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, system: string) {
        setSelectedParts((prevSelectedParts) => ({
            ...prevSelectedParts,
            [system]: event.target.value,
        }));
    };

    useEffect(() => {
        console.log(selectedParts)
    }, [selectedParts])

    const isPartUnchanged = (
        system: string,
        part: string,
        initialFormData: any
    ) => {
        return (
            JSON.stringify(formData.system[system][part]) ===
            JSON.stringify(initialFormData.system[system][part])
        );
    };

    const systems = Object.keys(formData.system).filter(system => system !== selectedSystem);
    const parts = Object.keys(initialFormDataState.system[selectedSystem]);

    function generateTableRows() {

        const dataRows = parts
            .filter((part) => {
                return systems.some(
                    (system) => !isPartUnchanged(system, part, initialFormDataState)
                );
            })
            .map((part) => (
                <TableRow key={part}>
                    <TableCell>{part}</TableCell>
                    {systems.map((system) => (
                        <TableCell key={system}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        checked={selectedParts[system] === part}
                                        onChange={(e) => handleChange(e, system)}
                                        disabled={isPartUnchanged(system, part, initialFormDataState)}
                                    />
                                }
                                label=""
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ));

        return [dataRows];
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
                                {systems.map((system) => (
                                    <TableCell key={system}>{system}</TableCell>
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
