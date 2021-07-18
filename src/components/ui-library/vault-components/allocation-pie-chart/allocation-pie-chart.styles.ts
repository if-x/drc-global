import { Interpolation } from "@emotion/core";
import { Fonts } from "../../design-tokens/fonts";
import { grid } from "../../design-tokens/grid";

const percentageChartContainer: Interpolation = {
  position: "relative",
};

const legendContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: grid(2.5),
};

const legendItem: Interpolation = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: grid(5),
  fontSize: 14,
  textAlign: "center",
  marginLeft: grid(2),
  marginRight: grid(2),
};

const indicator: Interpolation = {
  width: grid(2),
  height: grid(2),
  borderRadius: "50%",
  marginBottom: grid(1),
};

const largeLegendItem: Interpolation = {
  width: grid(11),
};

const percentage: Interpolation = {
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 20,
  fontWeight: Fonts.Weight.Bold,
};

const styles = {
  percentageChartContainer,
  legendContainer,
  legendItem,
  indicator,
  largeLegendItem,
  percentage,
};

export default styles;
