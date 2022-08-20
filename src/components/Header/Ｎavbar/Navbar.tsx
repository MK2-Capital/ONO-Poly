import Link from "next/link";
import Burger from "./Burger/Burger";
import NavLogo from "./Logo/NavLogo";
import { NavContainer, NavLinks, NavList, NavListItem } from "./Navbar.styles";
import React from "react";
import { NavbarProps } from "./Navbar.types";

function Navbar({
  toggleSideMenu,
  sideMenuOpen,
  navLinksData,
  activeLink,
}: NavbarProps) {
  return (
    <NavContainer>
      <NavLogo />
      <NavLinks>
        <NavList>
          {navLinksData &&
            navLinksData.map(({ id, url, name, element }) => (
              <NavListItem key={id}>
                <Link href={url} passHref={true}>
                  <a
                    className={`${activeLink === element ? "active" : ""}`}
                    aria-label={name}
                  >
                    {name}
                  </a>
                </Link>
              </NavListItem>
            ))}
        </NavList>
      </NavLinks>
      <Burger toggle={toggleSideMenu} sideMenuOpen={sideMenuOpen} />
    </NavContainer>
  );
}

export default React.memo(Navbar);
