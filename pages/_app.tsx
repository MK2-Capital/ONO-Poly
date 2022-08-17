import type { AppProps } from "next/app";
import Theme from "styles/Theme";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Component {...pageProps} />
    </Theme>
  );
}

export default appWithTranslation(App);
