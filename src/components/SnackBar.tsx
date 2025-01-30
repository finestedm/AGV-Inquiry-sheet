import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSelector } from 'react-redux';
import { RootState } from '../features/redux/store';
import { useDispatch } from 'react-redux';
import { closeSnackbar } from '../features/redux/reducers/snackBarSlice';
import { Alert, AlertColor, LinearProgress } from '@mui/material';

export default function SimpleSnackbar() {
    const snackBarState = useSelector((state: RootState) => state.snackBar);
    const dispatch = useDispatch();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;

        if (snackBarState.open) {

            progressInterval = setInterval(() => {
                const elapsedTime = Date.now() - snackBarState.openedTimestamp;
                const remainingTime = snackBarState.autoHideDuration - elapsedTime;
                const percentage = (remainingTime / snackBarState.autoHideDuration) * 100;
                
                setProgress(percentage > 0 ? percentage : 0);

                if (percentage === 100) {
                    clearInterval(progressInterval);
                    dispatch(closeSnackbar());
                }
            }, 100);
        } else {
            setProgress(100); // Reset to 0% when snackbar closes
        }

        return () => clearInterval(progressInterval);
    }, [snackBarState.open, snackBarState.openedTimestamp, snackBarState.autoHideDuration, dispatch]);

    return (
        <Snackbar
            open={snackBarState.open}
            autoHideDuration={snackBarState.autoHideDuration}
            onClose={() => dispatch(closeSnackbar())}
        >
            <Alert
                onClose={() => dispatch(closeSnackbar())}
                severity={snackBarState.severity as AlertColor}
                sx={{ position: 'relative', overflow: 'hidden' }}
            >
                {snackBarState.message}
                <LinearProgress
                    sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}
                    color={snackBarState.severity as AlertColor}
                    variant="determinate"
                    value={progress}
                />
            </Alert>
        </Snackbar>
    );
}
