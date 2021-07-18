import { rgba, transparentize } from "polished";

import { Interpolation } from "@emotion/core";
import { Device } from "../design-tokens/media-queries";
import { Theme } from "../../../../types/theme";

const backDrop: Interpolation = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: rgba(0, 0, 0, 0),
  transition: "background-color 0.3s linear",
};

const backdropOpen = (theme: Theme): Interpolation => ({
  backgroundColor: transparentize(0.5, theme.headerFooterBackground),
});

const container = (theme: Theme): Interpolation => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  right: "-100%",
  width: "880px",
  maxWidth: "calc(100% - 200px)",
  height: "100%",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundColor: theme.background,
  transition: "right 0.3s ease-in",

  "@media (min-width: 1440px)": {
    width: "60%",
  },

  [Device.TabletMobile]: {
    width: "calc(100% - 20px)",
    maxWidth: "100%",
    minWidth: "320px",
  },
});

const containerOpen: Interpolation = {
  right: "0% !important",
  transition: "right 0.3s ease-out",
};

const fullWidthMobile: Interpolation = {
  [Device.Mobile]: {
    width: "100% !important",
  },
};

const styles = {
  backDrop,
  backdropOpen,
  container,
  containerOpen,
  fullWidthMobile,
};

export default styles;
