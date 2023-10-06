import { Box, Button, Card, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Paper, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import FormStepper from "../FormStepper";
import FormSalesUnitStep from "./salesUnitStep/FormSalesUnitStep";
import FormCustomerStep from "./customerStep/FormCustomerStep";
import FormSystemSelectorStep from "./systemSelectorStep/FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import FormProjectStep from "./projectStep/FormProjectStep";
import FormASRSStep from "./systemStep/FormSystemStep";
import { IFormData } from "../../features/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from "../../features/redux/store";
import ScrollButton from "../MobileScrollButton";
import validationSchema from "../../features/formValidation/formValidation";
import { Field, Form as FormikForm, Formik, FormikProps, FormikErrors, useFormik } from 'formik'
import { initialFormDataState } from "../../features/redux/reducers/formDataSlice";
import MobileFormStepper from "../MobileFormStepper";


export default function Form(): JSX.Element {


  const { t } = useTranslation();

  const formData = useSelector((state: RootState) => state.formData);

  const [stepsCombined, setStepsCombined] = useState<{ label: string, untranslated: string, component: React.ReactNode }[]>([
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
    }
  ]);

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
      }
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

    setStepsCombined(newSteps);
  }, [formData, t]);


  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeStepName, setActiveStepName] = useState<string>('');

  useEffect(() => {
    setActiveStepName(stepsCombined[activeStep].untranslated.toLowerCase())

  }, [activeStep])

  const stepLabels = stepsCombined.map((step) => step.label);

  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const handleNext = () => {

    const elementsWithAriaInvalid = document.querySelectorAll(`[aria-invalid="true"]`);
    if (elementsWithAriaInvalid.length > 0) {
      const element = elementsWithAriaInvalid[0];
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } else {
      setFadeOut(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setFadeOut(false);
      }, 500); // Adjust the delay time (in milliseconds) as needed
    };
  }

  const handleBack = () => {
    setFadeOut(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
      setFadeOut(false);
    }, 500); // Adjust the delay time (in milliseconds) as needed
  };

  const handleStepClick = (step: number) => {
    const elementsWithAriaInvalid = document.querySelectorAll(`[aria-invalid="true"]`);
    if (elementsWithAriaInvalid.length > 0) {
      const element = elementsWithAriaInvalid[0];
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } else {
      setFadeOut(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setActiveStep(step);
        setFadeOut(false);
      }, 500);
    };
  }

  if (formData) {
    return (
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
        }}
        // validateOnMount={true}
        validateOnChange={true}
        enableReinitialize
      >
        {(formikProps: FormikProps<IFormData>) => (
          <FormikForm>
            <Container component='form' maxWidth='xl'>
              <Stack spacing={6} sx={{ mb: 10, mt: 5 }}>
                <Grid container spacing={6} direction='row'>
                  <FormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
                  <Grid item xs md={8} lg={9}>
                    <Box className={fadeOut ? 'step fadeout' : 'step'}>
                      {stepsCombined[activeStep]?.component}
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Stack direction='row'>
                    {activeStep !== 0 && (
                      <Button variant="contained" onClick={handleBack}>
                        {t('ui.button.back')}
                      </Button>
                    )}
                    {activeStep < stepLabels.length - 1 && (
                      <Button variant="contained" onClick={handleNext} sx={{ ml: 'auto' }}
                        disabled={!!Object.keys(formikProps.errors).includes(activeStepName)}
                      >
                        {t('ui.button.next')}
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Stack>
              <ScrollButton />
              <MobileFormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
            </Container >
          </FormikForm>
        )}
      </Formik>
    );
  } else {
    return (<h2>hmm</h2>)
  }
}