import { Stack, TextField, Typography } from "@mui/material";
import { IFormData } from "../App";
import { IHandleInputMethod } from "./Form";

export default function FormSalesUnitStep({formData, handleInputMethod}: {formData: IFormData, handleInputMethod: IHandleInputMethod}) {
    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h4">Dane jednostki sprzedażowej:</Typography>
                <TextField
                    fullWidth
                    disabled
                    label='Jednostka sprzedażowa'
                    name="sales.salesUnit"
                    value={formData.sales.salesUnit}
                    onChange={(e) => handleInputMethod('sales', 'salesUnit', e.target.value)}
                />
                <TextField
                    label='Osoba kontaktowa'
                    name="sales.contactPerson"
                    value={formData.sales.contactPerson}
                    onChange={(e) => handleInputMethod('sales', 'contactPerson', e.target.value)}
                    required
                    error={formData.sales.contactPerson.length < 5}
                    helperText={formData.sales.contactPerson.length < 5 ? 'Minimum length of 5 letters required' : ''}
                />

                <TextField
                    label='Funkcja osoby kontaktowej'
                    name="sales.contactPersonRole"
                    value={formData.sales.contactPersonRole}
                    onChange={(e) => handleInputMethod('sales', 'contactPersonRole', e.target.value)}
                  />
        </Stack>
    )
}