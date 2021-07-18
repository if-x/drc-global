import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: grid(3),
  paddingBottom: grid(3),
  cursor: "pointer",
};

const chevron: Interpolation = {
  width: grid(3),
  height: grid(3),
  transition: "all 0.2s ease",
};

const styles = {
  root,
  chevron,
};

export default styles;
