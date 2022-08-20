import styled from "styled-components";
import { transitionAll } from "@styles/transitions";
import breakpoints from "@styles/breakpoints";
import { IStyledSideMenu } from "./SideMenu.types";

export const NavSideMenu = styled.div<IStyledSideMenu>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  outline: 0;
  transition: ${transitionAll};
  transform: translateX(${(props) => (props.sideMenuOpen ? 0 : 100)}vw);
  visibility: ${(props) => (props.sideMenuOpen ? "visible" : "hidden")};
  display: block;
  @media ${breakpoints.media_screens.landscape_tablet} {
    display: none;
  }
`;

export const Aside = styled.aside`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-areas: "nav";
  justify-content: center;
  align-items: center;
  background: white;
  padding: 5em;
  width: 100vw;
  height: 100%;
  position: relative;
  right: 0;
  margin-inline-start: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 16px 0px 30px -17px black;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const AsideNavContainer = styled.nav<IStyledSideMenu>`
  grid-area: nav;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: column;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  transform: ${(props) =>
    props.sideMenuOpen ? `rotateX(0deg)` : `rotateX(-70deg)`};
  opacity: ${(props) => (props.sideMenuOpen ? `1` : `0`)};
  transition: ${transitionAll};
  transition-duration: 500ms;
`;

export const AsideNavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

export const AsideNavListItem = styled.li`
  margin: 0 auto 1.1rem;
  position: relative;
  a {
    color: ${(props) => props.theme.colors.text};
    color: ${(props) => props.theme.colors.header.link.primary};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: normal;
    transition: ${transitionAll};
    &:hover {
      color: ${(props) => props.theme.colors.header.link.hover};
    }
  }
`;
