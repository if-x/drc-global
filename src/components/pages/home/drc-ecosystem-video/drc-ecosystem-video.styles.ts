import { Interpolation } from "@emotion/core";

const videoContainer: Interpolation = {
  position: "relative",
  paddingBottom: "61%",
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
