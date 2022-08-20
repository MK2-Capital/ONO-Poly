import { navLinkType } from "@config";

export type NavbarProps = {
  toggleSideMenu: () => void;
  sideMenuOpen: boolean;
  navLinksData: Array<navLinkType>;
  activeLink: string;
};
