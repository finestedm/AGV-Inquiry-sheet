import { Box, Typography } from "@mui/material";

export default function BoxForTextPair({ keyText, valueText, endText }: { keyText?: string, valueText: string | number, endText?: string }) {
    return (
        <Box display="flex" flexWrap="wrap" alignItems='baseline'>
            {keyText &&
                <Typography marginRight={1} >
                    {keyText}:
                </Typography>
            }
            <Typography component='span' fontWeight={700} lineHeight={1.1} minWidth={150}>
                {valueText}
                {endText &&
                    <Typography component='span' color='text.secondary' marginLeft={1} >
                        {endText}
                    </Typography>
                }
            </Typography>
        </Box>
    )
}