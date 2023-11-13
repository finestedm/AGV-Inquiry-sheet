import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { ILoad, ISystems } from '../../interfaces';

type TclearFormDataDialogSlice = { open: boolean }

const initialState: TclearFormDataDialogSlice = { open: false };

const clearFormDataDialogSlice = createSlice({
    name: 'clearFormDataDialog',
    initialState,
    reducers: {
        updateClearFormDataDialog: (state, action: PayloadAction<TclearFormDataDialogSlice>) => {
            state.open = action.payload.open;
        },
    },
});

export const { updateClearFormDataDialog } = clearFormDataDialogSlice.actions;
export default clearFormDataDialogSlice.reducer;