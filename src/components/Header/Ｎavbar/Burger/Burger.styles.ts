import styled from "styled-components";
import breakpoints from "@styles/breakpoints";
import { transitionAll, transitionHamburger } from "@styles/transitions";
import { IStyledBurger } from "./Burger.types";

export const NavBurgerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  align-items: flex-end;
  z-index: 11;
  &:hover {
    cursor: pointer;
  }
  @media ${breakpoints.media_screens.landscape_tablet} {
    display: none;
  }
`;

export const NavBurgerInner = styled.div<IStyledBurger>`
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  padding: ${(props) => (props.sideMenuOpen ? `1.1em` : `1.3em`)};
  width: 2.1rem;
  height: 1.6rem;
  transition: ${transitionAll};
`;

export const NavBurgerLines = styled.div<IStyledBurger>`
  position: absolute;
  width: 2.1rem;
  height: 2px;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  background-color: black;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${(props) => (props.sideMenuOpen ? `0.12s` : `0s`)};
  transform: rotate(${(props) => (props.sideMenuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${(props) =>
      props.sideMenuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
  );
  &:before,
  &:after {
    content: "";
    display: block;
    background-color: black;
    position: absolute;
    left: auto;
    right: 0;
    width: 2.1rem;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 0.2rem;
  }
  &:before {
    top: ${(props) => (props.sideMenuOpen ? `0` : `-10px`)};
    opacity: ${(props) => (props.sideMenuOpen ? 0 : 1)};
    transition: ${(props) =>
      props.sideMenuOpen
        ? transitionHamburger.beforeActive
        : transitionHamburger.before};
  }
  &:after {
    bottom: ${(props) => (props.sideMenuOpen ? `0` : `-10px`)};
    transform: rotate(${(props) => (props.sideMenuOpen ? `-90deg` : `0`)});
    transition: ${(props) =>
      props.sideMenuOpen
        ? transitionHamburger.afterActive
        : transitionHamburger.after};
  }
`;
