
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import '@fontsource/inter';


// Soft UI Dashboard React Context Provider
import { PhotoLabContextProvider } from "context";
import {LoginProvider} from "./context/loggingConxtext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PhotoLabContextProvider >
        <LoginProvider>
      <App />
        </LoginProvider>
    </PhotoLabContextProvider >
  </BrowserRouter>
);
