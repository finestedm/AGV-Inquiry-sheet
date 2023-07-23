import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IFormData } from '../App';
import { ISystem } from './FormSystemSelectorStep';


export default function SystemCard({ system, formData, setFormData }: { system: ISystem, formData: IFormData; setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {
    const ariaLabel = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

    return (
        <Grid item xs={6} sm={3}>
            <Card>
                <CardActionArea
                    onClick={e => handleSystemChange(system.alt)}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        image={system.url}
                        alt={system.alt}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {system.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {system.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        {t('ui-button-readmore')}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}