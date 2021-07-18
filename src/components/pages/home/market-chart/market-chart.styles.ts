import { Interpolation } from "@emotion/core";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const headingContainer: Interpolation = {
  display: "flex",
  marginBottom: grid(3.5),
  [Device.DesktopTablet]: {
    marginBottom: grid(5),
  },
};

const imageContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(5),
  height: grid(5),
  marginRight: grid(2),
};

const image: Interpolation = {
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "100%",
};

const headerContent: Interpolation = {
  flex: 1,

  [Device.DesktopTablet]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const styles = {
  headingContainer,
  imageContainer,
  image,
  headerContent,
};

export default styles;
