import { Interpolation } from "@emotion/core";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const logoContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  marginBottom: grid(4),

  [Device.DesktopTablet]: {
    marginBottom: grid(5),
  },
};

const logo: Interpolation = {
  width: 70,
  height: 70,

  [Device.DesktopTablet]: {
    width: 115,
    height: 115,
  },
};

const styles = {
  logoContainer,
  logo,
};

export default styles;
