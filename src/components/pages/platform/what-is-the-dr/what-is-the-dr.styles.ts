import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../types/theme";
import { grid } from "../../../ui-library/design-tokens/grid";

const paragraph = (theme: Theme): Interpolation => ({
  color: theme.text,
  marginBottom: grid(2),

  ":last-of-type": {
    marginBottom: 0,
  },

  a: {
    textDecoration: "underline",
  },
});

const link: Interpolation = {
  textDecoration: "underline",
};

const styles = {
  paragraph,
  link,
};

export default styles;
