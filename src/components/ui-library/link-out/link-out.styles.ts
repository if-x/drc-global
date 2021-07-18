import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";

const root = (theme: Theme): Interpolation => ({
  display: "flex",
  alignItems: "center",
  color: theme.text,
});

const center: Interpolation = {
  justifyContent: "center",
  textAlign: "center",
};

const styles = {
  root,
  center,
};

export default styles;
