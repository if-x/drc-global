import { Interpolation } from "@emotion/core";
import { Device } from "../design-tokens/media-queries";
import { grid } from "../design-tokens/grid";
import { Fonts } from "../design-tokens/fonts";
import { Theme } from "../../../../types/theme";

const container: Interpolation = {
  display: "flex",

  [Device.Mobile]: {
    "> div": {
      width: "100%",
    },
  },
};

const scroll: Interpolation = {
  [Device.Mobile]: {
    overflowX: "scroll",
    WebkitOverflowScrolling: "touch",
    overflowY: "hidden",
    marginLeft: grid(-2),
    marginRight: grid(-2),

    "> div": {
      width: "auto !important",
    },

    "&::before, &::after": {
      content: `''`,
      display: "block",
      width: grid(2),
      flexShrink: 0,
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const borderedContainer = (theme: Theme): Interpolation => ({
  position: "relative",
  flexShrink: 0,
  display: "flex",
  minHeight: grid(4),
  border: `1px solid ${theme.foreground}`,
  borderRadius: "4px",
  userSelect: "none",
  overflow: "hidden",

  [Device.DesktopTablet]: {
    width: "100%",
  },

  [Device.Mobile]: {
    minWidth: "100%",
  },
});

const smallContainer: Interpolation = {
  minHeight: grid(2.5),
};

const defaultLabel = (theme: Theme): Interpolation => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: 14,
  textTransform: "uppercase",
  backgroundColor: "transparent",
  borderRight: `1px solid ${theme.foreground}`,
  overflow: "hidden",
  WebkitTapHighlightColor: "transparent",
  cursor: "pointer",

  "&:focus": {
    outline: "none",
  },

  "&:last-of-type": {
    borderRightWidth: 0,
  },

  "> *, > *::before, > *::after": {
    userSelect: "none",
  },

  [Device.Mobile]: {
    minWidth: "50px",
    flexShrink: 0,
  },
});

const uniWidth: Interpolation = {
  flex: 1,
};

const labelText: Interpolation = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100%",
  fontSize: 14,
  lineHeight: "20px",
  padding: grid(1),

  "&::after": {
    position: "absolute",
    top: 0,
    left: 0,
    display: "block",
    height: 0,
    visibility: "hidden",
    content: "attr(title)",
    fontWeight: Fonts.Weight.Bold,
    padding: grid(1),
    zIndex: 0,
  },
};

const smallLabel: Interpolation = {
  fontSize: 12,
  lineHeight: "15px",
  padding: grid(0.5),

  "&::after": {
    padding: grid(0.5),
  },
};

const selected = (theme: Theme): Interpolation => ({
  backgroundColor: theme.foreground,
  "> span:first-of-type": {
    color: `${theme.background} !important`,
    fontWeight: Fonts.Weight.Bold,
  },

  pointerEvents: "none",
});

const styles = {
  scroll,
  container,
  borderedContainer,
  smallContainer,
  defaultLabel,
  uniWidth,
  labelText,
  smallLabel,
  selected,
};

export default styles;
