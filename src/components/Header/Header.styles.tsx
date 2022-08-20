import styled from "styled-components";
import breakpoints from "@styles/breakpoints";
import { transitionAll } from "@styles/transitions";
import { IStyledHeader } from "./Header.types";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: #d02d2d;
  position: sticky;
  top: 0;
  height: 90px;
  width: 100%;
  border: solid 1px;
  padding: 5px;
`;

export const Logo = styled.div`
  width: 50%;
  margin-left: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`;

export const AccountInfo = styled.div`
  margin-left: auto;
  width: 50%;
  text-align: end;
`;

export const ConnectWalletButton = styled.div`
  margin-right: 50px;
`;

export const ConnectWalletInfo = styled.div`
  color: azure;
  width: 30vw;
`;

export const HeaderContainer = styled.header<IStyledHeader>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: ${(props) => (props.isTop ? "relative" : "fixed")};
  top: 0px;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  z-index: 11;
  backdrop-filter: blur(10px);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  transition: ${transitionAll};
  background: ${(props) =>
    props.isTop
      ? props.theme.colors.header.background.top
      : props.theme.colors.header.background.fixed};
  box-shadow: ${(props) =>
    props.isTop
      ? `none`
      : `0 1em 1em -1em ${props.theme.colors.background_main}`};
  opacity: ${(props) => (props.isTop ? 1 : 0.9)};
  @media ${breakpoints.media_screens.landscape_tablet} {
    padding: 0 30px;
  }
  @media ${breakpoints.media_screens.desktop} {
    padding: 0 40px;
  }
`;
