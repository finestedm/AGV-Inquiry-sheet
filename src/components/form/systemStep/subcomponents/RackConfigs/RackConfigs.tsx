import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISystems } from "../../../../../features/interfaces";
import InputGroup from "../../../InputGroup";
import LevelsConfigs from "./LevelsConfigsTable";
import RowsConfigsTable from "./RowsConfigsTable";

export default function RackConfigs({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    if (selectedSystem === 'mpb' || selectedSystem === 'mobile') {

        return (
            <InputGroup
                title={t(`system.subheader.rackConfigs`)}
                content={
                    <Stack spacing={2}>
                        <LevelsConfigs selectedSystem={selectedSystem} />
                        <RowsConfigsTable selectedSystem={selectedSystem} />
                    </Stack >
                }
            />
        )
    } else {
        return null
    }
}
