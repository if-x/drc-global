import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { Fonts } from "../design-tokens/fonts";
import { grid } from "../design-tokens/grid";

const root = (theme: Theme): Interpolation => ({
  display: "flex",
  alignItems: "center",
  height: grid(5),
  padding: grid(1),
  paddingRight: grid(1.5),
  border: `1px solid ${theme.foreground}`,
  borderRadius: 2,
});

const imageContainer: Interpolation = {
  flexShrink: 0,
  width: grid(3),
  height: grid(3),
  marginRight: grid(1.5),
  "> img": {
    width: "100%",
    height: "100%",
  },
};

const input = (theme: Theme): Interpolation => ({
  flex: 1,
  maxWidth: "calc(100% - 90px)",
  fontSize: 18,
  fontWeight: Fonts.Weight.Bold,
  color: theme.foreground,
  backgroundColor: "transparent",
  border: 0,
  outline: 0,
  padding: 0,
  marginRight: grid(1),
  caretColor: theme.foreground,
  WebkitAppearance: "none",
  MozAppearance: "textfield",

  "::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },

  "::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

const styles = {
  root,
  imageContainer,
  input,
};

export default styles;
