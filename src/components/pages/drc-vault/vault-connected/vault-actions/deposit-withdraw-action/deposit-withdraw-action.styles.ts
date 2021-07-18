import { Interpolation } from "@emotion/core";
import { Fonts } from "../../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../../ui-library/design-tokens/grid";

const content: Interpolation = {
  padding: `${grid(3)} ${grid(2.5)} ${grid(3.5)}`,
};

const headingContainer: Interpolation = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: grid(3),
};

const heading: Interpolation = {
  maxWidth: grid(13),
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
  content,
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
