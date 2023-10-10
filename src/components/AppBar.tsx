import { AppBar, Avatar, Box, Button, ButtonGroup, Container, Divider, FormControl, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
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
import { initialFormDataState, resetFormData, setFormData } from "../features/redux/reducers/formDataSlice";
import DarkModeSwitch from "./DarkModeSwitch";
import jhLogoDark from '../images/JH_logo.png'
import { openSnackbar } from "../features/redux/reducers/snackBarSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
    function loadFile(e: React.FormEvent<HTMLInputElement>) {
        const fileInput = e.target as HTMLInputElement;
        const file = fileInput.files?.[0];
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
            // Clear the input value to allow selecting the same file again
            fileInput.value = '';
        }
    }


    return (
        <AppBar position="static" color='default'>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={theme.palette.mode === 'dark' ? jhLogoDark : jhLogo} height='25' alt='JH_logo' />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                        <IconButton
                            size="large"
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
                                <DarkModeSwitch mobile={true} />
                            <Divider />
                            <MenuItem onClick={() => saveDataToFile()}>
                                <ListItemIcon><SaveIcon /></ListItemIcon>
                                <ListItemText>{t('ui.button.inquiry.save')}</ListItemText>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    const fileInput = document.getElementById('file-input') as HTMLInputElement;
                                    if (fileInput) {
                                        fileInput.click();
                                    }
                                }}
                            >
                                <ListItemIcon><UploadIcon /></ListItemIcon>
                                <ListItemText>{t('ui.button.inquiry.load')}</ListItemText>
                                <input
                                    type="file"
                                    accept=".json"
                                    id="file-input" // Assign an id to the input element
                                    style={{ display: 'none' }} // Hide the input element with CSS
                                    onInput={(e) => loadFile(e)}
                                />
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(resetFormData())} sx={{ color: theme.palette.error.main }}>
                                <ListItemIcon ><DeleteOutlineIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
                                <ListItemText>{t('ui.button.inquiry.clear')}</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                        <Stack spacing={3} direction='row'>
                            <FormControl size='small' sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Select
                                    id="language-select"
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
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
                            <DarkModeSwitch />
                                <Button onClick={() => saveDataToFile()} startIcon={<SaveIcon />}>
                                    <Stack direction='row' flex={1} spacing={1} alignItems='center' >
                                        <Typography>{t('ui.button.inquiry.save')}</Typography>
                                    </Stack>
                                </Button>
                                <Button startIcon={<UploadIcon />}>
                                    <Stack direction='row' flex={1} spacing={1} alignItems='center' onClick={() => {
                                        const fileInput = document.getElementById('file-input') as HTMLInputElement;
                                        if (fileInput) {
                                            fileInput.click();
                                        }
                                    }}>

                                        <Typography>{t('ui.button.inquiry.load')}</Typography>
                                        <input
                                            type="file"
                                            accept=".json"
                                            id="file-input" // Assign an id to the input element
                                            style={{ display: 'none' }} // Hide the input element with CSS
                                            onInput={(e) => loadFile(e)}
                                        />
                                    </Stack>
                                </Button>
                                <Button startIcon={<DeleteOutlineIcon />} color='error' onClick={() => dispatch(resetFormData())}>
                                    <Stack direction='row' flex={1} spacing={1} alignItems='center' >
                                        <Typography>{t('ui.button.inquiry.clear')}</Typography>
                                    </Stack>
                                </Button>
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}