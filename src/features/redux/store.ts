import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formDataReducer from '../redux/reducers/formDataSlice'
import darkModeReducer from '../redux/reducers/darkModeSlice'

const rootReducer = combineReducers({
  formData: formDataReducer,
  darkMode: darkModeReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;