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

function useWeb3Portal() {
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

let isInitialized = false;
let nftContract;


export const init = async () => {
    let provider = window.ethereum;
    if (typeof provider !== 'undefined') {
    
    provider
    .request({method: 'eth_requestAccounts' })
    .then((accounts) => {
      selectedAccount = accounts[0];
      console.log(`Selected account is ${selectedAccount}`);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
    window.ethereum.on('accountsChanged', function (accounts){
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  nftContract = new web3.eth.Contract(OnoBallLite, "0xb7957B21cBC56dA2c97A1e64Fd6bD2c6bcdfD575")
  
  isInitialized = true;
};


export const play_game = async (walletAccount) => {
  console.log("test", walletAccount);

  if (!isInitialized) {
    await init();
  }
  return nftContract.methods.playGame().send({from: walletAccount}).on('transactionHash', function(hash){
    console.log('transactionHash');
    alert('you won one ONO NFT, please go to the NFT to see your gift!, it can takes a few minutes before the transaction is completed')
})
.on('receipt', function(receipt){
    console.log('receipt');
})
.on('confirmation', function(confirmationNumber, receipt) {
    console.log('confirmation', confirmationNumber);
    showFilesWithMessage();
})
.on('error', console.error); // If a out of gas error, the second parameter is the receipt.

}

export {useWeb3Portal};