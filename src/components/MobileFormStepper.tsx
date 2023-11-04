import { AppBar, Box, Button, Card, Container, Grid, MobileStepper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

interface FormStepperProps {
    activeStep: number;
    stepLabels: string[];
    handleStepClick: (step: number) => void;
}

export default function MobileFormStepper({ activeStep, stepLabels, handleStepClick }: FormStepperProps) {
    const theme = useTheme()
    return (
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <AppBar
                position="fixed"
                color='default'
                sx={{ top: 'auto', bottom: 0, borderTop: 1, borderColor: theme.palette.divider }}
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
    );
}
