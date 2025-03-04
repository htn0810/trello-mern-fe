import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import App from "@/App.jsx";
import { ConfirmProvider } from "material-ui-confirm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <InitColorSchemeScript attribute="class" />
      <ConfirmProvider>
        <CssBaseline />
        <App />
        <ToastContainer theme="colored" />
      </ConfirmProvider>
    </ThemeProvider>
  </StrictMode>
);
