import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from 'web3';


import OnoBallLite from "@config/onoBallLite.json"

import { toHex, truncateAddress } from "./utils";
import { result } from "lodash";

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

export const play_game = async (walletAccount) => {
  console.log("test", walletAccount);
  // CREATE A NEW PROVIDER WITH WEB3
  const web3 = new Web3("localhost:8545")

  const contract =  new web3.eth.Contract(OnoBallLite, "0xb7957B21cBC56dA2c97A1e64Fd6bD2c6bcdfD575")

  console.log('test_contract', contract)

  const tx = {
    from : walletAccount,
    to : "0xb7957B21cBC56dA2c97A1e64Fd6bD2c6bcdfD575",
    gas: 0,
    data:  contract.methods.playGame().encodeABI()
  }
  const play_game = await contract.methods.playGame().send({from: walletAccount})

  console.log('play', play_game)
}