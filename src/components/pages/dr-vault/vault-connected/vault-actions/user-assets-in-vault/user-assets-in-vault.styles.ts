import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../../types/theme";
import { grid } from "../../../../../ui-library/design-tokens/grid";

const assetContainer = (theme: Theme): Interpolation => ({
  height: grid(9),
  paddingLeft: grid(2),
  paddingRight: grid(2),
  borderBottom: `1px solid ${theme.border}`,
});

const content: Interpolation = {
  padding: `${grid(2)} ${grid(2.5)} ${grid(4)}`,
};

const headingContainer: Interpolation = {
  textAlign: "center",
  marginBottom: grid(2.5),
};

const styles = {
  assetContainer,
  content,
  headingContainer,
};

export default styles;
