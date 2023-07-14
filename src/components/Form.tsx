import { Box, Checkbox, Container, FormControl, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormProps } from "../App";

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

export default function Form({ formData, setFormData }: IFormProps): JSX.Element {
  
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
          </Stack>
        </ListItem>
      </List>
    </Container>
  );
} else {
  return (<h2>hmm</h2>)
}
}
