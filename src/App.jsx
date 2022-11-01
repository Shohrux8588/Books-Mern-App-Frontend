import React, { Suspense } from "react";

import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";

import Home from "./Home";
import dictionary from "./constants/dictionary/dictionary.json";
import { ThemeContextProvider } from "./context/ThemeContextProvider.jsx";
import UserContextProvider from "./context/UserContextProvider";
import store from "./store/index";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: dictionary[0]["en"] },
    uz: { translation: dictionary[1]["uz"] },
  },
  fallbackLng: localStorage.getItem("language") || "en",
  interpolation: { escapeValue: false },
});

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <ErrorBoundary>
        <ThemeContextProvider>
          <UserContextProvider>
            <Provider store={store}>
              <BrowserRouter>
                <Home />
              </BrowserRouter>
            </Provider>
          </UserContextProvider>
        </ThemeContextProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default App;
