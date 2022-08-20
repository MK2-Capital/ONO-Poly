import Link from "next/link";
import React from "react";
import {
  NavSideMenu,
  Aside,
  AsideNavContainer,
  AsideNavList,
  AsideNavListItem,
} from "./SideMenu.styles";
import { SideMenuProps } from "./SideMenu.types";

function SideMenu({ sideMenuOpen, setShowSide, navLinksData }: SideMenuProps) {
  const handleAsideClosing = () => {
    setShowSide((prevState) => !prevState);
  };

  return (
    <NavSideMenu sideMenuOpen={sideMenuOpen} aria-hidden={!sideMenuOpen}>
      <Aside>
        <AsideNavContainer sideMenuOpen={sideMenuOpen}>
          <AsideNavList>
            {navLinksData &&
              navLinksData.map(({ id, url, name }) => (
                <AsideNavListItem key={id}>
                  <Link href={url} passHref={true}>
                    <a onClick={handleAsideClosing} aria-label={name}>
                      {name}
                    </a>
                  </Link>
                </AsideNavListItem>
              ))}
          </AsideNavList>
        </AsideNavContainer>
      </Aside>
    </NavSideMenu>
  );
}

export default React.memo(SideMenu);
