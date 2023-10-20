import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '@mui/material/Switch';
import { RootState } from '../features/redux/store';
import { Box, Button, Collapse, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTranslation } from 'react-i18next';
import { setEditMode } from '../features/redux/reducers/editModeSlice';
import ModeIcon from '@mui/icons-material/Mode';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export default function EditModeSwitch({ mobile }: { mobile?: boolean }): JSX.Element {
  const dispatch = useDispatch();
  const editMode = useSelector((state: RootState) => state.editMode);
  const { t } = useTranslation();

  if (mobile) {
    return (
      <ListItem
        onClick={() => dispatch(setEditMode(!editMode))}
      >
        <ListItemIcon
          sx={{ minWidth: 36 }}
        >
          <Box position='relative'>

            <Collapse sx={{ position: 'absolute', top: -12, left: 0 }} orientation="horizontal" collapsedSize={0}
              in={editMode}
            >
              <ModeIcon />
            </Collapse>
            <Collapse sx={{ position: 'absolute', top: -12, left: 0 }} orientation="horizontal" collapsedSize={0}
              in={!editMode}
            >
              <ImageSearchIcon />
            </Collapse>
          </Box>
        </ListItemIcon>
        <ListItemText>{t('ui.switch.editMode')}</ListItemText>
      </ListItem>
    );
  } else {
    return (
      <Button
        variant='text'
        size='small'
        onClick={() => dispatch(setEditMode(!editMode))}
        startIcon={
          <Collapse sx={{ height: '1.6rem' }} orientation="horizontal" collapsedSize={0}
            in={editMode}
          >
            <ModeIcon />
          </Collapse>
        }
        endIcon={
          <Collapse sx={{ height: '1.6rem' }} orientation="horizontal" collapsedSize={0}
            in={!editMode}
          >
            <ImageSearchIcon />
          </Collapse>
        }
      >
        <Typography>{t('ui.switch.editMode')}</Typography>
      </Button>
    );
  }
}
