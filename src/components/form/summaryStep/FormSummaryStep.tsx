import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import SystemAccordion from "./subcomponents/SystemAccordion";

export default function FormSummaryStep() {
    const { t } = useTranslation();
    const theme = useTheme();

    const selectedSystem = useSelector((state: RootState) => (
        Object.entries(state.formData.system).filter(([systemName, systemData]) => systemData.selected)
    ));

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('summary.header')}</Typography>
            <Stack spacing={2}>{selectedSystem.map(system => <SystemAccordion />)}</Stack>
        </Stack>
    )
}

