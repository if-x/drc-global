import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  [Device.DesktopTablet]: {
    display: "flex",
    alignItems: "center",
  },
};

const gifLink: Interpolation = {
  position: "relative",
  display: "block",
  paddingBottom: "100%",
  overflow: "hidden",
  marginBottom: grid(2.5),

  [Device.DesktopTablet]: {
    flexGrow: 0,
    flexShrink: 0,
    width: "50%",
    paddingBottom: "50%",
    marginRight: grid(4),
    marginBottom: 0,
  },
};

const gif = (theme: Theme): Interpolation => ({
  position: "absolute",
  top: "0",
  left: "0",
  width: "100% !important",
  height: "100% !important",
  backgroundColor: theme.imageLoadingBackground,
});

const content: Interpolation = {
  flex: 1,
};

const button: Interpolation = {
  width: "100%",
};

const hideDesktop: Interpolation = {
  [Device.DesktopTablet]: {
    display: "none",
  },
};

const styles = {
  root,
  gifLink,
  gif,
  content,
  button,
  hideDesktop,
};

export default styles;
