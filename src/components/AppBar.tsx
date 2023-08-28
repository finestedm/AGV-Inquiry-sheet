import { AppBar, Avatar, Box, Button, Container, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
import { saveAs } from 'file-saver';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import pl from '../images/poland.svg'
import en from '../images/uk.svg'
import jhLogo from '../images/Jungheinrich-Logo.svg'
import { SelectChangeEvent } from "@mui/material/Select";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { setFormData } from "../features/redux/reducers/formDataSlice";
import DarkModeSwitch from "./DarkModeSwitch";
import jhLogoDark from '../images/JH_logo.png'
import { openSnackbar } from "../features/redux/reducers/snackBarSlice";
import dayjs from "dayjs";


export default function TopBar(): JSX.Element {

    const theme = useTheme();

    const handleLanguageChange = (e: SelectChangeEvent<string>) => {
        i18n.changeLanguage(e.target.value);
    };

    const { t, i18n } = useTranslation();

    const formData = useSelector((state: RootState) => state.formData);
    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function saveDataToFile() {
        const data = JSON.stringify(formData);
        const blob = new Blob([data], { type: 'application/json' });
        const fileName = `${formData.customer.name}-${dayjs().format('YYYY-MM-DD-HH-mm')}.json`;
        saveAs(blob, fileName);
        dispatch(openSnackbar({ message: `${t('ui.snackBar.message.fileSaved')} ${fileName}`, severity: 'success' }));
    };

    function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const loadedData = JSON.parse(event.target?.result as string);
                    // Check if the loaded version matches the tool version
                    if (loadedData.version === formData.version) {
                        dispatch(setFormData(loadedData));
                        dispatch(openSnackbar({ message: t('ui.snackBar.message.fileLoaded'), severity: 'success' }));
                    } else {
                        dispatch(openSnackbar({ message: t('ui.snackBar.message.fileLoadError.wrongVersion'), severity: 'error' }));
                    }
                } catch (error) {
                    console.error('Error parsing loaded file:', error);
                    dispatch(openSnackbar({ message: t('ui.snackBar.message.fileLoadError.other'), severity: 'error' }));
                }
            };
            reader.readAsText(file);
        }
    }


    return (
        <AppBar position="static" color='default'>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <img src={theme.palette.mode === 'dark' ? jhLogoDark : jhLogo} height='25' alt='JH_logo' />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem>
                                <Select
                                    id="language-select"
                                    fullWidth
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
                                    variant="outlined"
                                    size="small"
                                >
                                    <MenuItem value="en" >
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={en} alt="english" />
                                            <Typography>English</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="pl">
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={pl} alt="polish" />
                                            <Typography>Polski</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Select>
                            </MenuItem>
                            <MenuItem onClick={() => saveDataToFile()}>
                                <Button fullWidth variant="outlined" className='save-button' startIcon={<SaveIcon />} >
                                    <Typography>{t('ui.button.inquiry.save')}</Typography>
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <Button fullWidth variant="outlined" className='upload-button' startIcon={<UploadIcon />}>
                                    <Typography>{t('ui.button.inquiry.load')}</Typography>
                                    <input type="file" accept=".json" hidden onChange={(e) => loadFile(e)} />
                                </Button>
                            </MenuItem>
                            <MenuItem>
                                <DarkModeSwitch fullWidth={true} />
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        <Stack spacing={3} direction='row'>
                            <FormControl sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Select
                                    id="language-select"
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
                                    variant="outlined"
                                    size="small"
                                >
                                    <MenuItem value="en" >
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={en} alt="english" />
                                            <Typography>English</Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem value="pl">
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={pl} alt="polish" />
                                            <Typography>Polski</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <DarkModeSwitch fullWidth={false} />
                            <Button variant="outlined" color='success' onClick={() => saveDataToFile()} sx={{ display: { xs: 'none', md: 'flex' } }} startIcon={<SaveIcon />}>
                                <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                    <Typography>{t('ui.button.inquiry.save')}</Typography>
                                </Stack>
                            </Button>
                            <Button variant="outlined" color='success' component="label" sx={{ display: { xs: 'none', md: 'flex' } }} startIcon={<UploadIcon />}>
                                <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                    <Typography>{t('ui.button.inquiry.load')}</Typography>
                                    <input type="file" accept=".json" hidden onChange={(e) => loadFile(e)} />
                                </Stack>
                            </Button>
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}