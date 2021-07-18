import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";

const shortDescription: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const infoIcon: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(3),
  height: grid(3),
  marginLeft: 2,
};

const styles = {
  shortDescription,
  infoIcon,
};

export default styles;
