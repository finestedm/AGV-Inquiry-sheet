import { AppBar, Avatar, Box, Button, ButtonGroup, Card, CircularProgress, Container, Divider, FormControl, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
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
import FormStepper from "./FormStepper";

export default function FormStepperBar({ navigateToStep  }: { navigateToStep: (step: string) => void}): JSX.Element {

    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.paper}}>
            <FormStepper navigateToStep={navigateToStep} />
            <ClearFormDataDialog />

        </Box >
    )
}