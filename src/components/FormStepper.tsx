import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Paper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { IFormData, ISystem, ISystemData, ISystems } from "../features/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import { useTranslation } from "react-i18next";

interface FormStepperProps {
  activeStep: string | undefined;
  allSteps: string[];
  handleStepClick: (step: string) => void;
}


export default function FormStepper({ activeStep, allSteps, handleStepClick }: FormStepperProps) {
  const { t } = useTranslation();
  const activeStepIndex = activeStep && allSteps.indexOf(activeStep)

  return (
    <Grid item xs sx={{ display: { xs: 'none', md: 'block' } }}>
      <Card elevation={1} sx={{ p: 3, position: 'sticky', top: 48 }}>
        <Stepper activeStep={activeStepIndex || 0} orientation="vertical">
          {activeStep && allSteps.map((label) => (
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
