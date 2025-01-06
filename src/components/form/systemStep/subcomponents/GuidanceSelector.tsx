import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch } from "react-redux";
import forklifts, { TForklift } from "../../../../data/forklifts";
import { ISystems } from "../../../../features/interfaces";
import { RootState } from "../../../../features/redux/store";
import { handleInputMethod } from "../../../../features/redux/reducers/formDataSlice";
import guidanceTypes, { TGuidanceType } from "../../../../data/guidanceType";

export default function GuidanceSelector({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    return (
        <Grid container spacing={2}>
            {guidanceTypes.map(guidance => (
                <GuidanceCard guidance={guidance} selectedSystem={selectedSystem} />
            ))}
        </Grid>
    ) 
}

export function GuidanceCard({ guidance, selectedSystem }: { guidance: TGuidanceType, selectedSystem: keyof ISystems }) {
    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const { t } = useTranslation();
    const theme = useTheme();
    const guidanceState = useSelector((state: RootState) => state.formData.system[selectedSystem].guidance)
    const guidanceSelected = guidance.shortName === guidanceState

    function handleGuidanceSelection() {
        dispatch(handleInputMethod({ path: `system.${selectedSystem}.guidance`, value: guidance.shortName }))
    }

    return (
        // <></>
        <Grid item xs={6} md={3} sx={{ position: 'relative' }}>
            <Card className={guidanceSelected ? 'selected-card system-card' : 'system-card'}>
                <CardActionArea
                    disabled={!editMode}
                    onClick={() => handleGuidanceSelection()}
                >
                    <CardMedia
                        component="img"
                        height="150"
                        image={guidance.image}
                        alt={guidance.fullName}
                        sx={{ position: 'relative', objectFit: "contain" }}
                    >
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon htmlColor={guidanceSelected ? theme.palette.primary.main : theme.palette.text.primary}/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' color={guidanceSelected ? theme.palette.primary.main : theme.palette.text.primary}>{t(`${guidance.fullName}`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ mb: 3, borderColor: guidanceSelected ? theme.palette.primary.light : theme.palette.text.secondary, opacity: .8 }} />
                            <Typography align='left' variant='body1' color={guidanceSelected ? theme.palette.primary.light : theme.palette.text.secondary}>
                                {t(`system.guidance.${guidance.shortName}`)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    )
}
