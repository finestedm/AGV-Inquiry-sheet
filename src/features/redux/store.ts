import { configureStore, combineReducers } from '@reduxjs/toolkit';
import undoableFormData from '../redux/reducers/formDataSlice'
import darkModeReducer from '../redux/reducers/darkModeSlice'
import deleteLoadDialogReducer from './reducers/deleteLoadDialogSlice';
import clearFormDataDialogReducer from './reducers/clearFormDataDialogSlice';
import snackBarReducer from './reducers/snackBarSlice';
import editModeReducer from './reducers/editModeSlice';
import stepsReducer from './reducers/stepsSlice';

const rootReducer = combineReducers({
  formData: undoableFormData,
  darkMode: darkModeReducer,
  deleteLoadDialog: deleteLoadDialogReducer,
  clearFormDataDialog: clearFormDataDialogReducer,
  snackBar: snackBarReducer,
  editMode: editModeReducer,
  steps: stepsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;