import { configureStore, combineReducers } from '@reduxjs/toolkit';
import undoable from 'redux-undo';

import formDataReducer from '../redux/reducers/formDataSlice'
import darkModeReducer from '../redux/reducers/darkModeSlice'
import deleteLoadDialogReducer from './reducers/deleteLoadDialogSlice';
import clearFormDataDialogReducer from './reducers/clearFormDataDialogSlice';
import editEquipmentDrawerReducer from './reducers/editEquipmentDrawer';
import snackBarReducer from './reducers/snackBarSlice';
import editModeReducer from './reducers/editModeSlice';
import stepsReducer from './reducers/stepsSlice';

// Apply undoable to the formDataReducer and stepsReducer
const undoableFormDataReducer = undoable(formDataReducer, {
  filter: (action) => !action.type.includes('formData/reset') // Optional: you can exclude certain actions from undo/redo
});

const undoableStepsReducer = undoable(stepsReducer, {
  filter: (action) => !action.type.includes('steps/reset') // Optional: you can exclude certain actions from undo/redo
});

const rootReducer = combineReducers({
  formData: undoableFormDataReducer,
  darkMode: darkModeReducer,
  deleteLoadDialog: deleteLoadDialogReducer,
  clearFormDataDialog: clearFormDataDialogReducer,
  snackBar: snackBarReducer,
  editMode: editModeReducer,
  steps: undoableStepsReducer, 
  editEquipmentDrawer: editEquipmentDrawerReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;