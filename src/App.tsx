import React, { Dispatch, SetStateAction, useState } from 'react';
import Form from './components/Form';
import TopBar from './components/AppBar';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './features/multilanguage/pl.json'
import en from './features/multilanguage/en.json'
import theme, { themeDark } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { IFormData, ILoad } from './features/interfaces';
import { Provider } from 'react-redux';
import store, { RootState } from './features/redux/store';
import MobileScrollButton from './components/MobileScrollButton';
import { useSelector } from 'react-redux';

// Configure i18next
i18n
  .use(LanguageDetector)
  .init({
    resources: {
      pl: { translation: pl },
      en: { translation: en },
    },
    fallbackLng: 'en', // Fallback to English if the user's language is not supported
    // debug: true, // Enable debug mode for development
    interpolation: {
      escapeValue: false, // React already escapes string, so no need to escape again
    },
  });

function App() {


  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ThemeProvider theme={themeDark}>
          <CssBaseline />
          <div className="App">
            <TopBar />
            <Form />
            <MobileScrollButton />
          </div>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  );
}

export default App;
