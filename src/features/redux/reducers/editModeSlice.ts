import { createSlice } from '@reduxjs/toolkit';

const editModeSlice = createSlice({
  name: 'readEdit',
  initialState: true,
  reducers: {
    setEditMode: (state, action) => {
      if (action.payload === undefined) {
        // Toggle the state if no payload is provided
        return !state;
      } else {
        // Set the state to the specified value if a payload is provided
        return action.payload;
      }
    },
  },
});

export const { setEditMode } = editModeSlice.actions;
export default editModeSlice.reducer;
