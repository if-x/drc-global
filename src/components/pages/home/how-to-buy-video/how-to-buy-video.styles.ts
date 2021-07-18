import { Interpolation } from "@emotion/core";
import { grid } from "../../../ui-library/design-tokens/grid";

const videoContainer: Interpolation = {
  position: "relative",
  paddingBottom: "61%",
  marginBottom: grid(3),
  overflow: "hidden",

  "> iframe": {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100% !important",
    height: "100% !important",
  },
};

const styles = {
  videoContainer,
};

export default styles;
