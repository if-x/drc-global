import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { Fonts } from "../../design-tokens/fonts";
import { grid } from "../../design-tokens/grid";
import { Device } from "../../design-tokens/media-queries";

const root: Interpolation = {
  position: "relative",
};

const content: Interpolation = {
  maxWidth: grid(76),
  padding: `${grid(3)} ${grid(2)} ${grid(8)}`,

  [Device.DesktopTablet]: {
    padding: `${grid(3)} ${grid(3)} ${grid(8)}`,
  },
};

const heading: Interpolation = {
  fontSize: 24,
  fontWeight: Fonts.Weight.Bold,
  marginBottom: grid(3),

  [Device.DesktopTablet]: {
    display: "none",
  },
};

const sectionHeading: Interpolation = {
  fontWeight: Fonts.Weight.Bold,
  lineHeight: grid(2),
  marginBottom: grid(1.5),
};

const text = (theme: Theme): Interpolation => ({
  color: theme.text,
});

const uppercase: Interpolation = {
  textTransform: "uppercase",
};

const styles = {
  root,
  content,
  heading,
  sectionHeading,
  text,
  uppercase,
};

export default styles;
