import { Box, Checkbox, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormProps } from "../App";

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']

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

  if (formData) {
    return (
    <Container component='form'>
      <List>
        <ListItem>
          <Stack spacing={2}>
            <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
            <TextField
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
        <ListItem>
          <Stack spacing={2}>
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
              onChange={handleInputChange}
            />
            <FormControl>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
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
            <Box>
              <Grid container columnSpacing={2}>
                <SystemIcon url='https://www.jungheinrich.cn/resource/image/540796/landscape_ratio16x10/750/469/4de74d221121a65bc7e0c08b6d4285da/1FA625729DA78A1AD6585E27F629F67B/stage-automatic-small-parts-storage.jpg' alt='ASRS' />
                <SystemIcon url="https://www.jungheinrich.cn/resource/image/540918/landscape_ratio16x10/750/469/40bd0c110ea57c96e6b5a51e6d6728ed/1F26C0C524BFC81ADDA1253482D95F1A/stage-small-parts-storage-dynamic.jpg" alt="LRK & PRK" />
                <SystemIcon url="https://www.jungheinrich.cn/resource/image/540798/landscape_ratio16x10/750/469/5207e5fdaf2ac8a1858bcdae07a44ab2/FE5BFAE61CB18BBD620473590B9B437E/stage-agv-system.jpg" alt="AGV"/>
                <SystemIcon url="https://www.jungheinrich.cn/resource/image/541672/landscape_ratio16x10/750/469/c7d514ecb2cce052105a89c86396a92b/2F274C04399B4D9A89056F7A564042BA/stage-automated-high-rack-stacker.jpg" alt="AutoVNA"/>
              </Grid>
            </Box>
          </Stack>
        </ListItem>
      </List>
    </Container>
  );
} else {
  return (<h2>hmm</h2>)
}
}

function SystemIcon({url, alt}: {url: string, alt: string}) {
  const label = { inputProps: { 'aria-label': 'Checkbox demo'} };
  return (
    <Grid item xs={3} >
       <Checkbox
    sx={{ p: 0 }}
    {...label}
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
        <div
          className="overlay-text"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.25rem',
            color: '#fff',
            textShadow: '0 0 .4rem black',
            textAlign: 'center',
          }}
        >
          {alt}
        </div>
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
        <div
          className="overlay-text"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.25rem',
            color: '#fff',
            textShadow: '0 0 .4rem black',
            textAlign: 'center',
          }}
        >
          {alt}
        </div>
      </Box>
    }
  />
    </Grid>
  )
}