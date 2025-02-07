import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import SystemCard from "./subcomponents/SystemCard";
import { useTranslation } from 'react-i18next';
import availableSystems from "../../../data/availableSystems";

export default function FormSystemSelectorStep(): JSX.Element {

  const { t } = useTranslation()

  return (
    <Box>
      <Typography minHeight={64} alignContent='center' variant="h4" textAlign='left'>{t('steps.systems.header')}</Typography>
    <Stack spacing={2}>
      <Box>
        <Grid container spacing={3}>
          {
            availableSystems.map(system => (
              <SystemCard system={system} />
            ))
          }
        </Grid>
      </Box>
    </Stack>
    </Box>
 
  )
}