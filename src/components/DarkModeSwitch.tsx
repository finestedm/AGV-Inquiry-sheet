import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { setDarkMode } from '../features/redux/reducers/darkModeSlice';
import { RootState } from '../features/redux/store';
import { Button, Collapse, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function DarkModeSwitch({ fullWidth }: { fullWidth: boolean }): JSX.Element {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  useEffect(() => {
    // Check if the system prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    prefersDarkMode ? dispatch(setDarkMode(true)) : dispatch(setDarkMode(false))
  }, []);

  return (
    <Button
      fullWidth={fullWidth}
      variant='outlined'
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
      <Typography>Dark mode</Typography>
    </Button>
  );
}
