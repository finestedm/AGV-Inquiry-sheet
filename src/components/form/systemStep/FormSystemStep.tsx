import { Alert, Box, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, Grid, InputAdornment, Slider, Stack, Switch, TextField, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadTable from "./subcomponents/LoadTable";
import LoadDimensionPicture from '../images/loadDimensionsPicture.png'
import LoadDimensionPicture2 from '../images/loadDimensionsPicture2.png'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";
import { handleInputMethod, initialFormDataState } from "../../../features/redux/reducers/formDataSlice";
import FlowTable from "./subcomponents/FlowTable";
import CapacityTable from "./subcomponents/CapacityTable";
import { Iasrs } from "../../../features/interfaces";
import CopyOtherSystemDataButton from "../CopyOtherSystemDataDropdown";
import WorkTime from "./subcomponents/WorkTime";
import WorkConditions from "./subcomponents/WorkConditions";
import Building from "./subcomponents/Building";
import Loads from "./subcomponents/Loads";
import Capacity from "./subcomponents/Capacity";
import Flows from "./subcomponents/Flows";

export default function FormSystemStep({ selectedSystem }: { selectedSystem: string }): JSX.Element {

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

