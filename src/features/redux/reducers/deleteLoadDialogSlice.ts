import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

const deleteLoadDialogSlice = createSlice({
    name: 'deleteLoadDialog',
    initialState: {
        open: false,
        indexToDelete: -1, // Initialize with a value that won't match any valid index
    },
    reducers: {
        deleteLoadDialogOpen: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;

            // If dialog is closed, also clear the indexToDelete
            if (!action.payload) {
                state.indexToDelete = -1;
            }
        },
        setLoadIndexToDelete: (state, action: PayloadAction<number>) => {
            state.indexToDelete = action.payload;
        },
    },
});

export const { deleteLoadDialogOpen, setLoadIndexToDelete } = deleteLoadDialogSlice.actions;
export default deleteLoadDialogSlice.reducer;