import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../types/theme";
import { grid } from "../design-tokens/grid";

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

const styles = {
  paragraph,
};

export default styles;
