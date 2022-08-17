import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

import { toHex, truncateAddress } from "./utils";

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 137, 80001],
});

export let walletActivate = (Injected) => {
  console.log("test wallet", walletActivate);
};
export let walletDeactivate = () => {};
export let walletActive = false;
export let walletChainId = null;
export let walletAccount = null;
export let walletLibrary = null;
export let walletError = null;

export const useWeb3Portal = async () => {
  const { activate, deactivate, active, chainId, account, library, error } =
    useWeb3React();

  useEffect(() => {
    Injected.isAuthorized()
      .then((isAuthorized) => {
        if (isAuthorized && !active && !error) {
          activate(Injected);
        }
      })
      .catch(() => {});
  }, [activate, active, error, chainId]);

  useEffect(() => {
    if (active && chainId != 80001) {
      switch_network();
    }
  }, [chainId]);

  walletActivate = activate;
  walletDeactivate = deactivate;
  walletActive = active;
  walletChainId = chainId;
  walletAccount = account;
  walletLibrary = library;
  walletError = error;
};

export const switch_network = () => {
  walletLibrary.provider.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: toHex(80001) }],
  });
};

export const check_balance = async (setWalletBalance ) => {
  walletLibrary.provider
    .request({
      method: "eth_getBalance",
      params: [walletAccount, "latest"],
    })
    .then((result) => {
      setWalletBalance((result / 10 ** 18).toPrecision(4));
      return result;
    });
};
