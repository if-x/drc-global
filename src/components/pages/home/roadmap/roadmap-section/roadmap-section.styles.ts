import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { Fonts } from "../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../ui-library/design-tokens/grid";

const root: Interpolation = {
  paddingLeft: grid(3),
};

const title = (theme: Theme): Interpolation => ({
  position: "relative",
  fontWeight: Fonts.Weight.Bold,
  paddingBottom: grid(2),

  ":before": {
    position: "absolute",
    left: -30,
    top: 5,
    content: `''`,
    display: "block",
    width: 15,
    height: 15,
    backgroundColor: theme.foreground,
    borderRadius: "50%",
    zIndex: 1,
  },
});

const node = (theme: Theme): Interpolation => ({
  position: "relative",
  paddingBottom: grid(1.5),

  ":last-of-type": {
    paddingBottom: grid(3.5),
  },

  ":before": {
    position: "absolute",
    left: -28,
    top: 5,
    content: `''`,
    display: "block",
    width: 11,
    height: 11,
    backgroundColor: theme.background,
    border: `2px solid ${theme.foreground}`,
    borderRadius: "50%",
    zIndex: 1,
  },
});

const nodeActive = (theme: Theme): Interpolation => ({
  ":before": {
    backgroundColor: theme.foreground,
  },
});

const link = (theme: Theme): Interpolation => ({
  ":after": {
    position: "absolute",
    left: -23,
    top: 5,
    content: `''`,
    display: "block",
    width: 0,
    height: "100%",
    borderLeft: `1px solid ${theme.border}`,
    zIndex: 0,
  },
});

const styles = {
  root,
  title,
  node,
  nodeActive,
  link,
};

export default styles;
