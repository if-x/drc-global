import { Interpolation } from "@emotion/core";
import * as React from "react";
import { Theme } from "../../../../types/theme";
import { grid } from "../design-tokens/grid";

const styles = (theme: Theme): Interpolation => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: grid(7),
  textAlign: "center",
  color: theme.text,
  backgroundColor: theme.secondaryBackground,
  padding: `0 ${grid(2)}`,
  borderRadius: 2,
});

const InfoBox: React.FC = ({ children }) => {
  return (
    <div css={styles}>
      <div>{children}</div>
    </div>
  );
};

export default InfoBox;
