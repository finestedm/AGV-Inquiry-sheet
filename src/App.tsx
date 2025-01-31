import './index.css'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Form from './components/form/Form';
import { I18nextProvider } from 'react-i18next';
import i18n, { t } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './features/multilanguage/pl.json'
import en from './features/multilanguage/en.json'
import de from './features/multilanguage/de.json'
import theme, { themeDark } from './theme';
import { AppBar, Box, Card, CssBaseline, Divider, Drawer, List, ListItem, Paper, Stack, ThemeProvider, Toolbar, useMediaQuery } from '@mui/material';
import MobileScrollButton from './components/MobileScrollButton';
import { useSelector } from 'react-redux';
import store, { RootState } from './features/redux/store';
import DeleteLoadWarningDialog from './components/form/systemStep/subcomponents/DeleteLoadWarningDialog';
import SimpleSnackbar from './components/SnackBar';
import { useDispatch } from 'react-redux';
import { loadFormDataFromLocalStorage, saveFormDataToLocalStorage } from './features/localStorage/handleLocalStorage';
import { setFormData } from './features/redux/reducers/formDataSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ActionCreators } from 'redux-undo';
import { openSnackbar } from './features/redux/reducers/snackBarSlice';
import { allPossibleSteps, setCurrentStep } from './features/redux/reducers/stepsSlice';
import { findDifferences, getChangedKeys, mapPathToStep } from './features/undo-redo/methods';
import Sidebar from './components/Sidebar';
import FormStepperBar from './components/FormStepperBar';
import TopBar from './components/TopBar';
import { saveAs } from 'file-saver';
import axios from "axios";
import dayjs from "dayjs";

// Configure i18next
i18n
  .use(LanguageDetector)
  .init({
    supportedLngs: ['de', 'en', 'pl'],
    resources: {
      pl: { translation: pl },
      en: { translation: en },
      de: { translation: de }
    },
    fallbackLng: 'en', // Fallback to English if the user's language is not supported
    // debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false, // React already escapes string, so no need to escape again
    },
  });

