import { Step, StepLabel, Stepper } from "@mui/material";

interface FormStepperProps {
  activeStep: number;
  stepLabels: string[];
  handleStepClick: (step: number) => void;
}

export default function FormStepper({ activeStep, stepLabels, handleStepClick }: FormStepperProps) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {stepLabels.map((label, index) => (
        <Step key={index}>
          <StepLabel
            onClick={() => handleStepClick(index)}
            optional={null} // optional prop is required for the StepLabel component
            className={index === activeStep ? 'active-step' : ''}
            sx={{ cursor: 'pointer' }} // Add cursor pointer style
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
