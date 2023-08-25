import { Box, Button, Checkbox, Container, FormControl, Grid, InputAdornment, InputLabel, List, ListItem, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Stack, StepButton, TextField, Typography } from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import FormStepper from "./FormStepper";
import FormSalesUnitStep from "./FormSalesUnitStep";
import FormCustomerStep from "./FormCustomerStep";
import FormSystemSelectorStep from "./FormSystemSelectorStep";
import { useTranslation } from 'react-i18next';
import FormProjectStep from "./FormProjectStep";
import FormASRSStep from "./FormASRSStep";
import { IFormData } from "../features/interfaces";
import { useSelector } from 'react-redux';
import { RootState } from "../features/redux/store";
import ScrollButton from "./MobileScrollButton";
import validationSchema from "../features/formValidation/formValidation";
import { Field, Form as FormikForm, Formik, FormikProps, FormikErrors } from 'formik'
import { initialFormDataState } from "../features/redux/reducers/formDataSlice";


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
        component: <FormASRSStep key="asrs" />,
      });
    }

    if (formData.system.lrkprk.selected) {
      newSteps.push({
        label: t("steps.systems.lrkprk"),
        untranslated: "lrkprk",
        component: <FormASRSStep key="lrkprk" />,
      });
    }

    if (formData.system.agv.selected) {
      newSteps.push({
        label: t("steps.systems.agv"),
        untranslated: "agv",
        component: <FormASRSStep key="agv" />,
      });
    }

    if (formData.system.autovna.selected) {
      newSteps.push({
        label: t("steps.systems.autovna"),
        untranslated: "autovna",
        component: <FormASRSStep key="autovna" />,
      });
    }

    setStepsCombined(newSteps);
  }, [formData]);


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
      setTimeout(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setFadeOut(false);
      }, 500); // Adjust the delay time (in milliseconds) as needed
    };
  }

  const handleBack = () => {
    setFadeOut(true);
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
      setTimeout(() => {
        setActiveStep(step);
        setFadeOut(false);
      }, 500);
    };
  }


  if (formData) {
    return (
      <Formik
        initialValues={initialFormDataState}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => {
        }}
        validateOnMount={true}
        validateOnChange={true}
      >
        {(formikProps: FormikProps<IFormData>) => (
          <FormikForm>
            <Container component='form'>
              <Stack spacing={6} sx={{ mb: 10 }}>
                <Box>
                  <FormStepper activeStep={activeStep} stepLabels={stepLabels} handleStepClick={handleStepClick} />
                </Box>
                <div className={fadeOut ? 'step fadeout' : 'step'}>
                  {stepsCombined[activeStep].component}
                </div>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Stack direction='row'>
                    {activeStep !== 0 && (
                      <Button variant="contained" onClick={handleBack}>
                        {t('ui.button.back')}
                      </Button>
                    )}
                    {activeStep < stepLabels.length - 1 && (
                      <Button variant="contained" onClick={handleNext} sx={{ ml: 'auto' }}
                        disabled={!!(formikProps.errors[activeStepName])}
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