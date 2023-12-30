import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStep: '',
    steps: ['sales', 'customer', 'project', 'system', 'summary'],
  };
  

  const stepsSlice = createSlice({
    name: 'steps',
    initialState,
    reducers: {
      setCurrentStep: (state, action: PayloadAction<string>) => {
        state.currentStep = action.payload;
      },
      nextStep: (state) => {
        const currentIndex = state.steps.indexOf(state.currentStep);
        const nextIndex = currentIndex + 1;
        if (nextIndex < state.steps.length) {
          state.currentStep = state.steps[nextIndex];
        }
      },
      backStep: (state) => {
        const currentIndex = state.steps.indexOf(state.currentStep);
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          state.currentStep = state.steps[prevIndex];
        }
      },
    },
  });



export const { setCurrentStep, nextStep, backStep } = stepsSlice.actions;
export default stepsSlice.reducer;
