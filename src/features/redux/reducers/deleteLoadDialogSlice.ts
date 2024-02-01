import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { ISystems } from '../../interfaces';
import { Load } from '../../../data/typicalLoadSizes';

interface IdeleteLoadDialogSlice {
    open: boolean;
    temporaryUpdatedLoads: Load[];
    temporarySelectedSystem?: keyof ISystems;
}

const initialState: IdeleteLoadDialogSlice = {
    open: false,
    temporaryUpdatedLoads: [], // Initialize with an empty array of ILoad
    temporarySelectedSystem: undefined
};

const deleteLoadDialogSlice = createSlice({
    name: 'deleteLoadDialog',
    initialState,
    reducers: {
        updateDeleteLoadDialog: (state, action: PayloadAction<{ open: boolean; updatedLoads: Load[]; selectedSystem?: keyof ISystems }>) => {
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