import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CapacityTable from "./CapacityTable";
import { ISystems } from "../../../../features/interfaces";

export default function Capacity({ selectedSystem }: {selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
        <Stack spacing={2}>
            <Typography variant="h5" textAlign='left'>{t(`system.subheader.capacity`)}</Typography>
            <CapacityTable selectedSystem={selectedSystem} />
        </Stack>
    )
}

