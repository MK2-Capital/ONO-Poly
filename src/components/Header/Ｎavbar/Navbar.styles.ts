import styled from "styled-components";
import breakpoints from "@styles/breakpoints";
import { transitionAll } from "@styles/transitions";

export const NavContainer = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const NavLinks = styled.div`
  display: none;
  align-items: center;
  font-size: 14px;
  @media ${breakpoints.media_screens.landscape_tablet} {
    display: flex;
  }
`;

export const NavList = styled.ol`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const NavListItem = styled.li`
  margin: 0 5px;
  position: relative;
  a {
    display: flex;
    flex-direction: column;
    padding: 10px;
    color: ${(props) => props.theme.colors.header.link.primary};
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-family: 'Helvetica Neue';
    font-weight: normal;
    transition: ${transitionAll};
    &.active {
      color: ${(props) => props.theme.colors.header.link.active};
      font-weight: bold;
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 3px;
    }
    &:hover {
      color: ${(props) => props.theme.colors.header.link.hover};
    }
  }
`;
