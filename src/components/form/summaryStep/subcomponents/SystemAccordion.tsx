import { Accordion, AccordionDetails, AccordionSummary, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemData, ISystems } from "../../../../features/interfaces";
import BoxForTextPair from "./BoxForTextPair";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";

export default function SystemAccordion({ systemName }: { systemName: keyof ISystems }) {
    const systemData = useSelector((state: RootState) => state.formData.system[systemName])
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
                    {Object.entries(systemData.workTime).map(([key, value]: [string, number]) => (
                        <BoxForTextPair keyText={key} valueText={value} />
                    ))}
                    = {Object.entries(systemData.workTime).reduce((acc, [, value]) => acc * value, 1)} h

                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}