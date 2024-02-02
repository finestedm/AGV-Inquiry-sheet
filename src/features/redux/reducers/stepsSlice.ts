import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialSteps = ['sales', 'customer', 'project', 'system', 'summary'];
export const allPossibleSteps = ['sales', 'customer', 'project', 'system', 'asrs', 'lrkprk', 'agv', 'autovna', 'summary'];

const initialState = {
    currentStep: '',
    steps: initialSteps,
    possibleSteps: allPossibleSteps
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
        updateSteps: (state, action: PayloadAction<string[]>) => {
            state.steps = action.payload;
        }
    },
});



export const { setCurrentStep, nextStep, backStep, updateSteps } = stepsSlice.actions;
export default stepsSlice.reducer;