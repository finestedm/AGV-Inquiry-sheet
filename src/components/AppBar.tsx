import { AppBar, Button, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { saveAs } from 'file-saver';
import { IFormData } from "../App";
import SaveAltIcon from '@mui/icons-material/SaveAlt';

function saveDataToFile(formData: IFormData) {
    const data = JSON.stringify(formData);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'data.json');
};

export default function TopBar({ formData }: { formData: IFormData }) {
    const showSaveInquiryText = useMediaQuery('(min-width: 600px)');

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#3c464b' }}>
            <Toolbar sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c8/Jungheinrich-Logo.svg' alt='JH_logo' style={{ height: '2rem' }} />
                <Button variant="outlined" onClick={() => saveDataToFile(formData)} >
                    <SaveAltIcon sx={{ height: '1.25rem' }} />
                    {showSaveInquiryText && <Typography>Save inquiry</Typography>}
                </Button>
            </Toolbar>
        </AppBar>
    )
}