import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  fontSize: 14,
};

const iconContainer: Interpolation = {
  marginLeft: grid(-0.5),
  marginRight: grid(0.5),
  transform: "rotate(-90deg)",
};

const chevron: Interpolation = {
  height: 18,
};

const styles = {
  root,
  iconContainer,
  chevron,
};

export default styles;
