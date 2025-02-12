import { createTheme } from "@mui/material/styles";
import { cyan, deepOrange, orange, red, teal } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  trello: {
    appBarHeight: "48px",
    boardBarHeight: "58px",
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
