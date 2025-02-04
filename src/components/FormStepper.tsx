import { AppBar, Box, Button, MobileStepper, Stepper, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/redux/store";
import UploadIcon from '@mui/icons-material/Upload';
import tinycolor from "tinycolor2";

export default function FormStepper({ navigateToStep, saveDataToServer }: { navigateToStep: (step: string) => void, saveDataToServer: () => void }) {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallest = useMediaQuery(theme.breakpoints.only("xs"));
  const darkMode = useSelector((state: RootState) => state.darkMode);

  const allSteps = useSelector((state: RootState) => state.steps.steps);

  const location = useLocation();
  const activeStep = location.pathname.split("/").pop(); // Extract the active step from the path
  const activeStepIndex = activeStep ? allSteps.indexOf(activeStep) : 0;

  const isLastStep = activeStepIndex === allSteps.length - 1;

  if (isMobile) {
    return (
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <AppBar
          className="mobile-stepper"
          position="fixed"
          color="default"
          sx={{ top: "auto", bottom: 0, borderTop: 1, borderColor: theme.palette.divider, zIndex: isSmallest ? 1100 : '1210 !important' }}
        >
          <MobileStepper
            sx={{ backgroundColor: "transparent" }}
            variant="dots"
            steps={allSteps.length}
            position="static"
            activeStep={activeStepIndex || 0}
            nextButton={
              isLastStep
                ? <Button
                  sx={{ borderRadius: 1000 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => saveDataToServer()}
                  startIcon={<UploadIcon />}
                >
                  {t('ui.button.inquiry.saveToServer')}
                </Button>
                :
                <Button
                  sx={{ borderRadius: 1000 }}
                  variant="contained"
                  color="primary"
                  onClick={() => navigateToStep(allSteps[activeStepIndex + 1] || allSteps[0])}
                >
                  <KeyboardArrowRight />
                </Button>
            }
            backButton={
              <Button
                sx={{ borderRadius: 1000 }}
                variant="contained"
                color="primary"
                onClick={() => navigateToStep(allSteps[activeStepIndex - 1] || allSteps[0])}
              >
                <KeyboardArrowLeft />
              </Button>
            }
          />
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          height: 65,
          justifyContent: "center",
          alignItems: "stretch",
          width: "100%",
          gap: "4px",
          // backgroundColor: theme.palette.divider,
          borderBottom: 1,
          borderColor: theme.palette.divider,
          p: 1
        }}
      >
        {allSteps.map((label, index) => {
          const isActive = index === activeStepIndex;
          const isCompleted = index < activeStepIndex;

          return (
            <Box
              key={label}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: isActive ? 1 : 0,
                px: 1.4,
                py: 1,
                backgroundColor: isActive
                  ? theme.palette.primary.main
                  : isCompleted
                    ? darkMode ? tinycolor(theme.palette.primary.main).darken(35).toHexString() : tinycolor(theme.palette.primary.main).lighten(41).toHexString()
                    : theme.palette.background.paper,
                color: isActive
                  ? theme.palette.background.paper
                  : theme.palette.text.primary,
                cursor: "pointer",
                clipPath:
                  index === 0
                    ? "polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 0% 50%)"
                    : index === allSteps.length - 1
                      ? "polygon(0% 0%, 100% 0%, 100% 50%, 100% 100%, 0% 100%, 10px 50%)"
                      : "polygon(0% 0%, calc(100% - 10px) 0%, 100% 50%, calc(100% - 10px) 100%, 0% 100%, 10px 50%)",
                marginLeft: index > 0 ? "-10px" : "0", // Overlaps the blocks slightly to remove gaps
              }}
              onClick={() => navigateToStep(label)}
            >
              {t(`steps.${label}`)}
            </Box>
          );
        })}

      </Box>
    );
  }
}
