import { AppBar, Box, Button, Container, MobileStepper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface FormStepperProps {
  activeStep: number;
  stepLabels: string[];
  handleStepClick: (step: number) => void;
}

export default function FormStepper({ activeStep, stepLabels, handleStepClick }: FormStepperProps) {
  const theme = useTheme()
  return (
    <Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <AppBar
          position="fixed"
          sx={{ top: 'auto', bottom: 0, borderTop: `1px solid` }}
        >
          <MobileStepper
            variant="dots" // Use "dots" for dots style, "text" for text label style
            steps={stepLabels.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button onClick={() => handleStepClick(activeStep + 1)}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button onClick={() => handleStepClick(activeStep - 1)}>
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
