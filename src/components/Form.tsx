import { Box, Checkbox, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormData, IFormProps } from "../App";
import SystemSelector from "./SystemSelector";

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']

export interface ISystems {
  [key: string]: {
    url: string;
    alt: string;
  };
}

const systems: ISystems = {
  ASRS: {url: 'https://www.jungheinrich.cn/resource/image/540796/landscape_ratio16x10/750/469/4de74d221121a65bc7e0c08b6d4285da/1FA625729DA78A1AD6585E27F629F67B/stage-automatic-small-parts-storage.jpg', alt: 'ASRS'},
  LRKPRK: {url: 'https://www.jungheinrich.cn/resource/image/540918/landscape_ratio16x10/750/469/40bd0c110ea57c96e6b5a51e6d6728ed/1F26C0C524BFC81ADDA1253482D95F1A/stage-small-parts-storage-dynamic.jpg', alt: 'LRK&PRK'},
  AGV: {url: 'https://www.jungheinrich.cn/resource/image/540798/landscape_ratio16x10/750/469/5207e5fdaf2ac8a1858bcdae07a44ab2/FE5BFAE61CB18BBD620473590B9B437E/stage-agv-system.jpg', alt: 'AGV'},
  AutoVNA: {url: 'https://www.jungheinrich.cn/resource/image/541672/landscape_ratio16x10/750/469/c7d514ecb2cce052105a89c86396a92b/2F274C04399B4D9A89056F7A564042BA/stage-automated-high-rack-stacker.jpg', alt: 'AutoVNA'}
}

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

  // Universal handleInputMethod function
  const handleInputMethod = <K extends keyof IFormData>(
    topLevelKey: K,
    fieldPath: keyof IFormData[K],
    value: IFormData[K][keyof IFormData[K]]
  ) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      // Access the top-level key in the formData object
      const topLevelObject = newFormData[topLevelKey];

      // Update the field value
      topLevelObject[fieldPath] = value;

      return newFormData;
    });
  };


  const handleIndustryChange = (value: string) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };

      newFormData.customer.industryName = [...prevFormData.customer.industryName, value];

      return newFormData;
    });
  };

  if (formData) {
    return (
      <Container component='form'>
        <Grid container component={List} spacing={3}>
          <Grid item xs={12} md={6}>
            {/* DANE JEDNOSTKI GOSPODARCZEJ */}
        <ListItem>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
                <TextField
                  fullWidth
                  label='Jednostka sprzedażowa'
                  name="sales.salesUnit"
                  value={formData.sales.salesUnit}
                  onChange={(e) => handleInputMethod('sales',  'salesUnit', e.target.value)}
                />
                <TextField
                  label='Osoba kontaktowa'
                  name="sales.contactPerson"
                  value={formData.sales.contactPerson}
                  onChange={(e) => handleInputMethod('sales',  'contactPerson', e.target.value)}
                />
                <TextField
                  label='Funkcja osoby kontaktowej'
                  name="sales.contactPersonRole"
                  value={formData.sales.contactPersonRole}
                  onChange={(e) => handleInputMethod('sales',  'contactPersonRole', e.target.value)}
                />
              </Stack>
            </ListItem>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* DANE KLIENTA */}
            <ListItem>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h4">Dane klienta:</Typography>
                <TextField
                  label='Firma / klient'
                  name="customer.company"
                  value={formData.customer.company}
                  onChange={(e) => handleInputMethod('customer',  'company', e.target.value)}
                />
                <TextField
                  label='Numer sap'
                  placeholder="41******"
                  name="customer.sapNumber"
                  value={formData.customer.sapNumber}
                  defaultValue=''
                  onChange={(e) => handleInputMethod('customer',  'sapNumber', e.target.value)}
                />
                <FormControl>
                  <InputLabel id="demo-multiple-checkbox-label">Branża</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    input={<OutlinedInput label="Industry" />}
                    value={formData.customer.industryName}
                    onChange={(e) => handleInputMethod('customer', 'industryName', e.target.value as string[])}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    MenuProps={MenuProps}
                  >
                    {industries.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={formData.customer.industryName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {formData.customer.industryName.includes('Inna') &&
                  <TextField
                    label="Inna branża"
                    name="Inna"
                    value={otherIndustry}
                    onChange={(e) => setOtherIndustry(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleIndustryChange(((e.target as HTMLInputElement) as HTMLInputElement).value);
                      }
                    }}
                  />
                }
                <TextField
                  label='Adres'
                  placeholder="Popularna 13B"
                  name="customer.address"
                  value={formData.customer.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputMethod('customer',  'address', e.target.value)}
            />
          </Stack>
            </ListItem>
          </Grid>
          <Grid item xs={12}>
            {/* WYBÓR SYSTEMU */}
            <ListItem>
              <SystemSelector formData={formData} systems={systems} setFormData={setFormData} />
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