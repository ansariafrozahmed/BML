"use client";
import { store } from "@/store"; // Import your Redux store
import React from "react";
import { Provider } from "react-redux";
import ColorPallete from "./Colorpallete";



const ProviderComp = ({ children }: any) => {
  return (
    <Provider store={store}>

      {children}
    </Provider>
  );
};

export default ProviderComp;
