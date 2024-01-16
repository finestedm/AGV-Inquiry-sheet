import { Box, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function InputGroup({ title, content }: { title: string, content: ReactNode }) {
    return (
        <Box>
            <Divider sx={{marginBottom: 2}} />
            <Grid container spacing={2} className="input-group-card">
                <Grid item xs={12} lg={3}>
                    <Typography variant="h6" textAlign='left' lineHeight={1}>{title}</Typography>
                </Grid>
                <Grid item xs>
                    {content}
                </Grid>
            </Grid>
        </Box>
    )
}