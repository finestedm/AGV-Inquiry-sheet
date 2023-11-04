import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Divider, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ISystem, ISystems } from '../../../../features/interfaces';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../features/redux/store';
import { handleSystemChange } from '../../../../features/redux/reducers/formDataSlice';

export default function SystemCard({ system }: { system: ISystem }): JSX.Element {

    const theme = useTheme()

    const formData = useSelector((state: RootState) => state.formData);
    const editMode = useSelector((state: RootState) => state.editMode);
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const systemSelected = formData.system[system.alt].selected;

    function hexToRgb(hex: string) {
        // Remove the hash at the beginning if present
        hex = hex.replace(/^#/, '');

        // Parse the hex values into separate RGB values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return [r, g, b];
    };

    function generateBackgroundColor(alpha: number) {
        const rgbValues = hexToRgb(theme.palette.success.main);
        return `rgba(${rgbValues.join(', ')}, ${alpha})`;
    };

    return (
        <Grid item xs={12} md={6}>
            <Card elevation={2} className={systemSelected ? 'selected-card' : ''} sx={{ borderColor: systemSelected ? theme.palette.success.main : theme.palette.divider, boxShadow: 'none', backgroundColor: systemSelected ? generateBackgroundColor(.025) : theme.palette.background.default }}>
                <CardActionArea
                    sx={{ position: 'relative' }}
                    disabled={!editMode}
                    onClick={e => dispatch(handleSystemChange(system.alt))}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            borderRadius: '5rem',
                            height: '2rem',
                            width: '2rem',
                            backgroundColor: theme.palette.background.default,
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
                    <div
                        style={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                            height: '100%',
                            width: '100%',
                            backgroundColor: systemSelected ? generateBackgroundColor(0.2) : 'transparent',
                        }}
                    />
                </CardActionArea>
                <CardActions>
                    <Accordion disableGutters elevation={0} sx={{ backgroundColor: 'transparent' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ fill: systemSelected ? theme.palette.success.main : theme.palette.text.primary }} />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography variant='h6' align='left' sx={{ color: systemSelected ? theme.palette.success.main : theme.palette.text.primary }}>{t(`${system.label}`)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Divider sx={{ mb: 3, borderColor: systemSelected ? theme.palette.success.light : theme.palette.divider  }} />
                            <Typography align='left' sx={{ color: systemSelected ? theme.palette.success.main : theme.palette.text.secondary }}>
                                {t(`${system.description}`)}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </CardActions>
            </Card>
        </Grid >
    );
}