import {
  NavBurgerContainer,
  NavBurgerInner,
  NavBurgerLines,
} from "./Burger.styles";

import React from "react";

export type BurgerProps = {
  toggle: () => void;
  sideMenuOpen: boolean;
};

function Burger({ toggle, sideMenuOpen }: BurgerProps) {
  return (
    <NavBurgerContainer onClick={toggle}>
      <NavBurgerInner sideMenuOpen={sideMenuOpen}>
        <NavBurgerLines sideMenuOpen={sideMenuOpen} />
      </NavBurgerInner>
    </NavBurgerContainer>
  );
}

export default React.memo(Burger);
