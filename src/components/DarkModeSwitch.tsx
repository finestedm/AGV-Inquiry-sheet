import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { toggleDarkMode } from '../features/redux/reducers/darkModeSlice';
import { RootState } from '../features/redux/store';
import { Box, Button, Collapse, Fade, Stack, ToggleButton, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect } from 'react';

export default function DarkModeSwitch({ fullWidth }: { fullWidth: boolean }): JSX.Element {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.darkMode);

  useEffect(() => {
    console.log(darkMode)
  }, [darkMode])

  return (
    <Button
      fullWidth={fullWidth}
      variant='outlined'
      onClick={() => dispatch(toggleDarkMode())}
      startIcon={
        <Collapse orientation="horizontal" collapsedSize={0}
          in={darkMode}
        >
          <LightModeIcon />
        </Collapse>
      }
      endIcon={
        <Collapse orientation="horizontal" collapsedSize={0}
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
