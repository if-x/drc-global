import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../../types/theme";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../../ui-library/design-tokens/grid";

const header = (theme: Theme): Interpolation => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  minHeight: grid(9),
  textAlign: "left",
  paddingLeft: grid(2),
  paddingRight: grid(2),
  borderBottom: `1px solid ${theme.border}`,
});

const imageContainer: Interpolation = {
  width: grid(5),
  height: grid(5),
  marginRight: grid(1.5),
};

const symbol = (theme: Theme): Interpolation => ({
  fontSize: 12,
  color: theme.text,
});

const content: Interpolation = {
  padding: `${grid(2)} ${grid(2.5)} ${grid(3.5)}`,
};

const headingContainer: Interpolation = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: grid(2.5),
};

const heading: Interpolation = {
  maxWidth: grid(11),
  fontWeight: Fonts.Weight.Bold,
  lineHeight: "20px",
};

const headingContent: Interpolation = {
  textAlign: "right",
};

const percentage: Interpolation = {
  fontSize: 50,
  fontWeight: Fonts.Weight.Bold,
  textAlign: "center",
  marginBottom: grid(2),
};

const center: Interpolation = {
  textAlign: "center",
};

const button: Interpolation = {
  width: "100%",
};

const inlineContainer: Interpolation = {
  display: "flex",
  justifyContent: "space-between",
  lineHeight: "16px",
};

const txHistoryButton: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: grid(4),
  cursor: "pointer",

  "> img": {
    marginRight: grid(1),
  },
};

const styles = {
  header,
  symbol,
  content,
  imageContainer,
  headingContainer,
  heading,
  headingContent,
  percentage,
  center,
  button,
  inlineContainer,
  txHistoryButton,
};

export default styles;
