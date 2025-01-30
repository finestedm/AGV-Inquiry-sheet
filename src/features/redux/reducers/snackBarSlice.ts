import { createSlice } from '@reduxjs/toolkit';
import { resetFormData } from './formDataSlice';
import { LinearProgressProps } from '@mui/material';


interface SnackbarState {
    open: boolean;
    message: string;
    severity: LinearProgressProps["color"]
    openedTimestamp: number;
    autoHideDuration: number;
}

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        open: false,
        message: '',
        severity: 'success',
        openedTimestamp: Date.now(),
        autoHideDuration: 10000
    },
    reducers: {
        openSnackbar: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || 'success';
            state.openedTimestamp = Date.now();
            state.autoHideDuration = action.payload.autoHideDuration || 10000;
        },
        closeSnackbar: (state) => {
            state.open = false;
            state.message = '';
            state.severity = 'success';
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
