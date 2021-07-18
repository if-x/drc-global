import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { grid } from "../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  position: "relative",
};

const back: Interpolation = {
  position: "absolute",
  top: grid(-0.5),
  left: 0,
  zIndex: 1,
};

const badge: Interpolation = {
  position: "absolute",
  top: grid(1.5),
  right: grid(1.5),
};

const text = (theme: Theme): Interpolation => ({
  color: theme.text,
});

const button: Interpolation = {
  width: "100%",
  [Device.DesktopTablet]: {
    maxWidth: grid(30),
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const extraInfo = (theme: Theme): Interpolation => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: theme.text,
  marginTop: grid(3),
});

const styles = {
  root,
  badge,
  text,
  button,
  back,
  extraInfo,
};

export default styles;
