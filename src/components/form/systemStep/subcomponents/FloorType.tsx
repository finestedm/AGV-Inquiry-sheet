import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FlowTable from "./FlowTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export default function Flows({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
                <InputGroup
                    title={t('project.subheader.floorTypes')}
                    subTitle={t('project.subheader.floorTypesSubtitle')}
                    icon={AccountTreeOutlinedIcon}
                    content={
                        <Stack spacing={4}>
                            <ToggleButtonGroup
                                sx={{ display: { xs: 'none', sm: 'flex' } }}
                                color='primary'
                                disabled={!editMode}
                                exclusive
                                fullWidth
                                aria-label="investment type buttons"
                                onChange={(e, v) => {
                                    dispatch(handleInputMethod({ path: 'project.investmentType', value: v }))
                                    formikProps.setFieldValue('project.investmentType', v);
                                }}
                            >
                                {investmentTypesTranslated.map((investmentType) => (
                                    <ToggleButton
                                        className="buttongroup-deep"
                                        sx={{ color: Boolean(formikProps.errors.project?.investmentType) ? theme.palette.error.main : '', borderColor: Boolean(formikProps.errors.project?.investmentType) ? theme.palette.error.main : '' }}
                                        value={investmentTypesTranslated.indexOf(investmentType)}
                                        color="primary"
                                        key={investmentType}
                                        selected={formData.project.investmentType === investmentTypesTranslated.indexOf(investmentType)}
                                    >
                                        {investmentType}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                            <ToggleButtonGroup
                                sx={{ display: { sm: 'none' } }}
                                size="small"
                                className="buttongroup-deep"
                                exclusive
                                disabled={!editMode}
                                aria-label="investment type buttons"
                                orientation="vertical"
                                fullWidth
                                color='primary'
                                onChange={(e, v) => {
                                    dispatch(handleInputMethod({ path: 'project.investmentType', value: v }))
                                    formikProps.setFieldValue('project.investmentType', v);
                                }}
                            >
                                {investmentTypesTranslated.map((investmentType) => (
                                    <ToggleButton
                                        className="buttongroup-deep"
                                        value={investmentTypesTranslated.indexOf(investmentType)}
                                        key={investmentType}
                                        color="primary"
                                        selected={formData.project.investmentType === investmentTypesTranslated.indexOf(investmentType)}
                                    >
                                        {investmentType}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                            {formikProps.errors.project?.investmentType && <FormHelperText error>{t(`${formikProps.errors.project?.investmentType}`)}</ FormHelperText>}
                        </Stack>
                    }
                />
    )
}



