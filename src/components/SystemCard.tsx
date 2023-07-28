import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFormData } from '../App';
import { ISystem } from './FormSystemSelectorStep';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Height } from '@mui/icons-material';

export default function SystemCard({ system, formData, setFormData }: { system: ISystem, formData: IFormData; setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {

    const theme = useTheme()


    const handleSystemChange = (alt: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            system: {
                ...prevFormData.system,
                [alt.toLowerCase()]: !prevFormData.system[alt.toLowerCase()],
            },
        }));
    };

    const { t } = useTranslation();

    console.log(formData.system[(system.alt).toLowerCase()])

    return (
        <Grid item xs={6} md={3}>
            <Card>
                <CardActionArea
                    sx={{ position: 'relative' }}
                    onClick={e => handleSystemChange(system.alt)}
                >
                    {formData.system[(system.alt).toLowerCase()] && (
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
                                boxShadow: '0 .5rem 1rem'
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{color: theme.palette.success.main}}  />
                        </div>
                    )}
                    <CardMedia
                        component="img"
                        height="200"
                        image={system.url}
                        alt={system.alt}
                    >
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" textAlign='left'>
                            {system.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" textAlign='left'>
                            {system.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="success">
                        {t('ui.button.readmore')}
                    </Button>
                </CardActions>
            </Card>
        </Grid >
    );
}