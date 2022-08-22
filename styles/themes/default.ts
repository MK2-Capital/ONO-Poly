import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  // Temp fonts
  fonts: {
    title: "'Syncopate', sans-serif",
    main: "'Syncopate', sans-serif",
    mono: "'Syncopate', sans-serif",
  },
  // Colors for layout
  colors: {
    background_main: "black",
    text: {
      primary: "white",
    },
    header: {
      background: {
        top: "black",
        fixed: "hsl(210deg 9% 96%)",
      },
      link: {
        primary: "white",
        hover: "white",
        active: "white",
      },
    },
  },
};

export { defaultTheme };
