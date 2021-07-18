import { Interpolation } from "@emotion/core";
import { grid } from "../../../ui-library/design-tokens/grid";

const imageContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: grid(5),
  height: grid(5),
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: grid(2),
};

const image: Interpolation = {
  objectFit: "contain",
  maxWidth: "100%",
  maxHeight: "100%",
};

const buttonContainer: Interpolation = {
  textAlign: "center",
};

const button: Interpolation = {
  width: "100%",
  maxWidth: grid(30),
};

const styles = {
  imageContainer,
  image,
  buttonContainer,
  button,
};

export default styles;
