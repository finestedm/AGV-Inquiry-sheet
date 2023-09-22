import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { setDarkMode } from '../features/redux/reducers/darkModeSlice';
import { RootState } from '../features/redux/store';
import { Box, Button, Collapse, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';

export default function DarkModeSwitch({ mobile }: { mobile?: boolean }): JSX.Element {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if the system prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDarkMode ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false))
  }, []);

  if (mobile) {
    return (
      <ListItem
        onClick={() => dispatch(setDarkMode(!darkMode))}
      >
        <ListItemIcon
        sx={{minWidth: 36}}
        >
          <Box position='relative'>

            <Collapse sx={{position: 'absolute', top: -12, left: 0}} orientation="horizontal" collapsedSize={0}
              in={darkMode}
            >
              <LightModeIcon />
            </Collapse>
            <Collapse sx={{position: 'absolute', top: -12, left: 0}} orientation="horizontal" collapsedSize={0}
              in={!darkMode}
            >
              <DarkModeIcon />
            </Collapse>
          </Box>
        </ListItemIcon>
        <ListItemText>{t('ui.switch.darkMode')}</ListItemText>
      </ListItem>
    );
  } else {
    return (
      <Button
        variant='text'
        size='small'
        onClick={() => dispatch(setDarkMode(!darkMode))}
        startIcon={
          <Collapse sx={{ height: '1.6rem' }} orientation="horizontal" collapsedSize={0}
            in={darkMode}
          >
            <LightModeIcon />
          </Collapse>
        }
        endIcon={
          <Collapse sx={{ height: '1.6rem' }} orientation="horizontal" collapsedSize={0}
            in={!darkMode}
          >
            <DarkModeIcon />
          </Collapse>
        }
      >
        <Typography>{t('ui.switch.darkMode')}</Typography>
      </Button>
    );
  }
}