function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode)
  const editMode = useSelector((state: RootState) => state.editMode)
  const formData = useSelector((state: RootState) => state.formData.present);
  const currentStep = useSelector((state: RootState) => state.steps.currentStep);
  const dispatch = useDispatch();
  const [initialLoad, setInitialLoad] = useState(true);

  //
  //loading and saving data from localStorage
  //
  useEffect(() => {
    const savedData = loadFormDataFromLocalStorage(formData.version);
    if (savedData) {
      // Check if the loaded version matches the app version before setting the formData
      if (savedData.version === formData.version) {
        dispatch(setFormData(savedData));
        setInitialLoad(false); // Set initialLoad to false after loading
        dispatch(ActionCreators.clearHistory()); // Clear undo/redo history
      } else {
        // Handle version mismatch or other errors if needed
      }
    }
  }, []);

  // on first render set the initialLoad to false
  useEffect(() => {
    setInitialLoad(false);
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    if (!initialLoad) {
      saveFormDataToLocalStorage(formData);
    }
  }, [formData]);

  //
  //loading and saving data from localStorage
  //

  // Global keydown listener for Ctrl+Z and Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        e.preventDefault();
        handleUndo();
      } else if (e.ctrlKey && e.key === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  //

  // undo-redo //

  function handleUndo() {
    const state = store.getState();
    const { formData } = state; // Get formData state
    const pastState = formData.past.length > 0 ? formData.past[formData.past.length - 1] : null

    if (pastState) {
      // Detect changes between the past and present states
      const differences = findDifferences(pastState, formData.present); // Compare past and present
      const changedKeys = getChangedKeys(differences);
      console.log(differences)
      if (changedKeys.length > 0) {

        // Map the changed path to a step
        const step = mapPathToStep(changedKeys[0]); // Use the first changed path as an example
        if (step) {
          // Dispatch to change the current step
          dispatch(setCurrentStep(step));
        }

        dispatch(
          openSnackbar({
            message: `${t('ui.snackBar.message.undoChanges')}: ${changedKeys.map(key => t(key)).join(', ')}`,
            severity: 'info',
          })
        );
        // Dispatch the undo action
        dispatch(ActionCreators.undo());
      } else {
        dispatch(
          openSnackbar({
            message: `${t('ui.snackBar.message.noUndoableStates')}`,
            severity: 'warning',
          })
        );
      }
    }
  }


  function handleRedo() {
    const state = store.getState();
    const { formData } = state; // Get formData state
    const futureState = formData.future.length > 0 ? formData.future[formData.future.length - 1] : null;

    if (futureState) {
      // Detect changes between the future and present states
      const differences = findDifferences(futureState, formData.present); // Compare future and present
      const changedKeys = getChangedKeys(differences);

      if (changedKeys.length > 0) {
        // Map the changed path to a step
        const step = mapPathToStep(changedKeys[0]); // Use the first changed path as an example
        if (step) {
          // Dispatch to change the current step
          dispatch(setCurrentStep(step));
        }

        // Display the changed keys in the snackbar
        dispatch(
          openSnackbar({
            message: `${t('ui.snackBar.message.redoChanges')}: ${changedKeys.join(', ')}`,
            severity: 'info',
          })
        );
        // Dispatch the redo action
        dispatch(ActionCreators.redo());
      } else {
        dispatch(
          openSnackbar({
            message: `${t('ui.snackBar.message.noRedoableStates')}`,
            severity: 'warning',
          })
        );
      }
    }
  }

  // udno-redo //

  //sizes//
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallest = useMediaQuery(theme.breakpoints.only('xs'))
  //sizes//

  //sidebar open//
  const [sidebarOpen, setSidebarOpen] = useState(false)
  function handleSidebarOpening() {
    setSidebarOpen(sidebarOpen => !sidebarOpen)
  }
  //sidebar open//

  function navigateToStep(step: string) {
    const elementsWithAriaInvalid = document.querySelectorAll(`[aria-invalid="true"]`);
    const isGoingBack = allPossibleSteps.indexOf(step) < allPossibleSteps.indexOf(currentStep);
  
    if (editMode && elementsWithAriaInvalid.length > 0 && !isGoingBack) {
      const element = elementsWithAriaInvalid[0];
      dispatch(
        openSnackbar({
          message: `${t('ui.snackBar.message.formNotComplete')}`,
          severity: 'error',
        })
      );
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      const formBox = document.querySelector('#form-box') as HTMLElement;
      if (formBox) {
        // Fade out
        formBox.style.transition = 'opacity 0.25s ease-out';
        formBox.style.opacity = '0';
  
        // Wait for the fade-out to complete, then change the step and fade back in
        setTimeout(() => {
          dispatch(setCurrentStep(step)); // Change the step
        }, 250); // Match the duration of the fade-out
        setTimeout(() => {
          formBox.style.opacity = '1'; // Fade in
          formBox && formBox.scrollTo({ top: 0, behavior: 'smooth' });

        }, 300); // Match the duration of the fade-out
      }
    }
  }
  

  // save data to server or disk //

      function saveDataToFile() {
          const data = JSON.stringify(formData);
          const blob = new Blob([data], { type: 'application/json' });
          const fileName = `${formData.customer.name}-${dayjs().format('YYYY-MM-DD-HH-mm')}.json`;
          saveAs(blob, fileName);
          dispatch(openSnackbar({ message: `${t('ui.snackBar.message.fileSaved')} ${fileName}`, severity: 'success' }));
      };
  
      const [isWaiting, setIsWaiting] = useState(false);
      const [isResolved, setIsResolved] = useState(false);
  
      async function saveDataToServer() {
          try {
              setIsWaiting(true);       // Set waiting state
              setIsResolved(false);     // Reset resolved state
  
              const response = await axios.post(
                  `${import.meta.env.VITE_SERVER_URL}`,
                  formData,
                  {
                      headers: {
                          'Content-Type': 'application/json',
                      }
                  }
              );
  
              if (response.status === 200) {
                  setIsResolved(true);  // Set resolved state on success
                  dispatch(openSnackbar({ message: `${t('ui.snackBar.message.fileSavedToServer')}`, severity: 'success' }));
                  setTimeout(() => saveDataToFile(), 5000)
              }
          } catch (error) {
              console.error("Failed to save data:", error);
              dispatch(openSnackbar({ message: `${t('ui.snackBar.message.errorSaving')}. Error: ${error}`, severity: 'error' }));
          } finally {
              setIsWaiting(false);      // Reset waiting state
          }
      };

  // save data to server or disk //


  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Stack direction="row" sx={{ height: '100vh' }}> {/* Full height of the screen */}
              <Sidebar handleRedo={handleRedo} handleUndo={handleUndo} sidebarOpen={sidebarOpen} handleSidebarOpening={handleSidebarOpening} saveDataToFile={saveDataToFile} saveDataToServer={saveDataToServer} isWaiting={isWaiting} />
              <Box sx={{ flexGrow: 1, overflow: 'hidden', width: isMobile ? isSmallest ? 'calc(100% - 275px)' : 'calc(100% - 55px)' : 'calc(100% - 275px)' }}>
                <TopBar sidebarOpen={sidebarOpen} handleSidebarOpening={handleSidebarOpening} />
                <Box id="form-box" sx={{ width: '100%', height: isMobile ? isSmallest ? 'calc(100% - 112px)' : 'calc(100% - 52px)' : '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
                  <FormStepperBar navigateToStep={navigateToStep} />
                  <Form navigateToStep={navigateToStep} saveDataToFile={saveDataToFile} saveDataToServer={saveDataToServer} isWaiting={isWaiting} />
                </Box>
              </Box>
            </Stack>
            <SimpleSnackbar />
            <DeleteLoadWarningDialog />
            <MobileScrollButton />
          </div>

        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
