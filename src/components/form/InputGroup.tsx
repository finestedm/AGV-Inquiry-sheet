import { Box, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography, useTheme, IconButton, SvgIconTypeMap } from "@mui/material";
import React, { ReactNode } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import tinycolor from "tinycolor2";

export default function InputGroup({ title, content, subTitle, extendedOpener, extendedHandler, icon }: { title: string, content: ReactNode, subTitle?: string, extendedOpener?: boolean, extendedHandler?: () => void, icon?: React.ElementType }) {
    const theme = useTheme()
    return (
        <Box>
            <Divider sx={{ marginBottom: 3 }} />
            <Grid container spacing={4} className="input-group-card">
                <Grid item xs={12} lg={3}>
                    <Stack direction='row' spacing={1} justifyContent='space-between'>
                        <Box>
                            <Stack direction='row' spacing={1}>
                                <Box position='relative' borderRadius={1} minWidth={48} height={48} sx={{ backgroundColor: tinycolor(theme.palette.primary.main).setAlpha(.25).toHex8String() }}>
                                    {icon && React.createElement(icon, { sx: { color: theme.palette.primary.main, fontSize: 40, position: 'absolute', left: 4, top: 4 } })}
                                </Box>
                                <Box>
                                    <Stack>
                                        <Typography variant="h6" textAlign='left' lineHeight={1.35}>{title}</Typography>
                                        <Typography variant="body2" color={theme.palette.text.secondary} sx={{ opacity: .5 }} textAlign='left'>{subTitle}</Typography>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Box>
                        {extendedHandler &&
                            <Box>
                                <IconButton size="small" aria-label="open-extended" className='extender-icon' onClick={extendedHandler} >
                                    <OpenInNewIcon fontSize="small" />
                                </IconButton>
                            </Box>
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