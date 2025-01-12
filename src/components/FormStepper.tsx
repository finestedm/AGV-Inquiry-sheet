import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Paper, Step, StepLabel, Stepper, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { setCurrentStep } from "../features/redux/reducers/stepsSlice";

interface FormStepperProps {
  handleStepClick?: (step: string) => void;
  handleBack?: () => void;
  handleNext?: () => void;
}


export default function FormStepper({ handleStepClick, handleBack, handleNext }: FormStepperProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const allSteps = useSelector((state: RootState) => state.steps.steps)

  const location = useLocation();  // Use the useLocation hook to get the current path
  const activeStep = location.pathname.split('/').pop();  // Extract the active step from the path
  const activeStepIndex = activeStep ? allSteps.indexOf(activeStep) : 0;
  const nextStep = activeStep ? allSteps[activeStepIndex + 1] : 'sales'
  const prevStep = activeStep ? allSteps[activeStepIndex - 1] : 'sales'

  if (isMobile) {
    return (
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <AppBar
          className="mobile-stepper"
          position="fixed"
          color='default'
          sx={{ top: 'auto', bottom: 0, borderTop: 1, borderColor: theme.palette.divider }}
        >
          <MobileStepper
            sx={{ backgroundColor: "transparent" }}
            variant="dots" // Use "dots" for dots style, "text" for text label style
            steps={allSteps.length}
            position="static"
            activeStep={activeStepIndex || 0}
            nextButton={
              <Button sx={{ borderRadius: 1000 }} variant="outlined" color="primary" onClick={() => dispatch(setCurrentStep(nextStep))}>
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button sx={{ borderRadius: 1000 }} variant="outlined" color="primary" onClick={() => dispatch(setCurrentStep(prevStep))}>
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Card sx={{ width: '100%', px: isMobile ? 0 : 6, pt: 1, mb: 4 }}>
        <Box width='100%' py={2}>
          <Stepper activeStep={activeStepIndex || 0} nonLinear alternativeLabel>
            {allSteps.map((label) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => dispatch(setCurrentStep(label))}
                  sx={{ cursor: 'pointer' }} // Add cursor pointer style

                >
                  {t(`steps.${label}`)}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Card>
    );
  }
}
