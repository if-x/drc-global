import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { Fonts } from "../../design-tokens/fonts";
import { grid } from "../../design-tokens/grid";

const card = (theme: Theme): Interpolation => ({
  border: `1px solid ${theme.border}`,
  borderTop: `5px solid ${theme.foreground}`,
  borderRadius: 2,
});

const cardPadding: Interpolation = {
  padding: `${grid(3)} ${grid(2)} ${grid(3.5)}`,
};

const cardSm = (theme: Theme): Interpolation => ({
  padding: `${grid(3)} ${grid(2)}`,
  border: `1px solid ${theme.border}`,
  borderRadius: 2,
});

const heading = (theme: Theme): Interpolation => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: 14,
  lineHeight: "20px",
  color: theme.text,
  marginBottom: grid(1),
});

const infoIcon: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: grid(1),
  cursor: "pointer",
};

const value: Interpolation = {
  textAlign: "center",
  fontSize: 18,
  fontWeight: Fonts.Weight.Bold,
  lineHeight: "20px",
};

const secondaryHeading = (theme: Theme): Interpolation => ({
  textAlign: "center",
  fontSize: 12,
  lineHeight: "15px",
  color: theme.text,
  marginBottom: grid(1),
});

const secondaryValue: Interpolation = {
  fontSize: 14,
  textAlign: "center",
};

const styles = {
  card,
  cardPadding,
  cardSm,
  heading,
  infoIcon,
  value,
  secondaryHeading,
  secondaryValue,
};

export default styles;
