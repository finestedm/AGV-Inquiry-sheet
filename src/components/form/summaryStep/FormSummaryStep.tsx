import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, Divider, InputLabel, Link, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import SystemAccordion from "./subcomponents/SystemTabs";
import isPartUnchanged from "../../../features/variousMethods/isPartUnchanged";
import { IFormData, ISystemData, ISystems, TPart } from "../../../features/interfaces";
import industries from "../../../data/industries";
import investmentTypes from "../../../data/investmentType";
import supplyChainParts from "../../../data/supplyChainParts";
import existingWMSTypes from "../../../data/existingWMSTypes";
import BoxForTextPair from "./subcomponents/BoxForTextPair";
import SystemsAccordion from "./subcomponents/SystemTabs";
import SystemsTabs from "./subcomponents/SystemTabs";
import NumberOfTrucks from "./subcomponents/NumberOfTrucks";
import GeneratePDF from "./subcomponents/GeneratePDF";
import SharedData from "./subcomponents/SharedData";

export default function FormSummaryStep() {
    const formData = useSelector((state: RootState) => state.formData.present)
    const { t } = useTranslation();


    function toBeRendered({ part, step }: { part: TPart, step: keyof IFormData }) {
        //@ts-ignore
        return formData[step][part] && (!isPartUnchanged({ formData, step, part }))
    }

    function CustomHeaderWithDivider({ headerText }: { headerText: string }) {
        return <Divider><Typography variant="h5">{t(`${headerText}`)}</Typography></Divider>
    }



    return (
        <Stack spacing={8} textAlign='left' id='printable-content'>
            <GeneratePDF />
            <SharedData />
            <SystemsTabs />
        </Stack>
    )
}