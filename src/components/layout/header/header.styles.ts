import { Interpolation } from "@emotion/core";
import { lighten } from "polished";
import { Theme } from "../../../../types/theme";
import { Colors } from "../../ui-library/design-tokens/colors";
import { Fonts } from "../../ui-library/design-tokens/fonts";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const root = (theme: Theme): Interpolation => ({
  position: "relative",
  backgroundColor: theme.headerFooterBackground,
});

const nav: Interpolation = {
  display: "flex",
  height: grid(4.5),

  [Device.DesktopTablet]: {
    height: grid(5),
  },
};

const item = (theme: Theme): Interpolation => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  lineHeight: grid(2),
  color: Colors.White,
  padding: `0 ${grid(1.5)}`,
  whiteSpace: "nowrap",

  [Device.DesktopTablet]: {
    flexShrink: 0,
    fontSize: 14,

    ":hover": {
      backgroundColor: lighten(0.1, theme.headerFooterBackground),
    },
  },

  [Device.MobilePortXs]: {
    padding: `0 ${grid(1)}`,
  },
});

const itemActive = (theme: Theme): Interpolation => ({
  fontWeight: Fonts.Weight.Bold,
  color: theme.foreground,
  backgroundColor: theme.background,

  [Device.DesktopTablet]: {
    ":hover": {
      backgroundColor: theme.background,
    },
  },
});

const darkModeToggle: Interpolation = {
  position: "absolute",
  top: grid(0.5),
  right: grid(2),

  [Device.Mobile]: {
    display: "none",
  },
};

const styles = {
  root,
  nav,
  item,
  itemActive,
  darkModeToggle,
};

export default styles;
