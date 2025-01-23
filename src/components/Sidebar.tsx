import { Avatar, Box, Button, Card, CircularProgress, Collapse, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, MenuItem, Select, SelectChangeEvent, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import jhLogo from '../images/Jungheinrich-Logo.svg'
import jhLogoDark from '../images/JH_logo.png'
import jhLogoSmall from '../images/Jungheinrich-Logo-J_.svg'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { initialFormDataState, setFormData } from "../features/redux/reducers/formDataSlice";
import { useEffect, useState } from "react";
import { openSnackbar } from "../features/redux/reducers/snackBarSlice";
import axios from "axios";
import { ActionCreators } from "redux-undo";
import { setEditMode } from "../features/redux/reducers/editModeSlice";
import { saveAs } from 'file-saver';
import dayjs from "dayjs";
import pl from '../images/poland.svg'
import en from '../images/uk.svg'
import de from '../images/germany.svg'
import { setDarkMode } from "../features/redux/reducers/darkModeSlice";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ModeIcon from '@mui/icons-material/Mode';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import BackupIcon from '@mui/icons-material/Backup';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { updateClearFormDataDialog } from "../features/redux/reducers/clearFormDataDialogSlice";
import tinycolor from "tinycolor2";
import placeholderPhoto from '../images/bio-portrait-placeholder.webp'

export default function Sidebar({ handleUndo, handleRedo, sidebarOpen, handleSidebarOpening }: { handleUndo: () => void, handleRedo: () => void, sidebarOpen: boolean, handleSidebarOpening: () => void }): JSX.Element {
    const theme = useTheme();
    const darkMode = useSelector((state: RootState) => state.darkMode);
    const editMode = useSelector((state: RootState) => state.editMode);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallest = useMediaQuery(theme.breakpoints.only('xs'))

    const { t, i18n } = useTranslation();
    const formDataAll = useSelector((state: RootState) => state.formData);
    const formData = formDataAll.present
    const isSummaryStep = useSelector((state: RootState) => state.steps.currentStep) === 'summary';
    const isFormUnchaged = formData === initialFormDataState

    const dispatch = useDispatch();

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

    // help contact dialog //
    const [helpDialogOpen, setHelpDialogOpen] = useState(false);

    function handleHelpDialogOpening() {
        setHelpDialogOpen(true)
    }

    function handleHelpDialogClosing() {
        setHelpDialogOpen(!helpDialogOpen)
    }

    return (
        <Drawer
            variant={isSmallest ? 'temporary' : "persistent"}
            open={sidebarOpen || !isSmallest}
            onClose={handleSidebarOpening}
            sx={{
                backgroundColor: 'transparent',
                width: isMobile ? isSmallest ? 275 : 55 : 275,
                border: 'none',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? isSmallest ? 275 : 55 : 275,
                }
            }}
        >
            <Stack justifyContent='center' height='100%'>
            <Box>
                <Toolbar sx={{ flex: 1, justifyContent: 'center', maxHeight: 65, backgroundColor: !darkMode ? 'white' : 'transparent', borderBottom: 1, borderColor: theme.palette.divider }}>
                {isMobile
                    ? <img src={jhLogoSmall} height='30' alt='JH_logo' />
                    : <img src={theme.palette.mode === 'dark' ? jhLogoDark : jhLogo} height='25' alt='JH_logo' />
                }

                </Toolbar>
            </Box>
            <Box flexGrow={1}>
            <Box p={(isMobile && !isSmallest) ? 0 : 1.5} >
                <List sx={{ width: '100%', pb: 2 }} subheader={isMobile && !isSmallest ? '' : <Typography component='h6' color="text.secondary" textAlign='left' pb={.5} variant="caption">{t('sidebar.sectionTitle.settings')}</Typography>}>
                    <ListItem disablePadding>
                        <Select
                            sx={{
                                p: .25,
                                backgroundColor: 'transparent',
                                border: 'none',
                                boxShadow: 'none',
                                height: 45,
                                '& .MuiInputBase-inputSizeSmall': {
                                    padding: '0px',
                                    minWidth: '20px'
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none'
                                },
                            }}
                            disableUnderline
                            size="small"
                            renderValue={val => <LanguageMenuItem lang={val as TAvailableLanguages} img={en} />}
                            fullWidth
                            value={i18n.language}
                            
                        >
                            <LanguageMenuItem lang="en" img={en} />
                            <LanguageMenuItem lang="pl" img={pl} />
                            <LanguageMenuItem lang="de" img={de} />

                        </Select>
                    </ListItem>
                    <SidebarListItem
                        onClick={() => dispatch(setDarkMode(!darkMode))}
                        icon={!darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        text={darkMode ? t('ui.switch.darkMode.dark') : t('ui.switch.darkMode.light')}
                    />
                    <SidebarListItem
                        onClick={() => dispatch(setEditMode(!editMode))}
                        icon={!editMode ? <ModeIcon /> : <ImageSearchIcon />}
                        text={editMode ? t('ui.switch.editMode.edit') : t('ui.switch.editMode.read')}
                    />
                </List>
                <List sx={{ width: '100%', pb: 2 }} subheader={!isMobile && !isSmallest ? <Typography component='h6' color="text.secondary" textAlign='left' pb={.5} variant="caption">{t('sidebar.sectionTitle.inquiry')}</Typography> : ''}>
                    <SidebarListItem
                        onClick={() => {
                            const fileInput = document.getElementById('file-input') as HTMLInputElement;
                            if (fileInput) fileInput.click();
                        }}
                        icon={<UploadIcon />}
                        text={t('ui.button.inquiry.load')}
                    />
                    <input
                        type="file"
                        accept=".json"
                        id="file-input"
                        style={{ display: 'none' }}
                        onInput={(e) => loadFile(e)}
                    />

                    {isSummaryStep && (
                        <>
                            <SidebarListItem
                                onClick={saveDataToFile}
                                icon={<SaveIcon />}
                                text={t('ui.button.inquiry.save')}
                            />
                            <SidebarListItem
                                onClick={saveDataToServer}
                                icon={isWaiting ? <CircularProgress size={16} /> : <BackupIcon />}
                                text={t('ui.button.inquiry.saveToServer')}
                            />
                        </>
                    )}
                    {!isFormUnchaged &&
                        <SidebarListItem
                            onClick={() => { dispatch(updateClearFormDataDialog({ open: true })) }}
                            icon={<DeleteOutlineIcon />}
                            text={t('ui.button.inquiry.clear')}
                        />
                    }
                </List>
                <List sx={{ width: '100%', pb: 2 }} subheader={isMobile && !isSmallest  ? '' : <Typography component='h6' color="text.secondary" textAlign='left' pb={.5} variant="caption">{t('sidebar.sectionTitle.edit')}</Typography>}>
                    <SidebarListItem
                        onClick={handleUndo}
                        disabled={!canUndo}
                        icon={<UndoIcon />}
                        text={t('ui.button.inquiry.undo')}
                    >
                    </SidebarListItem>
                    <SidebarListItem
                        onClick={handleRedo}
                        disabled={!canRedo}
                        icon={<RedoIcon />}
                        text={t('ui.button.inquiry.redo')}
                    >
                    </SidebarListItem>
                </List >
            </Box>
            </Box>
            <Box p={(isMobile && !isSmallest) ? 0 : 1.5} mb={isMobile && !isSmallest ? 8 : 0}>
            <List sx={{ width: '100%' }} subheader={isMobile && !isSmallest  ? '' : <Typography component='h6' color="text.secondary" textAlign='left' pb={.5} variant="caption">{t('sidebar.sectionTitle.help')}</Typography>}>
            <SidebarListItem
                        onClick={handleHelpDialogOpening}
                        icon={<ContactSupportOutlinedIcon />}
                        text={t('ui.button.inquiry.contact')}
                    />
            </List>
            </Box>
            </Stack>
            <HelpDialog helpDialogOpen={helpDialogOpen} handleHelpDialogClosing={handleHelpDialogClosing} />
        </Drawer >
    )
}


interface SidebarListItemProps {
    onClick: () => void;
    icon: React.ReactNode;
    text: string | React.ReactNode;
    disabled?: boolean;
    children?: React.ReactNode;
}

export function SidebarListItem({ onClick, icon, text, disabled = false }: SidebarListItemProps): JSX.Element {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isSmallest = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ borderRadius: 1, color: theme.palette.text.secondary, '&:hover': { color: theme.palette.text.primary } }} onClick={onClick} disabled={disabled}>
                <ListItemIcon>{icon}</ListItemIcon>
                {!(isMobile && !isSmallest) && <ListItemText primary={text} />}
            </ListItemButton>
        </ListItem>
    )
}

