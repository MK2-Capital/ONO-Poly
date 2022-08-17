import type { AppProps } from "next/app";
import Theme from "styles/Theme";
import { appWithTranslation } from "next-i18next";
import { Web3ReactProvider } from "@web3-react/core";

import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  return library;
}

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </Web3ReactProvider>
  );
}

export default appWithTranslation(App);
