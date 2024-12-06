import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { ILoad, ISystems } from '../../interfaces';

export type TClearFormDataDialogSlice = { open: boolean }

const initialState: TClearFormDataDialogSlice = { open: false };

const clearFormDataDialogSlice = createSlice({
    name: 'clearFormDataDialog',
    initialState,
    reducers: {
        updateClearFormDataDialog: (state, action: PayloadAction<TClearFormDataDialogSlice>) => {
            state.open = action.payload.open;
        },
    },
});

export const { updateClearFormDataDialog } = clearFormDataDialogSlice.actions;
export default clearFormDataDialogSlice.reducer;