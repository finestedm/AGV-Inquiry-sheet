import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ISystemData, ISystems } from "../../../../features/interfaces";
import BoxForTextPair from "./BoxForTextPair";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import FormSystemStep from "../../systemStep/FormSystemStep";

export default function SystemsAccordion() {
    const currentStep = useSelector((state: RootState) => state.steps)
    const selectedSystems = useSelector((state: RootState) => (
        Object.entries(state.formData.system)
            .filter(([systemName, systemData]) => systemData.selected)
            .map(([systemName]) => systemName)
    )) as (keyof ISystems)[];

    const { t } = useTranslation();
    const theme = useTheme();

    console.log(currentStep)

    return (
        <Stack spacing={2}>
            {selectedSystems.map(system =>
                < Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant='h6' align='left' >{t(`steps.${system}`)}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <Divider sx={{ mb: 3 }} /> */}
                        {/* <Typography align='left' >
                            {Object.entries(systemsData[system].workTime).map(([key, value]: [string, number]) => (
                                <BoxForTextPair keyText={`${t(`system.workTime.${key}`)}`} valueText={value} endText="h" />
                            ))}
                            <Divider />
                            <BoxForTextPair keyText={`${t(`system.workTime.hoursPerWeek`)}`} valueText={Object.entries(systemsData[system].workTime).reduce((acc, [, value]) => acc * value, 1)} endText="h" />
                        </Typography> */}
                        {<FormSystemStep selectedSystem={system} />}
                    </AccordionDetails>
                </Accordion >
            )}
        </Stack>
    )
}