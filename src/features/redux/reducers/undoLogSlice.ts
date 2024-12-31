import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UndoLog {
  added: string[];
  removed: string[];
  changed: string[];
}

interface UndoLogState {
  logs: UndoLog[];
}

const initialState: UndoLogState = {
  logs: [],
};

const undoLogSlice = createSlice({
  name: 'undoLog',
  initialState,
  reducers: {
    addLog(state, action: PayloadAction<UndoLog>) {
      state.logs.push(action.payload);
    },
    clearLogs(state) {
      state.logs = [];
    },
  },
});

export const { addLog, clearLogs } = undoLogSlice.actions;
export default undoLogSlice.reducer;
