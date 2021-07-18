import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  display: "flex",
  alignItems: "center",
  marginBottom: grid(4),
  [Device.DesktopTablet]: {
    marginBottom: grid(6),
  },
};

const separator = (theme: Theme): Interpolation => ({
  flex: 1,
  borderTop: `1px solid ${theme.border}`,
});

const imageContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(10),
  height: grid(10),

  [Device.DesktopTablet]: {
    width: grid(12),
    height: grid(12),
  },
};

const image: Interpolation = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
};

const styles = {
  root,
  separator,
  imageContainer,
  image,
};

export default styles;
