import React, { useEffect, useState, useTransition } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { RootState } from '../features/redux/store';
import { useDispatch } from 'react-redux';
import { closeSnackbar } from '../features/redux/reducers/snackBarSlice';
import { Alert, AlertColor, Box, Button, IconButton, LinearProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleSnackbar() {

    const snackBarState = useSelector((state: RootState) => state.snackBar)
    const dispatch = useDispatch();

    const [progress, setProgress] = useState(100)

    useEffect(() => {
        if (snackBarState.open) {
            const progressInterval = setInterval(() => {
                const elapsedTime = Date.now() - snackBarState.openedTimestamp;
                const remainingTime = snackBarState.autoHideDuration - elapsedTime;
                const percentage = (remainingTime / snackBarState.autoHideDuration) * 100;
                setProgress(percentage);

                if (percentage <= 0) {
                    clearInterval(progressInterval);
                    dispatch(closeSnackbar());
                }
            }, 100);
            return () => clearInterval(progressInterval);
        }
    }, [snackBarState.open, snackBarState.openedTimestamp, snackBarState.autoHideDuration]);


    return (
        <Snackbar
            ClickAwayListenerProps={{}}
            open={snackBarState.open}
            autoHideDuration={10000}
            onClose={() => dispatch(closeSnackbar())}
        >
            <Alert
                onClose={() => dispatch(closeSnackbar())}
                severity={snackBarState.severity as AlertColor}
            >
                {snackBarState.message}
                <LinearProgress sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', borderRadius: '0 0 1rem 1rem' }} color={snackBarState.severity === 'success' ? 'success' : 'error'} variant="determinate" value={progress} />
            </Alert>
        </Snackbar>
    )
}