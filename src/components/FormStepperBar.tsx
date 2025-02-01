import { AppBar, Avatar, Box, Button, ButtonGroup, Card, CircularProgress, Container, Divider, FormControl, IconButton, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Select, Stack, Toolbar, Tooltip, Typography, styled, useMediaQuery, useTheme } from "@mui/material"
import ClearFormDataDialog from "./ClearFormDataDialog";

import FormStepper from "./FormStepper";

export default function FormStepperBar({ navigateToStep, saveDataToServer }: { navigateToStep: (step: string) => void, saveDataToServer: () => void }): JSX.Element {

    const theme = useTheme();

    return (
        <Box sx={{backgroundColor: theme.palette.background.paper}}>
            <FormStepper navigateToStep={navigateToStep} saveDataToServer={saveDataToServer} />
            <ClearFormDataDialog />

        </Box >
    )
}