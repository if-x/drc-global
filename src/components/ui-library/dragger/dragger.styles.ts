import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { grid } from "../design-tokens/grid";

const root: Interpolation = {
  position: "relative",
  width: "calc(100% - 30px)",
  height: grid(3),
  paddingTop: 13,
};

const rail = (theme: Theme): Interpolation => ({
  position: "relative",
  width: "calc(100% + 30px)",
  height: 4,
  backgroundColor: theme.border,
  zIndex: 0,
});

const handle = (theme: Theme): Interpolation => ({
  position: "absolute",
  top: 0,
  width: grid(3),
  height: grid(3),
  backgroundColor: theme.foreground,
  borderRadius: "50%",
  cursor: "pointer",
  zIndex: 1,
});

const styles = {
  root,
  rail,
  handle,
};

export default styles;
