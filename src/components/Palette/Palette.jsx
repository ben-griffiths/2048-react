import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";

const calcCssColour = (colour) => {
  const out = getComputedStyle(document.documentElement)
    .getPropertyValue(colour)
    .trim();
  return out ? out : "#fff";
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: calcCssColour("--primary-main"),
      contrastText: calcCssColour("--primary-contrast"),
    },
    secondary: {
      main: calcCssColour("--secondary-main"),
      contrastText: calcCssColour("--secondary-contrast"),
    },
    tertiary: {
      main: calcCssColour("--tertiary-main"),
      contrastText: calcCssColour("--tertiary-contrast"),
    },
    quaternary: {
      main: calcCssColour("--quaternary-main"),
    },
    background: {
      default: calcCssColour("--background-default"),
    },
  },
});

export function Palette(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
