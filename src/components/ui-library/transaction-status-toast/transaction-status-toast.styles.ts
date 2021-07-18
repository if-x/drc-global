import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  alignItems: "center",
};

const icon: Interpolation = {
  flexShrink: 0,
  width: grid(4),
  height: grid(4),
  marginRight: grid(1.5),

  "> span": {
    display: "block",
    width: "100%",
    height: "100%",
  },
};

const linkIcon: Interpolation = {
  position: "absolute",
  top: grid(1.5),
  right: grid(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: grid(4),
  height: grid(4),
};

const styles = {
  root,
  icon,
  linkIcon,
};

export default styles;
