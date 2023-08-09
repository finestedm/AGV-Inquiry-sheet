import { Box, Grid, Stack, Typography } from "@mui/material";
import SystemCard from "./SystemCard";
import { useTranslation } from 'react-i18next';
import { ISystem } from "../features/interfaces";

export default function FormSystemSelectorStep(): JSX.Element {
  const { t } = useTranslation();

  const systems: ISystem[] = [
    {
      url: 'https://www.jungheinrich.cn/resource/image/540796/landscape_ratio16x10/750/469/4de74d221121a65bc7e0c08b6d4285da/1FA625729DA78A1AD6585E27F629F67B/stage-automatic-small-parts-storage.jpg',
      alt: 'asrs',
      label: t('system.asrs.label'),
      labelShort: t('system.asrs.labelshort'),
      description: t('system.asrs.description')
    },
    {
      url: 'https://www.jungheinrich.cn/resource/image/540918/landscape_ratio16x10/750/469/40bd0c110ea57c96e6b5a51e6d6728ed/1F26C0C524BFC81ADDA1253482D95F1A/stage-small-parts-storage-dynamic.jpg',
      alt: 'lrkprk',
      label: t('system.lrkprk.label'),
      labelShort: t('system.lrkprk.labelshort'),
      description: t('system.lrkprk.description')
    },
    {
      url: 'https://www.jungheinrich.cn/resource/image/540798/landscape_ratio16x10/750/469/5207e5fdaf2ac8a1858bcdae07a44ab2/FE5BFAE61CB18BBD620473590B9B437E/stage-agv-system.jpg',
      alt: 'agv',
      label: t('system.agv.label'),
      labelShort: t('system.agv.labelshort'),
      description: t('system.agv.description')
    },
    {
      url: 'https://www.jungheinrich.cn/resource/image/541672/landscape_ratio16x10/750/469/c7d514ecb2cce052105a89c86396a92b/2F274C04399B4D9A89056F7A564042BA/stage-automated-high-rack-stacker.jpg',
      alt: 'autovna',
      label: t('system.autovna.label'),
      labelShort: t('system.autovna.labelshort'),
      description: t('system.autovna.description')
    }
  ]

  return (
    <Stack spacing={2}>
      <Typography variant="h4" textAlign='left'>{t('steps.systems.header')}</Typography>
      <Box>
        <Grid container spacing={3}>
          {
            systems.map((system) => (
              <SystemCard system={system} />
            ))
          }
        </Grid>
      </Box>
    </Stack>
  )
}