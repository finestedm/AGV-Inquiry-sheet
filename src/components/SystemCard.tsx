import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFormData } from '../App';
import { ISystem } from './FormSystemSelectorStep';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function SystemCard({ system, formData, setFormData }: { system: ISystem, formData: IFormData; setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {

    const theme = useTheme()

    const handleSystemChange = (alt: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            system: {
                ...prevFormData.system,
                [alt.toLowerCase()]: {
                    ...prevFormData.system[alt.toLowerCase()],
                    selected: !prevFormData.system[alt.toLowerCase()].selected,
                },
            },
        }));
    };

    const { t } = useTranslation();

    const systemSelected = formData.system[(system.alt).toLowerCase()].selected

    return (
        <Grid item xs={12} md={6}>
            <Card className={systemSelected ? 'selected-card' : ''} sx={{ borderColor: systemSelected ? theme.palette.success.main : theme.palette.grey[200] }}>
                <CardActionArea
                    sx={{ position: 'relative' }}
                    onClick={e => handleSystemChange(system.alt)}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            borderRadius: '5rem',
                            height: '2rem',
                            width: '2rem',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: theme.shadows[3]
                        }}
                    >
                        {systemSelected && <CheckCircleIcon sx={{ color: theme.palette.success.main }} />}
                    </div>
                    <CardMedia
                        component="img"
                        height="200"
                        image={system.url}
                        alt={system.alt}
                    >
                    </CardMedia>
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' sx={{color: systemSelected ? theme.palette.success.dark : theme.palette.text.primary}}>{system.label}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{mb: 3}}/>
                            <Typography align='left' sx={{ color: systemSelected ? theme.palette.success.main : theme.palette.text.secondary }}>
                                {system.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    );
}