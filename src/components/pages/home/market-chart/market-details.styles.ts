import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { Fonts } from "../../../ui-library/design-tokens/fonts";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const label = (theme: Theme): Interpolation => ({
  fontSize: 14,
  color: theme.text,
  marginBottom: grid(1),

  [Device.DesktopTablet]: {
    textAlign: "center",
  },
});

const value: Interpolation = {
  fontWeight: Fonts.Weight.Bold,
  [Device.DesktopTablet]: {
    textAlign: "center",
  },
};

const styles = {
  label,
  value,
};

export default styles;
