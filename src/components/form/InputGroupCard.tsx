import { Box, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function InputGroupCard({ title, content }: { title: string, content: ReactNode }) {
    return (
        <Box className="input-group-card">
            <Stack spacing={2}>
                <Typography variant="h6" textAlign='left'>{title}</Typography>
                {content}
            </Stack>
        </Box>
    )
}