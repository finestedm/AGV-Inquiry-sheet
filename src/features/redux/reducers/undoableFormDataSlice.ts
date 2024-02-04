import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialFormDataState } from './formDataSlice';
import { IFormData } from '../../interfaces';

interface IUndoableState {
  past: IFormData[];
  present: IFormData;
  future: IFormData[];
}

const createUndoableSlice = (name: string, initialState: IFormData) => {
  const undoableSlice = createSlice({
    name,
    initialState: {
      past: [],
      present: initialState,
      future: [],
    } as IUndoableState,
    reducers: {
      setPresent: (state, action: PayloadAction<any>) => {
        state.present = action.payload;
      },
      undo: (state) => {
        if (state.past.length > 0) {
          const previous = state.past[state.past.length - 1];
          const newPast = state.past.slice(0, -1);
          state.present = previous;
          state.past = newPast;
          state.future = [state.present, ...state.future];
        }
      },
      redo: (state) => {
        if (state.future.length > 0) {
          const next = state.future[0];
          const newFuture = state.future.slice(1);
          state.present = next;
          state.future = newFuture;
          state.past = [...state.past, state.present];
        }
      },
    },
  });

  return undoableSlice;
};

const undoableFormDataSlice = createUndoableSlice('formData', initialFormDataState);

export const { setPresent, undo, redo } = undoableFormDataSlice.actions;

const formDataSlice = undoableFormDataSlice.reducer;

export default formDataSlice;
