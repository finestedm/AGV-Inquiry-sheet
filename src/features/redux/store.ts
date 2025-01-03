import { configureStore, combineReducers } from '@reduxjs/toolkit';
import undoable, { includeAction } from 'redux-undo';

import formDataReducer from '../redux/reducers/formDataSlice'
import darkModeReducer from '../redux/reducers/darkModeSlice'
import deleteLoadDialogReducer from './reducers/deleteLoadDialogSlice';
import clearFormDataDialogReducer from './reducers/clearFormDataDialogSlice';
import editEquipmentDrawerReducer from './reducers/editEquipmentDrawer';
import snackBarReducer from './reducers/snackBarSlice';
import editModeReducer from './reducers/editModeSlice';
import stepsReducer from './reducers/stepsSlice';

// Apply undoable to the formDataReducer and stepsReducer
const undoableFormDataReducer = undoable(formDataReducer, {});

const rootReducer = combineReducers({
  formData: undoableFormDataReducer,
  darkMode: darkModeReducer,
  deleteLoadDialog: deleteLoadDialogReducer,
  clearFormDataDialog: clearFormDataDialogReducer,
  snackBar: snackBarReducer,
  editMode: editModeReducer,
  steps: stepsReducer, 
  editEquipmentDrawer: editEquipmentDrawerReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;