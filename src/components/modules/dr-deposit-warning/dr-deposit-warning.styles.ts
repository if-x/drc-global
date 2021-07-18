import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { grid } from "../../ui-library/design-tokens/grid";
import { Device } from "../../ui-library/design-tokens/media-queries";

const root = (theme: Theme): Interpolation => ({
  padding: `${grid(3)} ${grid(2)} ${grid(4)}`,
  border: `1px solid ${theme.border}`,
  borderRadius: 2,

  [Device.DesktopTablet]: {
    padding: `${grid(4)} ${grid(5)}`,
  },
});

const styles = {
  root,
};

export default styles;
