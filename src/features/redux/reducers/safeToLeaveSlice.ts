import { createSlice } from '@reduxjs/toolkit';

const safeToLeaveSlice = createSlice({
    name: 'safeToLeave',
    initialState: true,
    reducers: {
        setSafeToLeave: (state: any, action: { payload: boolean; }) => {
            return action.payload
        },
    }
});

export const { setSafeToLeave } = safeToLeaveSlice.actions;
export default safeToLeaveSlice.reducer;
