import { Box, Checkbox, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps } from "../App";

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']

const urlASRS =
  'https://www.jungheinrich.cn/resource/image/540796/landscape_ratio16x10/750/469/4de74d221121a65bc7e0c08b6d4285da/1FA625729DA78A1AD6585E27F629F67B/stage-automatic-small-parts-storage.jpg';
const urlLRKPRK =
  'https://www.jungheinrich.cn/resource/image/540918/landscape_ratio16x10/750/469/40bd0c110ea57c96e6b5a51e6d6728ed/1F26C0C524BFC81ADDA1253482D95F1A/stage-small-parts-storage-dynamic.jpg';
const urlAGV =
  'https://www.jungheinrich.cn/resource/image/540798/landscape_ratio16x10/750/469/5207e5fdaf2ac8a1858bcdae07a44ab2/FE5BFAE61CB18BBD620473590B9B437E/stage-agv-system.jpg';
const urlAutoVNA =
  'https://www.jungheinrich.cn/resource/image/541672/landscape_ratio16x10/750/469/c7d514ecb2cce052105a89c86396a92b/2F274C04399B4D9A89056F7A564042BA/stage-automated-high-rack-stacker.jpg';

//props for the insdustries select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Form({ formData, setFormData }: IFormProps): JSX.Element {

  const [otherIndustry, setOtherIndustry] = useState<string>('')

  //industry selection handling
  const handleChange = (event: SelectChangeEvent<typeof formData.industryName>) => {
    const {
      target: { value },
    } = event;
    setFormData((prevFormData) => ({
      ...prevFormData,
      industryName: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIndustryChange = (value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      industryName: [...prevFormData.industryName, value],
    }));
  };

  if (formData) {
    return (
      <Container component='form'>
        <Grid container component={List} spacing={3}>
          <Grid item xs={12} md={6}>
            <ListItem>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
                <TextField
                  fullWidth
                  label='Jednostka sprzedażowa'
                  name="salesUnit"
                  value={formData.salesUnit}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Osoba kontaktowa'
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Funkcja osoby kontaktowej'
                  name="contactPersonRole"
                  value={formData.contactPersonRole}
                  onChange={handleInputChange}
                />
              </Stack>
            </ListItem>
          </Grid>
          <Grid item xs={12} md={6}>
            <ListItem>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h4">Dane klienta:</Typography>
                <TextField
                  label='Firma / klient'
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
                <TextField
                  label='Numer sap'
                  placeholder="41******"
                  name="sapNumber"
                  value={formData.sapNumber}
                  defaultValue=''
                  onChange={handleInputChange}
                />
                <FormControl>
                  <InputLabel id="demo-multiple-checkbox-label">Branża</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    input={<OutlinedInput label="Industry" />}
                    value={formData.industryName}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {industries.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={formData.industryName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formData.industryName.includes('Inna') &&
                  <TextField
                    label="Inna branża"
                    name="Inna"
                    value={otherIndustry}
                    onChange={(e) => setOtherIndustry(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleIndustryChange((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                }
              </Stack>
            </ListItem>
          </Grid>
          <Grid item xs={12}>
            <ListItem>
              <Stack spacing={2}>
                <Typography variant="h4">Wybór systemu:</Typography>
                <Box>
                  <Grid container spacing={3}>
                    <SystemIcon url={urlASRS} alt="ASRS" formData={formData} setFormData={setFormData} />
                    <SystemIcon url={urlLRKPRK} alt="LRK&PRK" formData={formData} setFormData={setFormData} />
                    <SystemIcon url={urlAGV} alt="AGV" formData={formData} setFormData={setFormData} />
                    <SystemIcon url={urlAutoVNA} alt="AutoVNA" formData={formData} setFormData={setFormData} />
                  </Grid>
                </Box>
              </Stack>
            </ListItem>
          </Grid>
        </Grid>
      </Container >
    );
  } else {
    return (<h2>hmm</h2>)
  }
}

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
              {alt}
            </Typography>
          </Box>
        }
      />
    </Grid>
  );
}