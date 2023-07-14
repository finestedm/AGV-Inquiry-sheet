import { AppBar, Button, Toolbar } from "@mui/material"
import { saveAs } from 'file-saver';
import { IFormData } from "../App";

function saveDataToFile(formData: IFormData) {
    const data = JSON.stringify(formData); 
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, 'data.json');
};

export default function TopBar({formData}: {formData: IFormData}) {
    return (
        <AppBar position="sticky" sx={{backgroundColor: '#3c464b'}}>
            <Toolbar sx={{py:1, display: 'flex', justifyContent:'space-between'}}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c8/Jungheinrich-Logo.svg' alt='JH_logo' style={{height: '2rem'}} />
                <Button variant="outlined" onClick={() => saveDataToFile(formData)}>Save inquiry</Button>
            </Toolbar>
        </AppBar>
    )
}