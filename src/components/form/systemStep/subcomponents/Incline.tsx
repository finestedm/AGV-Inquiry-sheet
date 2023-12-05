import { useSelector } from "react-redux";
import NoDataAlert from "../../../NoDataAlert";
import { RootState } from "../../../../features/redux/store";
import { ISystems } from "../../../../features/interfaces";
import { Box, Grid, Slider, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import { useTranslation } from "react-i18next";
import MopedIcon from '@mui/icons-material/Moped';

export default function Incline({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    const formData = useSelector((state: RootState) => state.formData)
    const incline = formData.system[selectedSystem].building.incline;
    const editMode = useSelector((state: RootState) => state.editMode)
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const theme = useTheme();


    if (incline !== undefined) {
        return (
            <Box>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Typography align="left">{t(`system.building.incline`)}</Typography>
                        <Slider
                            disabled={!editMode}
                            sx={{ width: '95%' }}
                            getAriaLabel={() => 'incline'}
                            value={formData.system[selectedSystem].building.incline}
                            onChange={(e, v) => dispatch(handleInputMethod({ path: `system.${selectedSystem}.building.incline`, value: v }))}
                            valueLabelDisplay="auto"
                            step={.25}
                            min={0}
                            max={10}
                            marks={[{ value: 0, label: '0°' }, { value: 5, label: '5°' }, { value: 10, label: '10°' }]}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={3}>
                        <Box
                            className="incline-visualization"
                            position='relative'
                            sx={{
                                transform: `rotate(${-incline}deg)`,
                                width: '100%',
                                height: 2,
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.main
                            }}
                        >
                            <Typography>{incline}°</Typography>
                            <Box
                                position='absolute'
                                sx={{ top: '-20px', left: '45%' }}
                            >
                                <MopedIcon />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    } else {
        return <NoDataAlert />
    }
}