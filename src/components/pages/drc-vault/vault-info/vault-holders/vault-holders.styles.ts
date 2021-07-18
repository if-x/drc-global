import { Interpolation } from "@emotion/core";
import { Theme } from "../../../../../../types/theme";
import { Fonts } from "../../../../ui-library/design-tokens/fonts";
import { grid } from "../../../../ui-library/design-tokens/grid";
import { Device } from "../../../../ui-library/design-tokens/media-queries";

const tableContainer: Interpolation = {
  [Device.Mobile]: {
    overflow: "auto",
    marginLeft: grid(-2),
    marginRight: grid(-2),
    paddingLeft: grid(2),
  },
};

const table = (theme: Theme): Interpolation => ({
  width: "100%",
  minWidth: grid(58),

  thead: {
    th: {
      fontSize: 18,
      fontWeight: Fonts.Weight.Bold,
      textAlign: "left",
      paddingLeft: grid(1.5),
      paddingRight: grid(1.5),
      paddingBottom: grid(2),
      borderBottom: `1px solid ${theme.border}`,
      ":first-of-type": {
        paddingLeft: 0,
      },
      ":last-of-type": {
        paddingRight: 0,
      },
      [Device.Mobile]: {
        paddingLeft: grid(1),
        paddingRight: grid(1),
      },
    },
  },

  tbody: {
    tr: {
      ":first-of-type": {
        td: {
          paddingTop: grid(3),
        },
      },
    },
    td: {
      padding: grid(1.5),
      paddingBottom: grid(1),
      ":first-of-type": {
        paddingLeft: 0,
      },
      ":last-of-type": {
        paddingRight: 0,
      },
      [Device.Mobile]: {
        paddingLeft: grid(1),
        paddingRight: grid(1),
      },
    },
  },
});

const indexCell: Interpolation = {
  display: "flex",
  alignItems: "center",
};

const gen00 = (theme: Theme): Interpolation => ({
  display: "inline-block",
  width: 0,
  height: 0,
  border: "4.5px solid transparent",
  borderBottom: `6px solid ${theme.text}`,
  position: "relative",
  top: "-5px",

  "::after": {
    content: `''`,
    position: "absolute",
    left: "-4.5px",
    top: "6px",
    width: 0,
    height: 0,
    border: "4.5px solid transparent",
    borderTop: `6px solid ${theme.text}`,
  },
});

const gen01 = (theme: Theme): Interpolation => ({
  display: "inline-block",
  width: 9,
  height: 9,
  backgroundColor: theme.text,
  borderRadius: "50%",
});

const yourDrc: Interpolation = {
  fontWeight: Fonts.Weight.Bold,
};

const progressBar = (theme: Theme): Interpolation => ({
  height: 3,
  backgroundColor: theme.secondaryBackground,
  borderRadius: 3,
  overflow: "hidden",
  marginTop: 3,

  "> div": {
    height: "100%",
    backgroundColor: theme.foreground,
  },
});

const toggleButton: Interpolation = {
  display: "flex",
  justifyContent: "center",
  marginTop: grid(2.5),
};

const button: Interpolation = {
  width: "100%",
  [Device.DesktopTablet]: {
    maxWidth: grid(30),
  },
};

const legendContainer: Interpolation = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: grid(2.5),
};

const styles = {
  tableContainer,
  table,
  indexCell,
  gen00,
  gen01,
  yourDrc,
  progressBar,
  toggleButton,
  button,
  legendContainer,
};

export default styles;
