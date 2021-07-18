import { Interpolation } from "@emotion/core";
import { transparentize } from "polished";
import { Theme } from "../../../../types/theme";
import { Fonts } from "../design-tokens/fonts";
import { grid } from "../design-tokens/grid";

const root = (theme: Theme): Interpolation => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: "100%",
  height: grid(5),
  fontSize: 16,
  textTransform: "uppercase",
  color: theme.foreground,
  backgroundColor: "transparent",
  border: `1px solid ${theme.foreground}`,
  paddingLeft: grid(1),
  paddingRight: grid(1),
  borderRadius: "2px",
  transition: "all 0.2s ease",
  overflow: "hidden",
  WebkitAppearance: "none",
  outline: 0,

  ":hover": {
    transform: "translate(-1px, -2px)",
    boxShadow: `5px 3px 0 ${theme.foreground}`,
  },

  ":active": {
    transform: "translate(0px, 0px)",
    boxShadow: `1px 1px 0 ${theme.foreground}`,
    outline: 0,
  },
});

const small: Interpolation = {
  height: grid(3.5),
};

const primary = (theme: Theme): Interpolation => ({
  fontWeight: Fonts.Weight.Bold,
  color: theme.background,
  backgroundColor: theme.foreground,
  border: 0,

  ":hover": {
    boxShadow: `5px 3px 0 ${transparentize(0.7, theme.foreground)}`,
  },

  ":active": {
    boxShadow: `1px 1px 0 ${transparentize(0.7, theme.foreground)}`,
  },
});

const cursorPointer: Interpolation = {
  cursor: "pointer",
};

const cursorWait: Interpolation = {
  cursor: "wait",
};

const loader: Interpolation = {
  marginRight: grid(1),

  "> span": {
    display: "block",
    height: grid(2),
  },
};

const disabled: Interpolation = {
  opacity: 0.7,
};

const styles = {
  root,
  small,
  primary,
  loader,
  cursorPointer,
  cursorWait,
  disabled,
};

export default styles;
