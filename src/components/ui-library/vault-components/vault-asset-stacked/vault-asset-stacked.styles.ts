import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: grid(9),
  textAlign: "left",
};

const rootBorder = (theme: Theme): Interpolation => ({
  borderTop: `1px solid ${theme.border}`,
});

const imageContainer = (theme: Theme): Interpolation => ({
  flexShrink: 0,
  width: grid(5),
  height: grid(5),
  borderRadius: "50%",
  overflow: "hidden",
  backgroundColor: theme.foreground,
  marginRight: grid(1.5),
});

const content: Interpolation = {
  flex: 1,
};

const valueContainer: Interpolation = {
  width: grid(6),
  textAlign: "right",
};

const styles = {
  root,
  rootBorder,
  content,
  imageContainer,
  valueContainer,
};

export default styles;
