import { AppBar, IconButton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({sidebarOpen, handleSidebarOpening}: {sidebarOpen: boolean, handleSidebarOpening: () => void}) {
    const darkMode = useSelector((state: RootState) => state.darkMode)
    const theme = useTheme();
    const isSmallest = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <AppBar
            position="relative"
            color='default'
            sx={{ top: 0, bottom: 'auto', borderBottom: 1, borderColor: theme.palette.divider, backgroundColor: theme.palette.background.paper }}
        >
            <Toolbar>
                {isSmallest &&
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleSidebarOpening}
                    sx={[
                        {
                            mr: 2,
                        },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
}
            </Toolbar>
        </AppBar>
    )
}