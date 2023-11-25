import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Paper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface FormStepperProps {
  mobile: boolean;
  activeStep: string | undefined;
  allSteps: string[];
  handleStepClick: (step: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}


export default function FormStepper({ mobile, activeStep, allSteps, handleStepClick, handleBack, handleNext }: FormStepperProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const activeStepIndex = activeStep ? allSteps.indexOf(activeStep) : 0

  if (mobile) {
    return (
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <AppBar
          position="fixed"
          color='default'
          sx={{ top: 'auto', bottom: 0, borderTop: 1, borderColor: theme.palette.divider }}
        >
          <MobileStepper
            variant="dots" // Use "dots" for dots style, "text" for text label style
            steps={allSteps.length}
            position="static"
            activeStep={activeStepIndex || 0}
            nextButton={
              <Button onClick={() => handleNext()}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button onClick={() => handleBack()}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Grid item xs sx={{ display: { xs: 'none', md: 'block' } }}>
        <Card elevation={1} sx={{ p: 3, position: 'sticky', top: 48 }}>
          <Stepper activeStep={activeStepIndex || 0} orientation="vertical">
            {allSteps.map((label) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => handleStepClick(label)}
                  optional={null} // optional prop is required for the StepLabel component
                  className={label === activeStep ? 'active-step' : ''}
                  sx={{ cursor: 'pointer' }} // Add cursor pointer style

                >
                  {t(`steps.${label}`)}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>
      </Grid>
    );
  }
}
