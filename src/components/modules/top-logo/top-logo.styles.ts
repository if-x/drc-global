import { Interpolation } from "@emotion/core";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const logoContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  marginBottom: grid(3),

  [Device.DesktopTablet]: {
    marginBottom: grid(4),
  },
};

const logo: Interpolation = {
  width: 175,
  height: 175,

  [Device.DesktopTablet]: {
    width: 250,
    height: 250,
  },
};

const styles = {
  logoContainer,
  logo,
};

export default styles;
