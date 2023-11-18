import { Alert, AlertColor, AlertTitle, Box } from "@mui/material";

export default function CustomAlert({ severity, title, text }: { severity: AlertColor, title: string, text: string }) {
    return (
        <Box textAlign='left'>
            <Alert severity={severity}>
                <AlertTitle>{title}</AlertTitle>
                {text}
            </Alert>
        </Box>
    )
}