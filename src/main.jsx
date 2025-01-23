import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeContextProvider } from './context/themeContext.jsx';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>
);
