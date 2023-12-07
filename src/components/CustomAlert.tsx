import { Alert, AlertColor, AlertTitle, Box, Collapse } from "@mui/material";

export default function CustomAlert({ severity, title, text, collapseTrigger }: { severity: AlertColor, title: string, text: string, collapseTrigger: boolean }) {
    return (
        <Collapse in={collapseTrigger} collapsedSize={0}>
            <Box textAlign='left'>
                <Alert severity={severity}>
                    <AlertTitle>{title}</AlertTitle>
                    {text}
                </Alert>
            </Box>
        </Collapse>
    )
}