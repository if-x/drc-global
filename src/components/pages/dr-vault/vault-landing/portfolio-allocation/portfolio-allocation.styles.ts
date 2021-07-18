import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { grid } from "../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../ui-library/design-tokens/media-queries";

const root = (theme: Theme): Interpolation => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  padding: `${grid(3)} ${grid(2)} ${grid(1)}`,
  border: `1px solid ${theme.border}`,

  [Device.DesktopTablet]: {
    padding: `${grid(3)} ${grid(4)}`,
  },
});

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

const styles = {
  root,
  shortDescription,
  text,
  infoIcon,
};

export default styles;
