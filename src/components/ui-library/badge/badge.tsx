import { Interpolation } from "@emotion/core";
import * as React from "react";
import { Theme } from "../../../../types/theme";
import { Fonts } from "../design-tokens/fonts";
import { grid } from "../design-tokens/grid";

const styles = (theme: Theme): Interpolation => ({
  display: "flex",
  alignItems: "center",
  height: grid(2),
  fontSize: 10,
  fontWeight: Fonts.Weight.Bold,
  textTransform: "uppercase",
  paddingLeft: grid(0.5),
  paddingRight: grid(0.5),
  border: `1px solid ${theme.foreground}`,
  borderRadius: 1,
});

const Badge: React.FC = ({ children }) => {
  return <div css={styles}>{children}</div>;
};

export default Badge;
