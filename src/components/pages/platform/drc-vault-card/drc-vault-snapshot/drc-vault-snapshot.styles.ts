import { Interpolation } from "@emotion/core";
import { grid } from "../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  [Device.DesktopTablet]: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const section: Interpolation = {
  [Device.DesktopTablet]: {
    width: "33%",
  },
};

const separator: Interpolation = {
  [Device.Mobile]: {
    marginTop: grid(2),
    marginBottom: grid(2),
  },
  [Device.DesktopTablet]: {
    display: "none",
  },
};

const styles = {
  root,
  section,
  separator,
};

export default styles;
