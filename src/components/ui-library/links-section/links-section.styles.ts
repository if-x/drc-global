import { Interpolation } from "@emotion/core";
import { Fonts } from "../design-tokens/fonts";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const root: Interpolation = {
  marginBottom: grid(1),
};

const linkContainer: Interpolation = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: grid(3),

  [Device.DesktopTablet]: {
    marginBottom: grid(4),

    ":hover": {
      fontWeight: Fonts.Weight.Bold,

      "> div:first-of-type": {
        transform: "scale(1.1)",
      },
    },
  },
};

const logoContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  width: grid(7),
  height: grid(7),
  marginBottom: grid(1.5),
  transition: "transform 0.2s ease",

  [Device.DesktopTablet]: {
    width: grid(9),
    height: grid(9),
  },
};

const logo: Interpolation = {
  objectFit: "contain",
  width: "100%",
  height: "100%",
};

const label: Interpolation = {
  maxWidth: grid(14),
  lineHeight: "22px",
  textAlign: "center",

  [Device.DesktopTablet]: {
    lineHeight: "22px",
  },
};

const styles = {
  root,
  linkContainer,
  logoContainer,
  logo,
  label,
};

export default styles;
