import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SystemAccordion() {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Card elevation={2}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant='h6' align='left' >{t(`system.label`)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Divider sx={{ mb: 3 }} />
                    <Typography align='left' >
                        {t(`system.description`)}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Card>
    )
}