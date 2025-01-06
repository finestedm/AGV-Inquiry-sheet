import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardActionArea, CardActions, CardMedia, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";
import { ISystems } from "../../../../../../features/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../features/redux/store";
import rackAccessories, { TRackAccessories, TRackAccessory } from "../../../../../../data/rackAccessories";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from "react-redux";
import { handleInputMethod } from "../../../../../../features/redux/reducers/formDataSlice";

export default function AccessoriesSelectors({ selectedSystem }: { selectedSystem: keyof ISystems }) {
    return (
        <Stack spacing={4}>
            {Object.keys(rackAccessories).map(group => (
                <AccessoriesGroup group={group as keyof TRackAccessories} key={group} selectedSystem={selectedSystem} />
            ))}
        </Stack>
    );

}

export function AccessoriesGroup({ group, selectedSystem }: { group: keyof TRackAccessories, selectedSystem: keyof ISystems }) {
    const accessories = rackAccessories[group];
    const { t } = useTranslation();
    return (
        <Box>
            <Stack spacing={1}>
                <Typography variant='h6' fontSize='110%' color='text.secondary' textAlign='left'>{t(`accessories.${group}`)}</Typography>
                <Box>
                    <Grid container spacing={2}>
                        {accessories.map(accessory => (
                            <AccessoryCard key={accessory.shortName} group={group} accessory={accessory} selectedSystem={selectedSystem} />
                        ))}
                    </Grid>
                </Box>
            </Stack>
        </Box>
    )
}

export function AccessoryCard({ group, accessory, selectedSystem }: { group: keyof TRackAccessories, accessory: TRackAccessory, selectedSystem: keyof ISystems }) {
    const dispatch = useDispatch();
    const editMode = useSelector((state: RootState) => state.editMode);
    const { t } = useTranslation();
    const theme = useTheme();
    const accessoriesState = useSelector((state: RootState) => state.formData.system[selectedSystem].accessories)
    const accessorySelected = accessoriesState[group] === accessory.shortName

    function handleAccessorySelection() {
        dispatch(handleInputMethod({ path: `system.${selectedSystem}.accessories.${group}`, value: accessory.shortName }))
    }

    const redX = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg'

    return (
        <Grid item xs={6} md={3} sx={{ position: 'relative' }}>
            <Card className={accessorySelected ? 'selected-card system-card' : 'system-card'}>
                <CardActionArea
                    disabled={!editMode}
                    onClick={() => handleAccessorySelection()}
                >
                    <CardMedia
                        component="img"
                        height="150"
                        image={accessory.image ? accessory.image : redX}
                        alt={accessory.fullName}
                        sx={{ position: 'relative' }}
                    >
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon htmlColor={accessorySelected ? theme.palette.primary.main : theme.palette.text.primary} />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' color={accessorySelected ? theme.palette.primary.main : theme.palette.text.primary}>{t(`${accessory.fullName}`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ mb: 3, borderColor: accessorySelected ? theme.palette.primary.light : theme.palette.text.secondary, opacity: .8 }} />
                            <Typography align='left' variant='body1' color={accessorySelected ? theme.palette.primary.light : theme.palette.text.secondary}>
                                {t(``)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    )
}
