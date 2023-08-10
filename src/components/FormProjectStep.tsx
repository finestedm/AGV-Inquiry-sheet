import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, TextFieldProps, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { MenuProps } from "./FormCustomerStep";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { IFormData, IHandleInputMethod } from "../features/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { handleInputMethod } from "../features/redux/reducers/formDataSlice";

export default function FormProjectStep(): JSX.Element {

    const { t } = useTranslation();
    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

    const supplyChainParts = [
        {
            name: t('supplyChainParts.production'),
            icon: <PrecisionManufacturingIcon />,
        },
        {
            name: t('supplyChainParts.storage'),
            icon: <WarehouseIcon />,
        },
        {
            name: t('supplyChainParts.distribution'),
            icon: <LocalShippingIcon />,
        },
        {
            name: t('supplyChainParts.finishedGoods'),
            icon: <CheckroomIcon />,
        },
        {
            name: t('supplyChainParts.components'),
            icon: <SettingsInputComponentIcon />,
        },
    ];

    const investmentTypes = [
        t('project.invenstmentType.new'),
        t('project.invenstmentType.expansion'),
        t('project.invenstmentType.modification'),
        t('project.invenstmentType.exchange'),
        t('project.invenstmentType.retrofit'),
    ];


    const existingSystems = [
        t('project.it.existingSystem.label.SAP-WM'),
        t('project.it.existingSystem.label.SAP-EWM'),
        t('project.it.existingSystem.label.other'),
    ];

    return (
        <Stack spacing={8}>
            <Typography variant="h4" textAlign='left'>{t('project.header')}</Typography>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h5" textAlign='left'>{t('project.subheader.various')}</Typography>
                <TextField
                    fullWidth
                    label={t('project.goals')}
                    name="project.goals"
                    multiline
                    rows={3}
                    value={formData.project.goals}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.goals', value: e.target.value }))}
                />
                <FormControl>
                    <InputLabel id="project-supplyChainParts-label">{t('project.supplyChainParts')}</InputLabel>
                    <Select
                        labelId="project-supplyChainParts-label"
                        id="project-supplyChainParts"
                        multiple
                        input={<OutlinedInput label={t('project-supplyChainParts')} />}
                        value={formData.project.supplyChainParts}
                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.supplyChainParts', value: e.target.value }))}
                        renderValue={(selected) => (selected as string[]).join(', ')}
                        MenuProps={MenuProps}
                    >
                        {supplyChainParts.map((supplyChainPart) => (
                            <MenuItem key={supplyChainPart.name} value={supplyChainPart.name}>
                                <Checkbox checked={formData.project.supplyChainParts.indexOf(supplyChainPart.name) > -1} />
                                <Stack spacing={1} direction='row'>
                                    {supplyChainPart.icon}
                                    <ListItemText primary={supplyChainPart.name} />
                                </Stack>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label={t('project.investmentLocation')}
                    name="project.investmentLocation"
                    value={formData.project.investmentLocation}
                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.investmentLocation', value: e.target.value }))}
                />
                <Box>
                    <Grid container flex={1} justifyContent='space-between' spacing={2}>
                        <Grid item>
                            <FormControlLabel
                                id="project-tender"
                                control={
                                    <Checkbox
                                        checked={formData.project.tender}
                                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.tender', value: e.target.checked }))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="end"
                                label={t('project.tender')}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                id="project-consultingCompany"
                                control={
                                    <Checkbox
                                        checked={formData.project.consultingCompany}
                                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.consultingCompany', value: e.target.checked }))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="end"
                                label={t('project.consultingCompany')}
                            />
                        </Grid>
                        <Grid item>
                            <FormControlLabel
                                id="project-competitor"
                                control={
                                    <Checkbox
                                        checked={formData.project.competitor}
                                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.competitor', value: e.target.checked }))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="end"
                                label={t('project.competitor')}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h5" textAlign='left'>{t('project.subheader.investmentType')}</Typography>
                <ToggleButtonGroup
                    sx={{ display: { xs: 'none', sm: 'flex' } }}
                    color='success'
                    exclusive
                    fullWidth
                    aria-label="investment type buttons"
                >
                    {investmentTypes.map((investmentType) => (
                        <ToggleButton
                            value={investmentType}
                            key={investmentType}
                            onClick={() => dispatch(handleInputMethod({ path: 'project.investmentType', value: investmentType }))}
                            selected={formData.project.investmentType === investmentType}
                        >
                            {investmentType}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    sx={{ display: { sm: 'none' } }}
                    exclusive
                    aria-label="investment type buttons"
                    orientation="vertical"
                    fullWidth
                    color='success'
                >
                    {investmentTypes.map((investmentType) => (
                        <ToggleButton
                            value={investmentType}
                            key={investmentType}
                            onClick={() => dispatch(handleInputMethod({ path: 'project.investmentType', value: investmentType }))}
                            selected={formData.project.investmentType === investmentType}
                        >
                            {investmentType}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h5" textAlign='left'>{t('project.subheader.milestones')}</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={4}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('project.milestones.concept')}
                                    format='DD-MM-YYYY'
                                    value={dayjs(formData.project.milestones.concept)}
                                    onChange={(e) => { dispatch(handleInputMethod({ path: 'project.milestones.concept', value: dayjs(e).format('YYYY-MM-DD') })) }}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            helperText: dayjs(formData.project.milestones.concept).isBefore(dayjs(new Date())) ? 'Data w przeszłości' : '',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('project.milestones.officialOffer')}
                                    format='DD-MM-YYYY'
                                    value={dayjs(formData.project.milestones.officialOffer)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.milestones.officialOffer', value: e }))}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            helperText: dayjs(formData.project.milestones.officialOffer).isBefore(dayjs(formData.project.milestones.concept)) ? 'Data oferty przed datą koncepcji' : '',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('project.milestones.order')}
                                    format='DD-MM-YYYY'
                                    value={dayjs(formData.project.milestones.order)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.milestones.order', value: e }))}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            helperText: dayjs(formData.project.milestones.order).isBefore(dayjs(formData.project.milestones.officialOffer)) ? 'Data zamówienia przed datą oferty' : '',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('project.milestones.implementationStart')}
                                    format='DD-MM-YYYY'
                                    value={dayjs(formData.project.milestones.implementationStart)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.milestones.implementationStart', value: e }))}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            helperText: dayjs(formData.project.milestones.implementationStart).isBefore(dayjs(formData.project.milestones.order)) ? 'Data rozpoczęcia przed datą zamowienia' : '',
                                        },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <DatePicker
                                    sx={{ width: '100%' }}
                                    label={t('project.milestones.launch')}
                                    format='DD-MM-YYYY'
                                    value={dayjs(formData.project.milestones.launch)}
                                    onChange={(e) => dispatch(handleInputMethod({ path: 'project.milestones.launch', value: e }))}
                                    disablePast
                                    slotProps={{
                                        textField: {
                                            helperText: dayjs(formData.project.milestones.launch).isBefore(dayjs(formData.project.milestones.implementationStart)) ? 'Data rozpoczęcia przed datą zamowienia' : '',
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </LocalizationProvider>
            </Stack>
            <Stack spacing={2}>
                <Typography variant="h5" textAlign='left'>{t('project.subheader.it')}</Typography>
                <Box>
                    <Stack spacing={2}>
                        <TextField
                            fullWidth
                            label={t('project.it.processesDescription')}
                            name="project.it.processesDescription"
                            value={formData.project.it.processesDescription}
                            onChange={(e) => dispatch(handleInputMethod({ path: 'project.it.processesDescription', value: e.target.value }))}
                        />
                        <Stack>
                            <FormControlLabel
                                id="project.it.existingSystem"
                                control={
                                    <Checkbox
                                        checked={formData.project.it.existingSystem.present}
                                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.it.existingSystem.present', value: e.target.checked }))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="end"
                                label={t('project.it.existingSystem.present')}
                            />
                        </Stack>
                        {formData.project.it.existingSystem.present &&
                            <ToggleButtonGroup
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                exclusive
                                fullWidth
                                aria-label="existing it system buttons"
                            >
                                {existingSystems.map((existingSystem) => (
                                    <ToggleButton
                                        value={existingSystems.indexOf(existingSystem)}
                                        key={existingSystem}
                                        onClick={() => dispatch(handleInputMethod({ path: 'project.it.existingSystem.name', value: existingSystems.indexOf(existingSystem) }))}
                                        selected={formData.project.it.existingSystem.name === existingSystems.indexOf(existingSystem)}
                                    >
                                        {existingSystem}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        }
                        {(formData.project.it.existingSystem.present && formData.project.it.existingSystem.name === 2) &&
                            <TextField
                                fullWidth
                                label={t('project.it.existingSystem.existingOther')}
                                name="project.it.existingSystem.existingOther"
                                value={formData.project.it.existingSystem.existingOther}
                                onChange={(e) => dispatch(handleInputMethod({ path: 'project.it.existingSystem.existingOther', value: e.target.value }))}
                            />
                        }
                        <Stack>
                            <FormControlLabel
                                id="project.it.wmsNeeded"
                                control={
                                    <Checkbox
                                        checked={formData.project.it.wmsNeeded}
                                        onChange={(e) => dispatch(handleInputMethod({ path: 'project.it.wmsNeeded', value: e.target.checked }))}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                labelPlacement="end"
                                label={t('project.it.wmsNeeded')}
                            />
                        </Stack>
                        <TextField
                            fullWidth
                            label={t('project.it.additionalInformation')}
                            name="project.it.additionalInformation"
                            value={formData.project.it.additionalInformation}
                            onChange={(e) => dispatch(handleInputMethod({ path: 'project.it.additionalInformation', value: e.target.value }))}
                        />
                    </Stack>
                </Box>
            </Stack>
        </Stack >

    )
}