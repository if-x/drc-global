import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../design-tokens/grid";

const root: Interpolation = {
  position: "relative",
  paddingTop: grid(3),
};

const logo: Interpolation = {
  position: "absolute",
  top: 0,
  left: "calc(50% - 30px)",
  width: grid(6),
  height: grid(6),
  zIndex: 1,
};

const card = (theme: Theme): Interpolation => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  border: `1px solid ${theme.border}`,
  borderTop: `5px solid ${theme.foreground}`,
  borderRadius: 2,
});

const cardPadding: Interpolation = {
  padding: `${grid(5)} ${grid(2)} ${grid(4)}`,
};

const noBottomBorder: Interpolation = {
  borderBottom: 0,
};

const styles = {
  root,
  logo,
  card,
  cardPadding,
  noBottomBorder,
};

export default styles;
