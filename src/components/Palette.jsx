import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff3e0",
      contrastText: "#6d4c41",
    },
    secondary: {
      main: "#9e9e9e",
      contrastText: "#000",
    },
    background: {
      default: "#fff3e0",
    },
  },
});

export default function Palette(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
