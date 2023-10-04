import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../features/redux/store";
import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LoadDimensionPicture from '../../../../images/loadDimensionsPicture.png'
import LoadDimensionPicture2 from '../../../../images/loadDimensionsPicture2.png'
import LoadTable from "./LoadTable";

export default function Loads({ selectedSystem }: { selectedSystem: string }) {

    const formData = useSelector((state: RootState) => state.formData);
    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            <Typography variant="h5" textAlign='left'>{t(`system.subheader.loads`)}</Typography>
            <Box>
                <img style={{ width: '100%', maxWidth: 800 }} src={LoadDimensionPicture} alt="load dimensions" />
                <img src={LoadDimensionPicture2} alt="load dimensions 2" />
            </Box>
            <LoadTable selectedSystem={selectedSystem} />
            {(selectedSystem === ('asrs' || 'agv' || 'autovna')) && (formData.system[selectedSystem].loads.length > 1) && (
                <Grid item xs={12}>
                    <Alert id='system.manyLoadsWarning' severity="warning">{t(`system.manyLoadsWarning`)}</Alert>
                </Grid>
            )}
        </Stack>
    )
}
