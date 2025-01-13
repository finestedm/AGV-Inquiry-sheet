import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar() {
    const darkMode = useSelector((state: RootState) => state.darkMode)
    const theme = useTheme();

    return (
        <AppBar
            position="relative"
            color='default'
            sx={{ top: 0, bottom: 'auto', borderBottom: 1, borderColor: theme.palette.divider, backgroundColor: !darkMode ? 'white' : 'transparent' }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={[
                        {
                            mr: 2,
                        },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}