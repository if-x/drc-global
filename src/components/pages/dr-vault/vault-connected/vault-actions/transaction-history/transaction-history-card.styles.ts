import { Interpolation } from "@emotion/core";
import { grid } from "../../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../../ui-library/design-tokens/media-queries";

const cardHeader: Interpolation = {
  display: "flex",
  padding: grid(2),
  cursor: "pointer",
};

const arrow: Interpolation = {
  flexShrink: 0,
  marginRight: grid(1),
};

const arrowDown: Interpolation = {
  "> img": {
    transform: "rotate(180deg)",
  },
};

const heading: Interpolation = {
  flex: 1,
};

const chevron: Interpolation = {
  alignSelf: "center",
  width: grid(3),
  height: grid(3),
  transition: "all 0.2s ease",
};

const content: Interpolation = {
  padding: `${grid(2)} ${grid(2)} ${grid(3)}`,

  [Device.DesktopTablet]: {
    paddingLeft: grid(5.5),
  },
};

const styles = {
  cardHeader,
  arrow,
  arrowDown,
  heading,
  chevron,
  content,
};

export default styles;
