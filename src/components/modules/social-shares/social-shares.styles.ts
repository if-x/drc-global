import { Interpolation } from "@emotion/core";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  position: "fixed",
  top: "calc(50% - 120px)",
  right: grid(2),

  [Device.TabletMobile]: {
    display: "none",
  },
};

const link: Interpolation = {
  display: "block",
  width: grid(4),
  height: grid(4),
  marginBottom: grid(2),
  transition: "transform 0.2s ease",

  ":hover": {
    transform: "scale(1.1)",
  },

  "> img": {
    width: "100%",
    height: "100%",
  },
};

const styles = {
  root,
  link,
};

export default styles;
