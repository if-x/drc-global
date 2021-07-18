import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const tagline = (theme: Theme): Interpolation => ({
  maxWidth: grid(48),
  fontSize: 20,
  fontStyle: "italic",
  textAlign: "center",
  color: theme.text,
  opacity: 0.8,
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: grid(4),

  [Device.DesktopTablet]: {
    fontSize: 22,
    marginBottom: grid(5),
  },
});

const styles = {
  tagline,
};

export default styles;
