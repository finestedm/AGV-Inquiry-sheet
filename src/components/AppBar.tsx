import { AppBar, Button, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material"
import { saveAs } from 'file-saver';
import { IFormData } from "../App";
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';

function saveDataToFile(formData: IFormData) {
    const data = JSON.stringify(formData);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'data.json');
};

function loadFile(e: React.ChangeEvent<HTMLInputElement>, formData: IFormData, setFormData: React.Dispatch<React.SetStateAction<IFormData>>) {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const loadedData = JSON.parse(event.target?.result as string);
                // Check if the loaded version matches the tool version
                if (loadedData.version === formData.version) {
                    setFormData(loadedData);
                } else {
                    alert(`Invalid file version (file version: ${loadedData.version}. Tool version: ${formData.version}.). Please select a valid file.`);
                }
            } catch (error) {
                console.error('Error parsing loaded file:', error);
                alert('Error parsing loaded file. Please select a valid file.');
            }
        };
        reader.readAsText(file);
    }
}

export default function TopBar({ formData, setFormData }: { formData: IFormData, setFormData: React.Dispatch<React.SetStateAction<IFormData>> }) {
    const showSaveInquiryText = useMediaQuery('(min-width: 600px)');

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#3c464b' }}>
            <Toolbar sx={{ py: 1, display: 'flex', justifyContent: 'space-between' }}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c8/Jungheinrich-Logo.svg' alt='JH_logo' style={{ height: '2rem' }} />
                <Stack direction='row' spacing={2}>
                    <Button variant="outlined" onClick={() => saveDataToFile(formData)} >
                        <SaveIcon />
                        {showSaveInquiryText && <Typography>Save inquiry</Typography>}
                    </Button>
                    <Button variant="outlined" component="label">
                        <UploadIcon />
                        {showSaveInquiryText && <Typography>Load inquiry</Typography>}
                        <input type="file" accept=".json" hidden onChange={(e) => loadFile(e, formData, setFormData)} />
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}