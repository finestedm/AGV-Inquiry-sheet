import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, InputLabel, Link, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import SystemAccordion from "./subcomponents/SystemAccordion";

export default function FormSummaryStep() {
    const formData = useSelector((state: RootState) => state.formData)
    const { t } = useTranslation();
    const theme = useTheme();

    const selectedSystems = useSelector((state: RootState) => (
        Object.entries(state.formData.system).filter(([systemName, systemData]) => systemData.selected)
    ));

    return (
        <Stack spacing={8} textAlign='left'>
            <Typography variant="h4">{t('summary.header')}</Typography>
            <Stack spacing={2} className='summary-sales'>
                <Typography variant="h5">{t('sales.header')}</Typography>
                <Stack spacing={0}>
                    <Typography>
                        <Typography fontWeight={700}>
                            {formData.sales.salesUnit}
                        </Typography>
                        {formData.sales.contactPerson}, {formData.sales.contactPersonRole}
                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={2} className='summary-customer'>
                <Typography variant="h5">{t('customer.header')}</Typography>
                <Stack spacing={0}>
                    <Typography>
                        <Typography fontWeight={700}>
                            {formData.customer.name} <Typography color='text.secondary' component="span">({formData.customer.sapNumber})</Typography>
                        </Typography>
                        {formData.customer.address}
                    </Typography>
                </Stack>
                <Stack spacing={0}>
                    <Typography>
                        <Typography fontWeight={700}>
                            {formData.customer.contactPerson} <Typography color='text.secondary' component="span">, {formData.customer.contactPersonRole}</Typography>
                        </Typography>
                        <Link href={`tel:${formData.customer.contactPersonPhone}`}>{formData.customer.contactPersonPhone}</Link>
                        , <Link href={`mailto:${formData.customer.contactPersonMail}`}>{formData.customer.contactPersonMail}</Link>

                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={4}>{selectedSystems.map(system => <SystemAccordion />)}</Stack>
        </Stack>
    )
}

