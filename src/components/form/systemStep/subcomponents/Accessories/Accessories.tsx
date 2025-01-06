import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISystems } from "../../../../../features/interfaces";
import InputGroup from "../../../InputGroup";
import AccessoriesSelectors from "./subcomponents/AccessoriesSelectors";

export default function Accessories({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    if (selectedSystem === 'mpb' || selectedSystem === 'mobile') {

        return (
            <InputGroup
                title={t(`system.subheader.rackConfigs`)}
                content={
                    <Stack spacing={2}>
                        <AccessoriesSelectors selectedSystem={selectedSystem} />
                    </Stack >
                }
            />
        )
    } else {
        return null
    }
}
