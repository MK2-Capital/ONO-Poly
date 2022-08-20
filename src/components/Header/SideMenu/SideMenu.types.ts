import { navLinkType } from "@config";
import { Dispatch, SetStateAction } from "react";

export type SideMenuProps = {
  sideMenuOpen: boolean;
  setShowSide: Dispatch<SetStateAction<boolean>>;
  navLinksData: Array<navLinkType>;
};

export interface IStyledSideMenu {
  sideMenuOpen: boolean;
}
