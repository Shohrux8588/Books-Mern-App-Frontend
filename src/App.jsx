import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Home from "./Home";
import dictionary from "./constants/dictionary/dictionary.json";
import { ThemeContextProvider } from "./context/ThemeContextProvider.jsx";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: dictionary[0]["en"] },
    uz: { translation: dictionary[1]["uz"] },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <ThemeContextProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ThemeContextProvider>
    </Suspense>
  );
};

export default App;
