import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { Fonts } from "../../ui-library/design-tokens/fonts";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const heading: Interpolation = {
  textAlign: "center",
  fontSize: 30,
  lineHeight: "35px",
  letterSpacing: 2,
  fontWeight: Fonts.Weight.Bold,
  marginBottom: grid(1.5),

  [Device.DesktopTablet]: {
    fontSize: 44,
    lineHeight: "60px",
  },
};

const subHeading = (theme: Theme): Interpolation => ({
  textAlign: "center",
  fontSize: 14,
  letterSpacing: 2,
  color: theme.text,

  [Device.DesktopTablet]: {
    fontSize: 20,
    letterSpacing: 3,
  },
});

const styles = {
  heading,
  subHeading,
};

export default styles;
