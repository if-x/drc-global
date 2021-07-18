import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const shortDescription: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};

const text = (theme: Theme): Interpolation => ({
  color: theme.text,
});

const infoIcon: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(3),
  height: grid(3),
  marginLeft: grid(0.5),
};

const buttonContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
};

const button: Interpolation = {
  width: "100%",
  [Device.DesktopTablet]: {
    maxWidth: grid(30),
  },
};

const styles = {
  shortDescription,
  text,
  buttonContainer,
  button,
  infoIcon,
};

export default styles;
