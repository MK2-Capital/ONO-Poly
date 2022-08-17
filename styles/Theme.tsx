import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { defaultTheme } from "./themes/default";

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
);

export default Theme;
