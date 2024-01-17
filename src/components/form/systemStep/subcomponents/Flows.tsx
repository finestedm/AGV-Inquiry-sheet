import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FlowTable from "./FlowTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";

export default function Flows({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.flow`)}
            content={
                <Stack spacing={2}>
                    <Typography variant="h5" textAlign='left'>{t(`system.subheader.flow`)}</Typography>
                    <FlowTable selectedSystem={selectedSystem} />
                </Stack>
            }
        />
    )
}


