import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { ILoad } from '../../interfaces';

interface IdeleteLoadDialogSlice {
    open: boolean;
    temporaryUpdatedLoads: ILoad[];
    temporarySelectedSystem: string;
}

const initialState: IdeleteLoadDialogSlice = {
    open: false,
    temporaryUpdatedLoads: [], // Initialize with an empty array of ILoad
    temporarySelectedSystem: ''
};

const deleteLoadDialogSlice = createSlice({
    name: 'deleteLoadDialog',
    initialState,
    reducers: {
        updateDeleteLoadDialog: (state, action: PayloadAction<{ open: boolean; updatedLoads: ILoad[]; selectedSystem: string }>) => {
            state.open = action.payload.open;
            state.temporaryUpdatedLoads = action.payload.updatedLoads;  // this state holds temp value until user takes action
            state.temporarySelectedSystem = action.payload.selectedSystem;// this state holds temp value until user takes action

            // If dialog is closed, also clear the temporaryUpdatedLoads
            if (!action.payload.open) {
                state.temporaryUpdatedLoads = [];
            }
        },
    },
});

export const { updateDeleteLoadDialog } = deleteLoadDialogSlice.actions;
export default deleteLoadDialogSlice.reducer;