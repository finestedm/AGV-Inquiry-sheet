import { configureStore, combineReducers } from '@reduxjs/toolkit';
import formDataReducer from '../redux/reducers/formDataSlice'

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    // Add more reducers here if needed
  },
});

export default store;