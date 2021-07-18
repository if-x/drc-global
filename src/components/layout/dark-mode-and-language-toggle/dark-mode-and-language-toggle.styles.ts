import { Interpolation } from "@emotion/core";
import { Colors } from "../../ui-library/design-tokens/colors";
import { grid } from "../../ui-library/design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  alignItems: "center",
};

const toggleButton: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(4),
  height: grid(4),
  color: Colors.White,
  cursor: "pointer",
};

const styles = {
  root,
  toggleButton,
};

export default styles;
