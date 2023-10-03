import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { initialFormDataState } from "../features/redux/reducers/formDataSlice";
import { Iasrs } from "../features/interfaces";
import { SetStateAction, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useTranslation } from "react-i18next";

export default function CopyOtherSystemDataButton({ selectedSystem }: { selectedSystem: string }) {

    type AsrsSubpart = keyof Iasrs;
    const [changedSystems, setChangedSystem] = useState<Record<string, AsrsSubpart[]>>({});
    const [selectedChangedState, setSelectedChangedState] = useState<Record<string, AsrsSubpart[]>>({});
    const [copyOtherSystemDataDialogOpen, setCopyOtherSystemDataDialogOpen] = useState<boolean>(false)
    const formData = useSelector((state: RootState) => state.formData);

    const { t } = useTranslation();

    const handleClose = () => {
        setCopyOtherSystemDataDialogOpen(false)
    }

    useEffect(() => {
        const systems = Object.keys(formData.system);

        const newChangedSystems = systems.reduce((result, system) => {
            if (system !== selectedSystem) {
                const subparts = Object.keys(formData.system[system]);

                const changedSystemInSystems = subparts
                    .filter(subpart => {
                        return (
                            JSON.stringify(formData.system[system][subpart]) !==
                            JSON.stringify(initialFormDataState.system[system][subpart])
                        );
                    });

                if (changedSystemInSystems.length > 0) {
                    result[system] = changedSystemInSystems as AsrsSubpart[];
                }
            }

            return result;
        }, {} as Record<string, AsrsSubpart[]>);

        setChangedSystem(newChangedSystems);
    }, [formData, selectedSystem]);

    return (
        <>
            <Tooltip title={t('ui.tooltip.copyOtherSystemData')}>
                <IconButton onClick={() => setCopyOtherSystemDataDialogOpen(true)}><ContentCopyIcon /></IconButton>
            </Tooltip>
            <CopyOtherSystemDataDialog isOpen={copyOtherSystemDataDialogOpen} handleClose={handleClose} changedSystems={changedSystems} />
        </>
    )
}

function CopyOtherSystemDataDialog({ isOpen, handleClose, changedSystems }: { isOpen: boolean, handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void, changedSystems: Record<string, (keyof Iasrs)[]> }) {
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Make Changes</DialogTitle>
            <DialogContent>
                <ul>
                    {Object.entries(changedSystems).map(([system, subparts]) => (
                        <li key={system}>
                            {system}
                            <ul>
                                {subparts.map(subpart => (
                                    <li key={subpart}>{subpart}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
    );
};