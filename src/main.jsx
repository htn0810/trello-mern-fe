import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx'
import theme from './theme.js';
import { ThemeProvider } from '@mui/material/styles';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <InitColorSchemeScript attribute="class" />
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
