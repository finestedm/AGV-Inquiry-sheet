import { Box, Checkbox, Container, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const industries = ['Produkcja', 'Handel', 'Dostawca usług logistycznych', 'Branża farmaceutyczna', 'Branża napojowa', 'Branża odzieżowa', 'Branża chemiczna', 'Przemysł spożywczy', 'Automotive', 'Inna']
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
  
  

export default function Form() {
    const [industryName, setIndustryName] = useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof industryName>) => {
        const {
          target: { value },
        } = event;
        setIndustryName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    
    return (
        <Container component='form'>
            <List>
                <ListItem>
                    <Stack spacing={2}>
                        <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
                        <TextField label='Jednostka sprzedażowa' defaultValue='S1-PL'/>  
                        <TextField label='Osoba kontaktowa'/>  
                        <TextField label='Funkcja osoby kontaktowej'/>  
                    </Stack>
                </ListItem>
                <ListItem>
                    <Stack spacing={2}>
                        <Typography variant="h4">Dane klienta:</Typography>
                        <TextField label='Firma / klient'/>  
                        <TextField label='Numer sap' placeholder="41******"/>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                input={<OutlinedInput label="Industry" />}
                                value={industryName}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                >
                            {industries.map((name) => (
                                <MenuItem key={name} value={name}>
                                <Checkbox checked={industryName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </ListItem>
            </List>
        </Container>
    )
}