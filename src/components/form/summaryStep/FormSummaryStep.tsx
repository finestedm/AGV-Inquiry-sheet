import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Divider, InputLabel, Link, List, ListItem, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import SystemAccordion from "./subcomponents/SystemAccordion";
import isPartUnchanged from "../../../features/variousMethods/isPartUnchanged";
import { IFormData, TPart } from "../../../features/interfaces";
import industries from "../../../data/industries";

export default function FormSummaryStep() {
    const formData = useSelector((state: RootState) => state.formData)
    const { t } = useTranslation();
    const theme = useTheme();

    const industriesTranslated = industries.map(industry => t(industry))

    const selectedSystems = useSelector((state: RootState) => (
        Object.entries(state.formData.system).filter(([systemName, systemData]) => systemData.selected)
    ));

    function toBeRendered({ part, step }: { part: TPart, step: keyof IFormData }) {
        //@ts-ignore
        return formData[step][part] && (!isPartUnchanged({ formData, step, part }))
    }

    function CustomHeaderWithDivider({ headerText }: { headerText: string }) {
        return <Divider ><Typography variant="h5">{t(`${headerText}`)}</Typography></Divider>
    }

    return (
        <Stack spacing={8} textAlign='left'>
            <Typography variant="h4">{t('summary.header')}</Typography>
            <Stack spacing={2} className='summary-sales'>
                <CustomHeaderWithDivider headerText='sales.header' />
                <Stack spacing={0}>
                    <Typography>
                        <Typography fontWeight={700}>
                            {formData.sales.salesUnit}
                        </Typography>
                        {toBeRendered({ step: 'sales', part: 'contactPerson' }) && formData.sales.contactPerson}
                        {toBeRendered({ step: 'sales', part: 'contactPersonRole' }) && `, ${formData.sales.contactPerson}`}
                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={2} className='summary-customer'>
                <CustomHeaderWithDivider headerText='customer.header' />
                <Stack spacing={0}>
                    <Typography>
                        <Typography fontWeight={700}>
                            {toBeRendered({ step: 'customer', part: 'name' }) && formData.customer.name}
                            {toBeRendered({ step: 'customer', part: 'sapNumber' }) && <Typography color='text.secondary' component="span"> ({formData.customer.sapNumber})</Typography>}
                        </Typography>
                        {formData.customer.address}
                    </Typography>
                </Stack>
                <Stack spacing={0}>
                    <Typography>
                        {toBeRendered({ step: 'customer', part: 'contactPerson' }) &&
                            <Typography fontWeight={700}>
                                {formData.customer.contactPerson}
                                {toBeRendered({ step: 'customer', part: 'contactPersonRole' }) &&
                                    <Typography color='text.secondary' component="span">, {formData.customer.contactPersonRole}</Typography>
                                }
                            </Typography>
                        }
                        {toBeRendered({ step: 'customer', part: 'contactPersonPhone' }) && <Link href={`tel:${formData.customer.contactPersonPhone}`}>{formData.customer.contactPersonPhone}</Link>}
                        {toBeRendered({ step: 'customer', part: 'contactPersonMail' }) && <Link href={`mailto:${formData.customer.contactPersonMail}`}>, {formData.customer.contactPersonMail}</Link>}
                    </Typography>
                </Stack>
                <Stack spacing={0}>
                    <Typography>
                        {toBeRendered({ step: 'customer', part: 'industryName' }) &&
                            <Stack direction="row" spacing={1} >
                                {formData.customer.industryName.map(industry => <Chip sx={{ borderRadius: .5 }} key={industry} label={t(`${industriesTranslated[industry]}`)} />)}
                            </Stack>
                        }
                    </Typography>
                </Stack>
                <Stack spacing={0}>
                    <Typography>
                        {toBeRendered({ step: 'customer', part: 'relations' }) && <>{t('customer.relations.type')}: <Typography component='span' fontWeight={700}>{t(`customer.relations.${formData.customer.relations}`)}</Typography><br /></>}
                        {toBeRendered({ step: 'customer', part: 'salesHistoryValue' }) && <>{t('customer.relations.saleshistoryvalue')}: <Typography component='span' fontWeight={700}>{formData.customer.salesHistoryValue} € / rok</Typography><br /></>}
                        {toBeRendered({ step: 'customer', part: 'creditManagement' }) && <>{t('customer.relations.creditmanagement')}: <Typography component='span' fontWeight={700}>{formData.customer.creditManagement} PLN brutto</Typography><br /></>}
                        {t('customer.relations.input.owned')}
                        <ul style={{ margin: 0 }}>
                            {toBeRendered({ step: 'customer', part: 'ownedForklifts' }) && <li>{t('customer.relations.input.forklifts')}: <Typography component='span' fontWeight={700}>{formData.customer.ownedForklifts}</Typography></ li>}
                            {toBeRendered({ step: 'customer', part: 'ownedRacks' }) && <li>{t('customer.relations.input.racks')}: <Typography component='span' fontWeight={700}>{formData.customer.ownedRacks}</Typography></ li>}
                            {toBeRendered({ step: 'customer', part: 'ownedOther' }) && <li>{t('customer.relations.input.other')}: <Typography component='span' fontWeight={700}>{formData.customer.ownedOther}</Typography></ li>}
                        </ul>
                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={2} className='summary-project'>
                <CustomHeaderWithDivider headerText='project.header' />
            </Stack>
            <Stack spacing={4}>{selectedSystems.map(system => <SystemAccordion />)}</Stack>
        </Stack>
    )
}

