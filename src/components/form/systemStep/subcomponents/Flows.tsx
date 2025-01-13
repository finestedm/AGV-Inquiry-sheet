import { Alert, Box, Checkbox, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FlowTable from "./FlowTable";
import { ISystems } from "../../../../features/interfaces";
import InputGroup from "../../InputGroup";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export default function Flows({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const { t } = useTranslation();

    return (
        <InputGroup
            title={t(`system.subheader.flow`)}
            subTitle={t(`system.subheader.flowSubtitle`)}
            icon={AccountTreeOutlinedIcon}
            content={<FlowTable selectedSystem={selectedSystem} />}
        />
    )
}


