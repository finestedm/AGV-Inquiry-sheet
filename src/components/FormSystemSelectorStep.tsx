import { Box, Checkbox, Grid, Stack, Typography } from "@mui/material";
import { ISystems } from "./Form";
import { IFormData } from "../App";
import CheckIcon from '@mui/icons-material/Check';

export default function FormSystemSelectorStep({ systems, formData, setFormData }: { systems: ISystems; formData: IFormData; setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {
  function SystemIcon({ url, alt, formData, setFormData }: { url: string; alt: string; formData: IFormData; setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleSystemChange = (alt: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        system: {
          ...prevFormData.system,
          [alt.toLowerCase()]: !prevFormData.system[alt.toLowerCase()],
        },
      }));
    };

    return (
      <Grid item xs={6} sm={3}>
        <Checkbox
          sx={{ p: 0 }}
          {...label}
          checked={formData.system[alt.toLowerCase()]}
          onChange={e => handleSystemChange(alt)}
          icon={
            <Box className="system-icon" style={{ width: '100%' }}>
              <img
                style={{
                  filter: 'saturate(0%)',
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '.25rem',
                  position: 'relative',
                }}
                src={url}
                alt={alt}
              />
              <Typography
                className="overlay-text"
                variant="h5"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  textShadow: '0 0 .4rem black',
                  textAlign: 'center',
                }}
              >
                {alt}
              </Typography>
            </Box>
          }
          checkedIcon={
            <Box className="system-icon" style={{ width: '100%' }}>
              <img
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  borderRadius: '.25rem',
                  position: 'relative',
                }}
                src={url}
                alt={alt}
              />
              <Typography
                className="overlay-text"
                variant="h5"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  textShadow: '0 0 .4rem black',
                  textAlign: 'center',
                }}
              >
                <CheckIcon style={{ fontSize: '2rem' }} />
                <br />
                {alt}
              </Typography>
            </Box>
          }
        />
      </Grid>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" textAlign='left'>Wybór systemu:</Typography>
      <Box>
        <Grid container spacing={3}>
          {
            Object.entries(systems).map(([key, value]) => (
              <SystemIcon url={value.url} alt={value.alt} formData={formData} setFormData={setFormData} />
            ))
          }
        </Grid>
      </Box>
    </Stack>
  )
}