import { Interpolation } from "@emotion/core";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  position: "relative",
};

const content: Interpolation = {
  maxWidth: grid(76),
  padding: `${grid(3)} ${grid(2)} ${grid(8)}`,

  [Device.DesktopTablet]: {
    padding: `${grid(3)} ${grid(3)} ${grid(8)}`,
  },
};

const styles = {
  root,
  content,
};

export default styles;
