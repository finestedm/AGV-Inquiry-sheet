import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { IEquipment } from '../../interfaces';

export type TEditEquipmentDrawer = { open: boolean, eqId?: IEquipment["id"] | null }

const initialState: TEditEquipmentDrawer = { open: false, eqId: null };

const updateEditEquipmentDrawerSlice = createSlice({
    name: 'editEquipmentDrawer',
    initialState,
    reducers: {
        // Combines both open and eqId updates into a single action
        updateEditEquipmentDrawer: (state, action: PayloadAction<TEditEquipmentDrawer>) => {
            const { open, eqId } = action.payload;
            state.open = open;
            // If open is false, reset eqId to null
            if (open === false) {
                state.eqId = null;
            } else {
                state.eqId = eqId;
            }
        },
    },
});

export const { updateEditEquipmentDrawer } = updateEditEquipmentDrawerSlice.actions;
export default updateEditEquipmentDrawerSlice.reducer;