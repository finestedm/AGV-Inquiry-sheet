import { AppBar, Avatar, Box, Button, ButtonGroup, CircularProgress, Container, Divider, FormControl, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
import { saveAs } from 'file-saver';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import { useTranslation } from 'react-i18next';
import pl from '../images/poland.svg'
import en from '../images/uk.svg'
import de from '../images/germany.svg'
import jhLogo from '../images/Jungheinrich-Logo.svg'
import { SelectChangeEvent } from "@mui/material/Select";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../features/redux/store";
import { initialFormDataState, resetFormData, setFormData } from "../features/redux/reducers/formDataSlice";
import DarkModeSwitch from "./DarkModeSwitch";
import jhLogoDark from '../images/JH_logo.png'
import { openSnackbar } from "../features/redux/reducers/snackBarSlice";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dayjs from "dayjs";
import EditModeSwitch from "./EditModeSwitch";
import { setEditMode } from "../features/redux/reducers/editModeSlice";
import { updateClearFormDataDialog } from "../features/redux/reducers/clearFormDataDialogSlice";
import ClearFormDataDialog from "./ClearFormDataDialog";
import axios from 'axios'
import BackupIcon from '@mui/icons-material/Backup';
import { ActionCreators } from "redux-undo";
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { allPossibleSteps, setCurrentStep } from "../features/redux/reducers/stepsSlice";
import { findDifferences, getChangedKeys, mapPathToStep } from "../features/undo-redo/methods";

export default function TopBar({handleUndo, handleRedo}: {handleUndo: () => void, handleRedo: () => void}): JSX.Element {

    const theme = useTheme();

    const handleLanguageChange = (e: SelectChangeEvent<string>) => {
        i18n.changeLanguage(e.target.value);
    };

    const { t, i18n } = useTranslation();
    const formDataAll = useSelector((state: RootState) => state.formData);
    const formData = formDataAll.present
    const isSummaryStep = useSelector((state: RootState) => state.steps.currentStep) === 'summary';
    const isFormUnchaged = formData === initialFormDataState

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

    const canUndo = formDataAll.past.length > 0;
    const canRedo = formDataAll.future.length > 0;

    function saveDataToFile() {
        const data = JSON.stringify(formData);
        const blob = new Blob([data], { type: 'application/json' });
        const fileName = `${formData.customer.name}-${dayjs().format('YYYY-MM-DD-HH-mm')}.json`;
        saveAs(blob, fileName);
        dispatch(openSnackbar({ message: `${t('ui.snackBar.message.fileSaved')} ${fileName}`, severity: 'success' }));
    };

    const [isWaiting, setIsWaiting] = useState(false);
    const [isResolved, setIsResolved] = useState(false);

    async function saveDataToServer() {
        try {
            setIsWaiting(true);       // Set waiting state
            setIsResolved(false);     // Reset resolved state

            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                setIsResolved(true);  // Set resolved state on success
                dispatch(openSnackbar({ message: `${t('ui.snackBar.message.fileSavedToServer')}`, severity: 'success' }));
                saveDataToFile()
            }
        } catch (error) {
            console.error("Failed to save data:", error);
            dispatch(openSnackbar({ message: `${t('ui.snackBar.message.errorSaving')}. Error: ${error}`, severity: 'error' }));
        } finally {
            setIsWaiting(false);      // Reset waiting state
        }
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
                        dispatch(ActionCreators.clearHistory());
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
        dispatch(setEditMode(false))
    }

    return (
        <AppBar position="static" color="default">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={theme.palette.mode === 'dark' ? jhLogoDark : jhLogo} height='25' alt='JH_logo' />
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' }, justifyContent: 'flex-end', alignContent: 'flex-end' }}>
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
                                display: { xs: 'block', lg: 'none' },
                            }}
                        >
                            <MenuItem>
                                <Select
                                    disableUnderline
                                    id="language-select"
                                    fullWidth
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
                                    variant="standard"
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
                                    <MenuItem value="de">
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={de} alt="german" />
                                            <Typography>Deutsch</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Select>
                            </MenuItem>
                            <DarkModeSwitch mobile={true} />
                            <EditModeSwitch mobile={true} />
                            <Divider />
                            {isSummaryStep &&
                                <MenuItem onClick={() => saveDataToFile()}>
                                    <ListItemIcon><SaveIcon /></ListItemIcon>
                                    <ListItemText>{t('ui.button.inquiry.save')}</ListItemText>
                                </MenuItem>
                            }
                            {isSummaryStep &&
                                <MenuItem onClick={() => saveDataToServer()}>
                                    <ListItemIcon>{isWaiting ? <CircularProgress size={16} /> : <BackupIcon />}</ListItemIcon>
                                    <ListItemText>{t('ui.button.inquiry.saveToServer')}</ListItemText>
                                </MenuItem>
                            }
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
                            {!isFormUnchaged &&
                                <MenuItem
                                    onClick={() => { dispatch(updateClearFormDataDialog({ open: true })) }}
                                    sx={{ color: theme.palette.error.main }}
                                >
                                    <ListItemIcon ><DeleteOutlineIcon sx={{ color: theme.palette.error.main }} /></ListItemIcon>
                                    <ListItemText>{t('ui.button.inquiry.clear')}</ListItemText>
                                </MenuItem>
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'flex-end' }}>
                        <Stack spacing={1.25} direction='row'>
                            <FormControl sx={{ display: { xs: 'none', lg: 'block' }, border: "none" }} component={Box} alignContent='center'>
                                <Select
                                    disableUnderline
                                    id="language-select"
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
                                    variant="standard"
                                    color="primary"
                                    sx={{ boxShadow: "none" }}
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
                                    <MenuItem value="de">
                                        <Stack direction='row' className='flag-container' flex={1} spacing={1} alignItems='center' >
                                            <img src={de} alt="german" />
                                            <Typography>Deutsch</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Divider orientation="vertical" />
                            <DarkModeSwitch />
                            <Divider orientation="vertical" />
                            <EditModeSwitch />
                            <Divider orientation="vertical" />
                            {isSummaryStep &&
                                <>
                                    <Button variant='text' color="inherit" onClick={() => saveDataToFile()} startIcon={<SaveIcon />}>
                                        <Stack direction='row' flex={1} spacing={1} alignItems='center' >
                                            <Typography>{t('ui.button.inquiry.save')}</Typography>
                                        </Stack>
                                    </Button>
                                    <Divider orientation="vertical" />
                                    <Button variant='text' color="inherit" onClick={() => saveDataToServer()} startIcon={isWaiting ? <CircularProgress size={16} /> : <BackupIcon />}>
                                        <Stack direction='row' flex={1} spacing={1} alignItems='center' >
                                            <Typography>{t('ui.button.inquiry.saveToServer')}</Typography>
                                        </Stack>
                                    </Button>
                                    <Divider orientation="vertical" />

                                </>
                            }
                            <Button variant='text' color="inherit" startIcon={<UploadIcon />}>
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
                            <Divider orientation="vertical" />
                            <ButtonGroup
                                variant='text'
                                color="inherit"
                            >
                                <Button
                                    onClick={handleUndo}
                                    disabled={!canUndo}
                                    startIcon={<UndoIcon />}
                                >

                                </Button>
                                <Button
                                    startIcon={<DeleteOutlineIcon />}
                                    disabled={isFormUnchaged}
                                    color='error'
                                    onClick={() => { dispatch(updateClearFormDataDialog({ open: true })) }}
                                >
                                    <Stack direction='row' flex={1} spacing={1} alignItems='center' >
                                        <Typography>{t('ui.button.inquiry.clear')}</Typography>
                                    </Stack>
                                </Button>
                                <Button
                                    onClick={handleRedo}
                                    disabled={!canRedo}
                                    startIcon={<RedoIcon />}
                                >

                                </Button>
                            </ButtonGroup>
                            <Divider orientation="vertical" />
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
            <ClearFormDataDialog />
        </AppBar >
    )
}