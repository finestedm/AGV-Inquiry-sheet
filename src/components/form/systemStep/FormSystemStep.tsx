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
import AdditionalRemarks from "./subcomponents/AdditionalRemarks";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import NumberOfTrucks from "../summaryStep/subcomponents/NumberOfTrucks";

export default function FormSystemStep({ selectedSystem }: { selectedSystem: keyof ISystems }): JSX.Element {
    const isStepSummary = useSelector((state: RootState) => state.steps.currentStep) === 'summary'
    const { t } = useTranslation();

    return (
        <Box>
            {!isStepSummary &&
                <Stack direction='row' justifyContent='space-between'>
                    <Typography minHeight={64} alignContent='center' variant="h4" textAlign='left'>{t(`system.${selectedSystem}.header`)}</Typography>
                    <CopyOtherSystemDataButton selectedSystem={selectedSystem} />
                </Stack>
            }
        <Stack spacing={5}>
            <WorkTime selectedSystem={selectedSystem} />
            <WorkConditions selectedSystem={selectedSystem} />
            <Loads selectedSystem={selectedSystem} />
            {(selectedSystem === 'asrs' || selectedSystem === 'lrkprk' || selectedSystem === 'autovna') && <Capacity selectedSystem={selectedSystem} />}
            <Building selectedSystem={selectedSystem} />
            {(selectedSystem === 'agv' || selectedSystem === 'autovna') && <Flows selectedSystem={selectedSystem} />}
            <AdditionalRemarks selectedSystem={selectedSystem} />
            {/* <NumberOfTrucks /> */}
        </Stack >
        </Box>
    )
}

