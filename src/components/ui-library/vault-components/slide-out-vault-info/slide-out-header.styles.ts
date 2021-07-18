import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { Colors } from "../../design-tokens/colors";
import { Fonts } from "../../design-tokens/fonts";
import { grid } from "../../design-tokens/grid";
import { Device } from "../../design-tokens/media-queries";

const root = (theme: Theme): Interpolation => ({
  position: "sticky",
  top: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  height: grid(6),
  color: Colors.White,
  backgroundColor: theme.headerFooterBackground,
  paddingLeft: grid(2),
  paddingRight: grid(2),
  zIndex: 10,

  [Device.DesktopTablet]: {
    height: grid(8),
    paddingLeft: grid(4),
  },
});

const logo: Interpolation = {
  marginRight: grid(2),
};

const heading: Interpolation = {
  flex: 1,
  fontSize: 24,
  fontWeight: Fonts.Weight.Bold,

  [Device.Mobile]: {
    visibility: "hidden",
  },
};

const closeButton: Interpolation = {
  display: "flex",
  alignItems: "center",
  height: grid(4),
  fontWeight: Fonts.Weight.Bold,
  textTransform: "uppercase",
  color: Colors.White,
  cursor: "pointer",

  [Device.DesktopTablet]: {
    paddingLeft: grid(2),
    paddingRight: grid(2),
    border: `1px solid ${Colors.White}`,
    borderRadius: "2px",
  },
};

const styles = {
  root,
  logo,
  heading,
  closeButton,
};

export default styles;
