import { Alert, Box, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISystems } from "../../../features/interfaces";
import CopyOtherSystemDataButton from "../CopyOtherSystemDataDropdown";
import WorkTime from "./subcomponents/WorkTime";
import WorkConditions from "./subcomponents/WorkConditions";
import Building from "./subcomponents/Building";
import Loads from "./subcomponents/Loads";
import Capacity from "./subcomponents/Capacity";
import Flows from "./subcomponents/Flows";

export default function FormSystemStep({ selectedSystem }: { selectedSystem: keyof ISystems }): JSX.Element {

    const { t } = useTranslation();

    return (
        <Stack spacing={8}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography variant="h4" textAlign='left'>{t(`system.${selectedSystem}.header`)}</Typography>
                <CopyOtherSystemDataButton selectedSystem={selectedSystem} />
            </Stack>
            <WorkTime selectedSystem={selectedSystem} />
            <WorkConditions selectedSystem={selectedSystem} />
            <Building selectedSystem={selectedSystem} />
            <Loads selectedSystem={selectedSystem} />
            {(selectedSystem === ('asrs' || 'lrkprk')) && <Capacity selectedSystem={selectedSystem} />}
            {(selectedSystem === ('agv' || 'autovna')) && <Flows selectedSystem={selectedSystem}/>}
        </Stack >
    )
}

