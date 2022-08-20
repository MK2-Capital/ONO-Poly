import breakpoints from "@styles/breakpoints";
import _ from "lodash";
import {
  useState,
  useEffect,
  useCallback,
  SetStateAction,
  Dispatch,
} from "react";

export type HeaderHookProps = {
  sideMenu: boolean;
  top: boolean;
  sizeThreshold: number;
};

export type HeaderStyleHook = {
  isTop: boolean;
  showSide: boolean;
  setShowSide: Dispatch<SetStateAction<boolean>>;
};

const useHeaderStyle = (
  { sideMenu, top, sizeThreshold }: HeaderHookProps = {
    sideMenu: false,
    top: true,
    sizeThreshold: parseInt(breakpoints.px_sizes.landscape_phone),
  }
): HeaderStyleHook => {
  const [isTop, setIsTop] = useState<boolean>(top);
  const [showSide, setShowSide] = useState<boolean>(sideMenu);

  const handleWindowScroll = useCallback(() => {
    const topScroll = window.scrollY < Math.round(window.innerHeight);
    if (topScroll !== isTop) {
      setIsTop(topScroll);
    }
  }, [isTop]);

  const handleWindowResize = useCallback(() => {
    if (window.innerWidth > sizeThreshold && showSide) {
      setShowSide((prevState) => !prevState);
    }
  }, [showSide, sizeThreshold]);

  const throttledHandleWindowScroll = _.throttle(handleWindowScroll, 100);
  const throttledHandleWindowResize = _.throttle(handleWindowResize, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledHandleWindowScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleWindowScroll);
    };
  }, [throttledHandleWindowScroll]);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleWindowResize);
    return () => {
      window.removeEventListener("resize", throttledHandleWindowResize);
    };
  }, [throttledHandleWindowResize]);

  useEffect(() => {
    if (showSide) {
      document.querySelector("#__next")!.className = "blur";
    } else {
      document.querySelector("#__next")!.className = "";
    }
  }, [showSide]);

  return { isTop, showSide, setShowSide };
};

export default useHeaderStyle;
