import { Interpolation } from "@emotion/core";
import { grid } from "../design-tokens/grid";

const root: Interpolation = {
  display: "flex",

  "> *": {
    flex: 1,
    marginRight: grid(1.5),
  },

  "> *:last-of-type": {
    marginRight: 0,
  },
};

const styles = {
  root,
};

export default styles;
