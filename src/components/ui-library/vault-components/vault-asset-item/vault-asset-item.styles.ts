import { Interpolation } from "@emotion/core";
import { grid } from "../../design-tokens/grid";

const root: Interpolation = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const imageContainer: Interpolation = {
  width: grid(5),
  height: grid(5),
  marginBottom: grid(1),
};

const separator: Interpolation = {
  width: "100%",
  maxWidth: grid(15),
  marginTop: grid(2),
  marginBottom: grid(2),
};

const styles = {
  root,
  imageContainer,
  separator,
};

export default styles;
