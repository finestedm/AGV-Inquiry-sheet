import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FlowTable from "./FlowTable";

export default function Flows({ selectedSystem }: { selectedSystem: string }) {

    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            <Typography variant="h5" textAlign='left'>{t(`system.subheader.flow`)}</Typography>
            <FlowTable selectedSystem={selectedSystem} />
        </Stack>
    )
}


