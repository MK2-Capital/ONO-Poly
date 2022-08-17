import { useState } from "react";

import {
  check_balance,
  Injected,
  walletActivate,
  walletActive,
  walletChainId,
  walletAccount,
} from "../../utils/Web3Portal";
import { truncateAddress } from "../../utils/utils";

import {
  AccountInfo,
  ConnectWalletButton,
  ConnectWalletInfo,
  Container,
  Logo,
} from "./Header.styles";

const Header = () => {
  const [walletBalance, setWalletBalance] = useState(0);

  function connectWalletArea() {
    if (walletActive) {
      check_balance(setWalletBalance);

      return (
        <ConnectWalletInfo>
          <div>
            <div>
              <div>Account: {truncateAddress(walletAccount)}</div>
            </div>
            <div>
              <div>Balance: {walletBalance} MATIC</div>
            </div>
            <div>
              <div>Chain ID: {walletChainId}</div>
            </div>
          </div>
        </ConnectWalletInfo>
      );
    } else {
      return (
        <ConnectWalletButton>
          <button
            onClick={() => {
              //  connect();
              walletActivate(Injected);
            }}
          >
            Connect Wallet
          </button>
        </ConnectWalletButton>
      );
    }
  }

  return (
    <Container>
      <Logo>
        <div> ONOBALL</div>
      </Logo>
      <AccountInfo>{connectWalletArea()}</AccountInfo>
    </Container>
  );
};

export default Header;
