import { useSelector } from "react-redux";
import NoDataAlert from "../../../NoDataAlert";
import { RootState } from "../../../../features/redux/store";
import { ISystems } from "../../../../features/interfaces";
import { Box, Collapse, Grid, InputLabel, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import ForkliftIcon from "./ForkliftIcon";
import { useEffect, useState } from "react";
import CustomAlert from "../../../CustomAlert";

export default function Incline({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData.present)
    const incline = formData.system[selectedSystem].building.incline;
    const currentStep = useSelector((state: RootState) => state.steps.currentStep);
    const editMode = useSelector((state: RootState) => state.editMode) && currentStep !== 'summary';
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const theme = useTheme();
    const [color, setColor] = useState<"disabled" | "action" | "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning">('primary');
    const [slopePercentage, setSlopePercentage] = useState<number>();
    const [tempIncline, setTempIncline] = useState(incline)

    useEffect(() => {
        if (tempIncline > 4) {
            setColor('error')
        } else if (tempIncline > 2) {
            setColor('warning')
        } else {
            setColor('primary')
        }
        setSlopePercentage(parseFloat((Math.tan((tempIncline * Math.PI) / 180) * 100).toFixed(2)))
    }, [tempIncline])


    if (incline !== undefined) {
        return (
            <Box>
                <Grid container spacing={2} alignItems='bottom'>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Box>
                            <Stack spacing={1}>
                                <InputLabel>{t(`system.building.incline`)}</InputLabel>
                                <Box>
                                    <Slider
                                        disabled={!editMode}
                                        sx={{ width: '95%' }}
                                        getAriaLabel={() => 'incline'}
                                        value={tempIncline}
                                        onChange={(e, v) => setTempIncline(v as number)}
                                        onChangeCommitted={() => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.incline`, value: tempIncline }))}
                                        valueLabelDisplay="auto"
                                        step={.25}
                                        min={0}
                                        max={10}
                                        marks={[{ value: 0, label: '0°' }, { value: 5, label: '5°' }, { value: 10, label: '10°' }]}
                                    />
                                </Box>
                            </Stack>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3} minHeight='6rem' display='flex' alignItems='center'>
                        <Box
                            className="incline-visualization"
                            color={color}
                            position='relative'
                            sx={{
                                transform: `rotate(${-tempIncline}deg)`,
                                width: '100%',
                                height: 2,
                                backgroundColor: (theme.palette[color as keyof typeof theme.palette] as { main: string }).main,
                                display: 'flex', // Add this line
                                flexDirection: 'column', // Align children vertically
                                alignItems: 'center', // Align children horizontally
                            }}
                        >
                            <Typography>{tempIncline}° / {slopePercentage}%</Typography>
                            <Box
                                position='absolute'
                                sx={{ top: '-30px', left: '45%' }}
                            >
                                <ForkliftIcon color={color} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs>
                        <CustomAlert collapseTrigger={incline > 2} severity="warning" title={t(`system.inclineWarningTitle`)} text={t(`system.inclineWarning`)} />
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <NoDataAlert />
    }
}