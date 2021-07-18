import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const root: Interpolation = {
  position: "fixed",
  top: grid(2),
  right: grid(2),
  zIndex: 1100,
  [Device.DesktopTablet]: { maxWidth: grid(33.5) },
  [Device.Mobile]: { left: grid(2) },
};

const card: Interpolation = {
  padding: grid(2),
  boxShadow: "0px 15px 20px rgba(0, 0, 0, 0.15)",
  borderRadius: 3,
  [Device.DesktopTablet]: { minWidth: grid(33.5) },
};

const styles = {
  root,
  card,
};

export default styles;
