import { Interpolation } from "@emotion/core";
import { grid } from "../../../../../ui-library/design-tokens/grid";

const content: Interpolation = {
  padding: `${grid(3)} ${grid(2.5)} ${grid(4)}`,
};

const headingContainer: Interpolation = {
  textAlign: "center",
  marginBottom: grid(2.5),
};

const imageContainer: Interpolation = {
  width: grid(6),
  height: grid(6),
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: grid(2.5),

  img: {
    width: "100%",
  },
};

const styles = {
  content,
  headingContainer,
  imageContainer,
};

export default styles;
