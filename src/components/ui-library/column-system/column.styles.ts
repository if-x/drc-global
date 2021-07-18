import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";
import { Device } from "../design-tokens/media-queries";

const defaultColumnWidth = 280;

const column: Interpolation = {
  display: "flex",
  justifyContent: "center",
  padding: `0 ${grid(1.5)}`,
  marginBottom: grid(3),

  [Device.MobilePort]: {
    flex: "none",
  },

  "> *": {
    width: "100%",
    minHeight: "100%",
  },
};

const narrowMargin: Interpolation = {
  marginBottom: grid(2),
};

const noMargin: Interpolation = {
  marginBottom: "0",

  [Device.MobilePort]: {
    marginBottom: "0",
  },
};

const getWidthBySpan = (span: number) => ({
  width: `${Math.floor((span / 12) * 10000) / 100}%`,
});

export const colWidth = ({
  spanXs = 12,
  spanSm = 6,
  spanMd = 4,
  spanLg = 3,
}) => ({
  [Device.MobilePort]: getWidthBySpan(spanXs),
  ["@media (min-width: 480px)"]: getWidthBySpan(spanSm),
  [Device.DesktopTablet]: getWidthBySpan(spanMd),
  [Device.Desktop]: getWidthBySpan(spanLg),
});

const inline = (inlineWidth?: number): Interpolation => {
  return {
    [Device.Mobile]: {
      flexShrink: 0,
      maxWidth: defaultColumnWidth,
      width: `${inlineWidth || defaultColumnWidth}px !important`,
    },
  };
};

const styles = {
  column,
  narrowMargin,
  inline,
  noMargin,
};

export default styles;
