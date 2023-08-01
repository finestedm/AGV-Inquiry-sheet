import { AppBar, Box, Button, Container, MobileStepper, Step, StepLabel, Stepper } from "@mui/material";
import { useTransition } from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface FormStepperProps {
  activeStep: number;
  stepLabels: string[];
  handleStepClick: (step: number) => void;
}

export default function FormStepper({ activeStep, stepLabels, handleStepClick }: FormStepperProps) {
  return (
    <Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <AppBar
          position="fixed"
          sx={{ top: 'auto', bottom: 0 }}
        >
          <MobileStepper
            variant="progress" // Use "dots" for dots style, "text" for text label style
            steps={stepLabels.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button variant="contained" onClick={() => handleStepClick(activeStep + 1)}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button variant="contained" onClick={() => handleStepClick(activeStep - 1)}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, mt: 6}}>
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
      </Box>
    </Box>
  );
}
