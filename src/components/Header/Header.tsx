import React, { useCallback, useMemo, useState } from "react";

import {
  check_balance,
  Injected,
  walletActivate,
  walletActive,
  walletChainId,
  walletAccount,
} from "../../utils/Web3Portal";
import { truncateAddress } from "../../utils/utils";
import { navLinksData } from "@config";
import { useHeaderStyle } from "@hooks";

import {
  AccountInfo,
  ConnectWalletButton,
  ConnectWalletInfo,
  Container,
  HeaderContainer,
  Logo,
} from "./Header.styles";
import { HeaderProps } from "./Header.types";

import SideMenu from "./SideMenu/SideMenu";
import Navbar from "./Ｎavbar/Navbar";

const Header = ({ activeLink }: HeaderProps) => {
  const [walletBalance, setWalletBalance] = useState(0);

  const { isTop, showSide, setShowSide } = useHeaderStyle();
  const [navLinks] = useState(navLinksData);

  const memoizeToggleMenuCallback = useCallback(() => {
    setShowSide((prevState) => !prevState);
  }, [setShowSide]);

  const memoizeNavLinksData = useMemo(() => {
    return navLinks;
  }, [navLinks]);

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
    <HeaderContainer isTop={isTop}>
      <Navbar
        toggleSideMenu={memoizeToggleMenuCallback}
        sideMenuOpen={showSide}
        navLinksData={memoizeNavLinksData}
        activeLink={activeLink}
      />
      <SideMenu
        sideMenuOpen={showSide}
        setShowSide={setShowSide}
        navLinksData={memoizeNavLinksData}
      />

      <AccountInfo>{connectWalletArea()}</AccountInfo>
    </HeaderContainer>
  );
};

export default Header;
