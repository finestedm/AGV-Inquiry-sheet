import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystems } from "../../../../features/interfaces";

export default function SystemAccordion({systemName}: {systemName: keyof ISystems}) {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Accordion sx={{ border: 'none', boxShadow: 'none' }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography variant='h6' align='left' >{t(`steps.${systemName}`)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Divider sx={{ mb: 3 }} /> */}
                <Typography align='left' >
                    {t(`system.description`)}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}