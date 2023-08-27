import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formDataReducer from '../redux/reducers/formDataSlice'
import darkModeReducer from '../redux/reducers/darkModeSlice'
import deleteLoadDialogReducer from './reducers/deleteLoadDialogSlice';
import snackBarReducer from './reducers/snackBarSlice';

const rootReducer = combineReducers({
  formData: formDataReducer,
  darkMode: darkModeReducer,
  deleteLoadDialog: deleteLoadDialogReducer,
  snackBar: snackBarReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;