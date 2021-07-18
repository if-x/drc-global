import * as React from "react";

import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const rowStyle: Interpolation = {
  display: "flex",
  flexWrap: "wrap",
  margin: `0 ${grid(-1.5)}`,
};

const rowInlineStyle: Interpolation = {
  flexWrap: "nowrap",

  [Device.TabletMobile]: {
    margin: `0 ${grid(-2)}`,
    padding: `0 ${grid(1.5)}`,
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const rowCenterStyle: Interpolation = {
  justifyContent: "center",
};

const styles = {
  row: rowStyle,
  rowInline: rowInlineStyle,
  rowCenter: rowCenterStyle,
};

interface RowProps {
  isInline?: boolean;
  isCenter?: boolean;
  children?: React.ReactNode | React.ReactNodeArray;
}

const Row: React.FC<RowProps> = ({ isInline, isCenter, children }) => (
  <div
    css={[
      styles.row,
      isInline && styles.rowInline,
      isCenter && styles.rowCenter,
    ]}
  >
    {children}
  </div>
);

export default Row;
