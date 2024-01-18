import { Box, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography, useTheme, IconButton } from "@mui/material";
import { ReactNode } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function InputGroup({ title, content, subTitle, extendedOpener, extendedHandler }: { title: string, content: ReactNode, subTitle?: string, extendedOpener?: boolean, extendedHandler?: () => void }) {
    const theme = useTheme()
    return (
        <Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Grid container spacing={4} className="input-group-card">
                <Grid item xs={12} lg={3}>
                    <Stack direction='row' spacing={1} justifyContent='space-between'>
                        <Stack spacing={1}>
                            <Typography variant="h6" textAlign='left' lineHeight={1}>{title}</Typography>
                            <Typography variant="body2" color={theme.palette.text.secondary} sx={{ opacity: .5 }} textAlign='left'>{subTitle}</Typography>
                        </Stack>
                        {extendedHandler &&
                            <IconButton size="small" aria-label="open-extended" className='extender-icon'>
                                <OpenInNewIcon fontSize="small" onClick={extendedHandler} />
                            </IconButton>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={9}>
                    {content}
                </Grid>
            </Grid>
        </Box>
    )
}