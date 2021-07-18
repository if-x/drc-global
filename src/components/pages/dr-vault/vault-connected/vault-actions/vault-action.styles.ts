import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { grid } from "../../../../ui-library/design-tokens/grid";

const deaktopHeadings: Interpolation = {
  display: "flex",
  marginBottom: grid(2.5),
  "> *": {
    flex: 1,
  },
};

const desktopContainer = (theme: Theme): Interpolation => ({
  display: "flex",
  border: `1px solid ${theme.border}`,
  borderTop: `5px solid ${theme.foreground}`,
  borderRadius: 2,

  "> *": {
    width: "50%",
    flexShrink: 1,
    flexGrow: 1,
    height: "100%",
  },

  "> div:first-of-type": {
    borderRight: `1px solid ${theme.border}`,
  },
});

const mobileContainer = (theme: Theme): Interpolation => ({
  borderTop: `5px solid ${theme.foreground}`,
});

const styles = {
  deaktopHeadings,
  desktopContainer,
  mobileContainer,
};

export default styles;
