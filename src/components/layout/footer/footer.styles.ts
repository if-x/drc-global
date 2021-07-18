import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { Colors } from "../../ui-library/design-tokens/colors";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const root = (theme: Theme): Interpolation => ({
  position: "relative",
  color: Colors.White,
  backgroundColor: theme.headerFooterBackground,
  paddingTop: grid(5),
  paddingBottom: grid(5),

  [Device.Desktop]: {
    paddingTop: grid(4.5),
    paddingBottom: grid(4.5),
  },
});

const container: Interpolation = {
  [Device.DesktopTablet]: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const links: Interpolation = {
  [Device.DesktopTablet]: {
    width: grid(53),
  },
  [Device.Mobile]: {
    width: grid(28),
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: grid(3),
  },
};

const link: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: grid(4),

  [Device.Mobile]: {
    marginBottom: grid(3),
  },
};

const copyRight: Interpolation = {
  [Device.Mobile]: {
    textAlign: "center",
  },
};

const darkModeToggle: Interpolation = {
  position: "absolute",
  right: grid(1),
  bottom: grid(1),

  [Device.DesktopTablet]: {
    display: "none",
  },
};

const styles = {
  root,
  container,
  links,
  link,
  copyRight,
  darkModeToggle,
};

export default styles;
