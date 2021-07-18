import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { Fonts } from "../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../ui-library/design-tokens/media-queries";

const root: Interpolation = {
  position: "relative",
};

const back: Interpolation = {
  position: "absolute",
  top: grid(-0.5),
  left: 0,
  zIndex: 1,

  [Device.Mobile]: {
    left: grid(2),
  },
};

const disconnect: Interpolation = {
  position: "absolute",
  top: -3,
  right: 0,
  fontSize: 14,
  cursor: "pointer",
  zIndex: 1,

  [Device.Mobile]: {
    right: grid(2),
  },
};

const topContainer: Interpolation = {
  padding: `${grid(4.5)} ${grid(2)} ${grid(3)}`,
};

const badge: Interpolation = {
  position: "absolute",
  top: grid(1.5),
  right: grid(1.5),
};

const buyDrcButton: Interpolation = {
  position: "absolute",
  top: grid(1.5),
  left: grid(1.5),
};

const walletHeading: Interpolation = {
  fontSize: 20,
  fontWeight: Fonts.Weight.Bold,
  marginBottom: grid(1.5),
};

const drcBalance: Interpolation = {
  fontSize: 24,
  fontWeight: Fonts.Weight.Bold,
  marginBottom: grid(2),
  [Device.DesktopTablet]: {
    fontSize: 28,
  },
};

const userAccountLink = (theme: Theme): Interpolation => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.text,
});

const bottomContainer: Interpolation = {
  padding: `${grid(3)} ${grid(2)} 0`,
  [Device.DesktopTablet]: {
    padding: `${grid(3)} ${grid(2)} ${grid(3)}`,
  },
};

const userVaultWorth: Interpolation = {
  fontSize: 34,
  fontWeight: Fonts.Weight.Bold,
  marginBottom: grid(1),
  [Device.DesktopTablet]: {
    fontSize: 40,
  },
};

const text = (theme: Theme): Interpolation => ({
  color: theme.text,
});

const styles = {
  root,
  back,
  disconnect,
  topContainer,
  badge,
  buyDrcButton,
  walletHeading,
  drcBalance,
  userAccountLink,
  bottomContainer,
  userVaultWorth,
  text,
};

export default styles;
