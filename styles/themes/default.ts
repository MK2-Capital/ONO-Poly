import { DefaultTheme } from "styled-components";

const defaultTheme: DefaultTheme = {
  // Temp fonts
  fonts: {
    title: "'Poppins', sans-serif",
    main: "'Open Sans', sans-serif",
    mono: "'Space Mono', sans-serif",
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
