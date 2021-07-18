import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

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

const styles = {
  text,
  button,
};

export default styles;
