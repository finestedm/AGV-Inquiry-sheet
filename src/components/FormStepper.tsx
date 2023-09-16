import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Step, StepLabel, Stepper, useTheme } from "@mui/material";

interface FormStepperProps {
  activeStep: number;
  stepLabels: string[];
  handleStepClick: (step: number) => void;
}

export default function FormStepper({ activeStep, stepLabels, handleStepClick }: FormStepperProps) {
  return (
    <Grid item xs='auto' sx={{ display: { xs: 'none', md: 'block' } }}>
      <Card elevation={1} sx={{ p: 3, position: 'sticky', top: 48 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
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
      </Card>
    </Grid>
  );
}
