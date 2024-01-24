import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ISystem, ISystems } from '../../../../features/interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { handleSystemChange } from '../../../../features/redux/reducers/formDataSlice';
import tinycolor from 'tinycolor2';

export default function SystemCard({ system }: { system: ISystem }): JSX.Element {

    const theme = useTheme()

    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const systemSelected = formData.system[system.alt].selected;

    return (
        <Grid item xs={12} md={6}>
            <Card className={systemSelected ? 'selected-card system-card' : 'system-card'}>
                <CardActionArea
                    disabled={!editMode}
                    onClick={e => dispatch(handleSystemChange(system.alt))}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={system.url}
                        alt={system.alt}
                        sx={{ position: 'relative' }}
                    >
                    </CardMedia>
                    <div
                        style={{
                            position: 'absolute',
                            top: '1.5rem',
                            right: '1.5rem',
                            borderRadius: '5rem',
                            height: 20,
                            width: 20,
                            backgroundColor: systemSelected ? '#000' : 'transparent',
                            border: `1px solid ${theme.palette.divider}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {systemSelected && <CheckCircleIcon sx={{ color: theme.palette.primary.main }} />}
                    </div>
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' >{t(`${system.label}`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ mb: 3, borderColor: theme.palette.text.secondary, opacity: .8 }} />
                            <Typography align='left' variant='body1' color='text.secondary'>
                                {t(`${system.description}`)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    );
}