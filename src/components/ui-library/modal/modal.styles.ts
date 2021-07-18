import { Interpolation } from "@emotion/core";
import { transparentize } from "polished";
import { Colors } from "../design-tokens/colors";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const backdrop: Interpolation = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: transparentize(0.4, Colors.Black),
  transition: "all 0.3s ease",
  zIndex: 1000,
};

const container: Interpolation = {
  position: "relative",
  width: "100%",
  backgroundColor: Colors.White,
  padding: `${grid(3)} ${grid(2)} ${grid(6)}`,
  borderRadius: "12px",
  boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.4)",

  [Device.DesktopTablet]: {
    width: grid(37.5),
    padding: `${grid(4)} ${grid(2)} ${grid(5)}`,
  },
};

const closeButton: Interpolation = {
  position: "absolute",
  top: grid(1),
  right: grid(1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(4),
  height: grid(4),
  cursor: "pointer",

  [Device.DesktopTablet]: {
    top: grid(2),
    right: grid(2),
  },
};

const styles = {
  backdrop,
  container,
  closeButton,
};

export default styles;
