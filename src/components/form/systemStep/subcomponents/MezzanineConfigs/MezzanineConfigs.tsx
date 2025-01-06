import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISystems } from "../../../../../features/interfaces";
import InputGroup from "../../../InputGroup";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../features/redux/store";
import MezzanineLevelsConfigs from "./MezzanineLevelsConfigs";
import LevelsConfigs from "../RackConfigs/LevelsConfigsTable";

export default function MezzanineConfig({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    const formData = useSelector((state: RootState) => state.formData)
    const levelConfigs = formData.system[selectedSystem].levelConfigs
    const selectedLevelConfig = levelConfigs.length > 0 && levelConfigs[0]
    const { t } = useTranslation();

    if (selectedSystem === 'mpb' || selectedSystem === 'mobile') {

        if (selectedLevelConfig) {
            return (
                <InputGroup
                    title={t(`system.subheader.rackConfigs`)}
                    content={
                        <Stack spacing={2}>
                            <LevelsConfigs selectedSystem={selectedSystem} />
                            <MezzanineLevelsConfigs selectedSystem={selectedSystem} />
                        </Stack >
                    }
                />
            )
        } else {
            return <Typography>'Brak konfiguracji'</Typography>
        }
    }
}