import { Interpolation } from "@emotion/core";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../../ui-library/design-tokens/media-queries";

const container: Interpolation = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
};

const item: Interpolation = {
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: grid(14),
  marginLeft: grid(1),
  marginRight: grid(1),
  marginBottom: grid(4),
  cursor: "pointer",

  "::nth-last-of-type(2)": {
    marginBottom: 0,
  },

  ":last-of-type": {
    marginBottom: 0,
  },

  "> img": {
    width: grid(8),
    height: grid(8),
    marginBottom: grid(1.5),
  },

  [Device.MobilePortXs]: {
    width: grid(12),
  },
};

const styles = {
  container,
  item,
};

export default styles;
