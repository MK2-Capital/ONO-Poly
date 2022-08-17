import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      title: string;
      main: string;
      mono: string;
    };
    // Colors for layout
    colors: {
      background_main: string;
      text: {
        primary: string;
      };
    };
  }
}
