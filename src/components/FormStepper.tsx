import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Paper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";

interface FormStepperProps {
  mobile: boolean;
  handleStepClick: (step: string) => void;
  handleBack: () => void;
  handleNext: () => void;
}


export default function FormStepper({ mobile, handleStepClick, handleBack, handleNext }: FormStepperProps) {
  const { t } = useTranslation();
  const theme = useTheme();

  const allSteps = useSelector((state: RootState) => state.steps.steps)

  const location = useLocation();  // Use the useLocation hook to get the current path
  const activeStep = location.pathname.split('/').pop();  // Extract the active step from the path
  const activeStepIndex = activeStep ? allSteps.indexOf(activeStep) : 0;

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
          <Stepper activeStep={activeStepIndex || 0} orientation="vertical" nonLinear>
            {allSteps.map((label) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => handleStepClick(label)}
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
