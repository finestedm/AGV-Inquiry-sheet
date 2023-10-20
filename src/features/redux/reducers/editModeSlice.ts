import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'readEdit',
  initialState: false,
  reducers: {
    setEditMode: (state, action) => action.payload,
  },
});

export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
