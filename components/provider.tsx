"use client";
import { store } from "@/store"; // Import your Redux store
import React from "react";
import { Provider } from "react-redux";
import ColorPallete from "./Colorpallete";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

const ProviderComp = ({ children }: any) => {
  return (
    <AppProvider i18n={enTranslations}>
      <Provider store={store}>{children}</Provider>
    </AppProvider>
  );
};

export default ProviderComp;