type TAvailableLanguages = 'en' | 'pl' | 'de'

export function LanguageMenuItem({ lang, img }: { lang: TAvailableLanguages, img: string }) {

    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e: TAvailableLanguages) => {
        i18n.changeLanguage(e);
    };


    function fullLangName() {
        switch (lang) {
            case 'en':
                return 'English'
                break;
            case 'pl':
                return 'Polish'
                break;
            case 'de':
                return 'German'
                break;
            default:
                break;
        }
    }

    return (
        <MenuItem value={lang} onClick={() => handleLanguageChange(lang)}>
            <Stack direction="row" spacing={3.5} alignItems="center">
                <img src={img} alt={lang} style={{ width: 24, height: 16 }} />
                <Typography>{fullLangName()}</Typography>
            </Stack>
        </MenuItem>
    )
}

function HelpDialog({helpDialogOpen, handleHelpDialogClosing}: {helpDialogOpen: boolean, handleHelpDialogClosing: () => void}) {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Dialog
            open={helpDialogOpen}
            onClose={handleHelpDialogClosing}
        >
            <DialogTitle>
                {t("ui.dialog.contact.title")}
            </DialogTitle>
            <DialogContent sx={{p: 2}}>
                <DialogContentText>
                    <Stack spacing={3} direction='row'>
                            <Card sx={{position: 'relative'}}>
                                <Avatar sx={{ height: 200, width: 200}} variant="square" src={placeholderPhoto}/>
                                <Box position='absolute' bottom="0" width='100%' sx={{backgroundColor: tinycolor(theme.palette.background.paper).setAlpha(.5).toHex8String(), backdropFilter: 'blur(2px)'}}>
                                    <Typography textAlign='center' variant="body1" fontSize='120%'>Paweł S</Typography>
                                    <Typography textAlign='center' variant="body1" color="text.secondary">Bugs, technical questions</Typography>
                                </Box>
                            </Card>
                            <Card sx={{position: 'relative'}}>
                                <Avatar sx={{ height: 200, width: 200}} variant="square" src={placeholderPhoto}/>
                                <Box position='absolute' bottom="0" width='100%' sx={{backgroundColor: tinycolor(theme.palette.background.paper).setAlpha(.5).toHex8String(), backdropFilter: 'blur(2px)'}}>
                                    <Typography textAlign='center' variant="body1" fontSize='120%'>Artur T</Typography>
                                    <Typography textAlign='center' variant="body1" color="text.secondary">AGV questions</Typography>
                                </Box>
                            </Card>
                    </Stack>
                </DialogContentText>
                <IconButton
          aria-label="close"
          onClick={handleHelpDialogClosing}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
            </DialogContent>
        </Dialog>
    )
}