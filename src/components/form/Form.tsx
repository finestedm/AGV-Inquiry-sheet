import { Box, Button, Card, Checkbox, Container, Fade, FormControl, Grid, Grow, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Slide, Stack, StepButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import FormStepper from "../FormStepper";
import FormSalesUnitStep from "./salesUnitStep/FormSalesUnitStep";
import FormCustomerStep from "./customerStep/FormCustomerStep";
import FormSystemSelectorStep from "./systemSelectorStep/FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import FormProjectStep from "./projectStep/FormProjectStep";
import FormASRSStep from "./systemStep/FormSystemStep";
import { IFormData, ISystemData, ISystems } from "../../features/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from "../../features/redux/store";
import ScrollButton from "../MobileScrollButton";
import validationSchema from "../../features/formValidation/formValidation";
import { Field, Form as FormikForm, Formik, FormikProps, FormikErrors, useFormik } from 'formik'
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import FormSystemStep from "./systemStep/FormSystemStep";
import FormSummaryStep from "./summaryStep/FormSummaryStep";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useDispatch } from "react-redux";
import currentStep, { backStep, initialSteps, nextStep, setCurrentStep, updateSteps } from "../../features/redux/reducers/stepsSlice";
import FormMediaStep from "./mediaStep/MediaStep";

