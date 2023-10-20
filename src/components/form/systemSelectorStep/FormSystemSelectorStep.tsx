import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import SystemCard from "./subcomponents/SystemCard";
import { useTranslation } from 'react-i18next';
import availableSystems from "../../../data/availableSystems";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/redux/store";

export default function FormSystemSelectorStep(): JSX.Element {

  const { t } = useTranslation()

  return (
    <Stack spacing={2}>
      <Typography variant="h4" textAlign='left'>{t('steps.systems.header')}</Typography>
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
  )
}