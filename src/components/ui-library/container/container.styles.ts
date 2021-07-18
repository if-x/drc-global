import { Interpolation } from "@emotion/core";
import { LayoutSize } from "../design-tokens/layout-size";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const root: Interpolation = {
  position: "relative",
  maxWidth: LayoutSize.Container,
  margin: "0 auto",
};

const margin: Interpolation = {
  [Device.Mobile]: {
    margin: `0 ${grid(2)}`,
  },
};

const styles = {
  root,
  margin,
};

export default styles;