export default function Form(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const formData = useSelector((state: RootState) => state.formData);
  const editMode = useSelector((state: RootState) => state.editMode);

  const [stepsCombined, setStepsCombined] = useState<{ label: string, untranslated: string, component: React.ReactNode }[]>([]);

  useEffect(() => {
    const newSteps: { label: string, untranslated: string, component: React.ReactNode }[] = [
      {
        label: t('steps.sales'),
        untranslated: "sales",
        component: <FormSalesUnitStep key="sales" />
      },
      {
        label: t('steps.customer'),
        untranslated: "customer",
        component: <FormCustomerStep key="customer" />
      },
      {
        label: t('steps.project'),
        untranslated: "project",
        component: <FormProjectStep key="project" />
      },
      {
        label: t('steps.system'),
        untranslated: "system",
        component: <FormSystemSelectorStep key="system" />
      },
    ];

    if (formData.system.asrs.selected) {
      newSteps.push({
        label: t("steps.systems.asrs"),
        untranslated: "asrs",
        component: <FormASRSStep key="asrs" selectedSystem='asrs' />,
      });
    }

    if (formData.system.lrkprk.selected) {
      newSteps.push({
        label: t("steps.systems.lrkprk"),
        untranslated: "lrkprk",
        component: <FormASRSStep key="lrkprk" selectedSystem='lrkprk' />,
      });
    }

    if (formData.system.agv.selected) {
      newSteps.push({
        label: t("steps.systems.agv"),
        untranslated: "agv",
        component: <FormASRSStep key="agv" selectedSystem='agv' />,
      });
    }

    if (formData.system.autovna.selected) {
      newSteps.push({
        label: t("steps.systems.autovna"),
        untranslated: "autovna",
        component: <FormASRSStep key="autovna" selectedSystem='autovna' />,
      });
    }
    newSteps.push({
      label: t('steps.summary'),
      untranslated: "summary",
      component: <FormSummaryStep key="summary" />
    })
    newSteps.push({
      label: t('steps.media'),
      untranslated: "media",
      component: <FormMediaStep key="media" />
    })
    setStepsCombined(newSteps);
  }, [formData, t]);


  const constantSteps = initialSteps;
  const steps = useSelector((state: RootState) => state.steps)
  const systemSteps = formData.system;
  const activeSystemSteps = (Object.entries(systemSteps) as [keyof ISystems, ISystemData][])
    .filter(([step, values]) => values.selected)
    .reduce((acc, [step, values]) => {
      acc[step] = values;
      return acc;
    }, {} as Record<keyof ISystems, ISystemData>);
  const activeSystemStepNames = Object.keys(activeSystemSteps);

  const allSteps = [...constantSteps.filter(step => (step !== 'summary' && step !== 'media')), ...activeSystemStepNames];
  Object.values(formData.system).some(system => system.selected) && allSteps.push('media')  //add summary only if at least one system is selected
  Object.values(formData.system).some(system => system.selected) && allSteps.push('summary')  //add summary only if at least one system is selected

  useEffect(() => {
    dispatch(updateSteps(allSteps));
  }, [formData.system])

  const [grow, setGrow] = useState<boolean>(true);

  const navigateToStep = (step: string) => {
    const elementsWithAriaInvalid = document.querySelectorAll(`[aria-invalid="true"]`);

    if (editMode && elementsWithAriaInvalid.length > 0) {
      const element = elementsWithAriaInvalid[0];
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setGrow(false)
      setTimeout(() => {
        dispatch(setCurrentStep(step));
        setGrow(true);
      }, 300)
    }
  };

  const handleNext = () => {
    const stepToMoveIndex = steps.steps.indexOf(steps.currentStep) + 1
    const stepToMove = steps.steps[stepToMoveIndex]
    navigateToStep(stepToMove)
  };

  const handleBack = () => {
    const stepToMoveIndex = steps.steps.indexOf(steps.currentStep) - 1
    const stepToMove = steps.steps[stepToMoveIndex]
    navigateToStep(stepToMove)
  };

  const handleStepClick = (step: string) => {
    navigateToStep(step);
  };

  useEffect(() => {
    navigate(`/${steps.currentStep}`);
  }, [steps.currentStep])

  useEffect(() => {
    const locationFromURL = location.pathname.split('/').pop() || ''
    dispatch(setCurrentStep(locationFromURL));
  }, [navigate])

  useEffect(() => {
    const locationFromURL = location.pathname.split('/').pop() || ''
    if (steps.possibleSteps.includes(locationFromURL)) {
      dispatch(setCurrentStep(locationFromURL));
    } else {
      dispatch(setCurrentStep(steps.steps[0]));
    }
  }, []);


  if (formData) {
    return (
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
        }}
        validateOnMount={true}
        validateOnChange={true}
        enableReinitialize

      >
        {(formikProps: FormikProps<IFormData>) => (
          <FormikForm>
            <Container component='form' maxWidth='xl'>
              <Stack spacing={6} sx={{ mb: 10, mt: 5 }}>
                <Grid container spacing={6} direction='row'>
                  <FormStepper mobile={isMobile} handleStepClick={handleStepClick} handleBack={handleBack} handleNext={handleNext} />
                  <Grow in={grow} style={{ transformOrigin: '0 0 0' }}>
                    <Grid item xs md={8} lg={9}>
                      <Routes>
                        <Route path="/sales" element={<FormSalesUnitStep />} />
                        <Route path="/customer" element={<FormCustomerStep />} />
                        <Route path="/project" element={<FormProjectStep />} />
                        <Route path="/system" element={<FormSystemSelectorStep />} />
                        {Object.keys(systemSteps).map(system => (
                          <Route
                            path={`/${system}`}
                            element={
                              activeSystemStepNames.includes(system) ?
                                <FormSystemStep selectedSystem={system as keyof ISystems} />
                                :
                                <Navigate to='/' />
                            }
                          />
                        ))}
                        <Route path="/media" element={<FormMediaStep />} />
                        <Route path="/summary" element={<FormSummaryStep />} />
                        <Route path="/*" element={<FormSalesUnitStep />} />
                      </Routes>
                    </Grid>
                  </Grow>
                </Grid>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Stack direction='row'>
                    {steps.currentStep !== allSteps[0] && (
                      <Button startIcon={<NavigateBeforeIcon />} disableElevation variant="contained" onClick={handleBack} sx={{ color: theme.palette.background.default, fontWeight: 700, letterSpacing: '-0.03rem' }}>
                        {t('ui.button.back')}
                      </Button>
                    )}
                    {steps.currentStep !== allSteps[allSteps.length - 1] && (
                      <Button endIcon={<NavigateNextIcon />} disableElevation variant="contained" onClick={handleNext} sx={{ color: theme.palette.background.default, fontWeight: 700, letterSpacing: '-0.03rem', ml: 'auto' }}
                        disabled={editMode && !!Object.keys(formikProps.errors).includes(steps.currentStep)}
                      >
                        {t('ui.button.next')}
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Stack>
              <ScrollButton />
            </Container >
          </FormikForm>
        )}
      </Formik>
    );
  } else {
    return (<h2>hmm</h2>)
  }
}