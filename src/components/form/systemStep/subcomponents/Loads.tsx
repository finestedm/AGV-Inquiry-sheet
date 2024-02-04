import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadDimensionPicture from '../../../../images/loadDimensionsPicture.png'
import LoadDimensionPicture2 from '../../../../images/loadDimensionsPicture2.png'
import LoadTable from "./LoadTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";

export default function Loads({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData.present);
    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.loads`)}
            content={
                <Stack spacing={2}>
                    <Box>
                        <img style={{ width: '100%', maxWidth: 800 }} src={LoadDimensionPicture} alt="load dimensions" />
                        <img src={LoadDimensionPicture2} alt="load dimensions 2" />
                    </Box>
                    <LoadTable selectedSystem={selectedSystem} />
                    <Grid item xs={12}>
                        <Collapse in={(selectedSystem !== 'lrkprk') && (formData.system[selectedSystem].loads.length > 1)} >
                            <Alert id='system.manyLoadsWarning' severity="warning">{t(`system.manyLoadsWarning`)}</Alert>
                        </Collapse>
                    </Grid>
                </Stack >
            }
        />
    )
}
