import { AppBar, Button, Toolbar } from "@mui/material"

export default function TopBar() {
    return (
        <AppBar position="static" sx={{backgroundColor: '#3c464b'}}>
            <Toolbar sx={{py:1, display: 'flex', justifyContent:'space-between'}}>
                <img src='https://upload.wikimedia.org/wikipedia/commons/c/c8/Jungheinrich-Logo.svg' alt='JH_logo' style={{height: '2rem'}} />
                <Button variant="outlined">Save inquiry</Button>
            </Toolbar>
        </AppBar>
    )
}