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

export default function ForkLiftSelector({ selectedSystem }: { selectedSystem: keyof ISystems }) {

    return (
        <Grid container spacing={2}>
            {forklifts.map(forklift => (
                <ForkliftCard forklift={forklift} selectedSystem={selectedSystem} />
            ))}
        </Grid>
    );

}

export function ForkliftCard({ forklift, selectedSystem }: { forklift: TForklift, selectedSystem: keyof ISystems }) {
    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const { t } = useTranslation();
    const theme = useTheme();
    const forkliftState = useSelector((state: RootState) => state.formData.system[selectedSystem].forklift)
    const forkliftSelected = forklift.shortName === forkliftState


    function handleForkliftSelection() {
        dispatch(handleInputMethod({ path: `system.${selectedSystem}.forklift`, value: forklift.shortName }))
    }

    return (
        // <></>
        <Grid item xs={6} md={3} sx={{ position: 'relative' }}>
            <Card className={forkliftSelected ? 'selected-card system-card' : 'system-card'}>
                <CardActionArea
                    disabled={!editMode}
                    onClick={() => handleForkliftSelection()}
                >
                    <CardMedia
                        component="img"
                        height="150"
                        image={forklift.image}
                        alt={forklift.fullName}
                        sx={{ position: 'relative', objectFit: "contain" }}
                    >
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon htmlColor={forkliftSelected ? theme.palette.primary.main : theme.palette.text.primary}/>}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' color={forkliftSelected ? theme.palette.primary.main : theme.palette.text.primary}>{t(`${forklift.fullName}`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ mb: 3, borderColor: forkliftSelected ? theme.palette.primary.light : theme.palette.text.secondary, opacity: .8 }} />
                            <Typography align='left' variant='body1' color={forkliftSelected ? theme.palette.primary.light : theme.palette.text.secondary}>
                                {t(`system.forklift.${forklift.shortName}`)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    )
}
