import { Interpolation } from "@emotion/serialize";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";

const headerContainer: Interpolation = {
  marginBottom: grid(2),

  [Device.DesktopTablet]: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const itemPickerContainer: Interpolation = {
  width: grid(12),
};

const infoIcon: Interpolation = {
  display: "inline-block",
  textAlign: "center",
  width: grid(3),
};

const styles = {
  headerContainer,
  itemPickerContainer,
  infoIcon,
};

export default styles;
