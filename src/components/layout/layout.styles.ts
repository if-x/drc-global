import { Interpolation } from "@emotion/core";
import { Fonts } from "../ui-library/design-tokens/fonts";
import { grid } from "../ui-library/design-tokens/grid";
import { Device } from "../ui-library/design-tokens/media-queries";
import { Theme } from "../../../types/theme";

/*
 * Base styles
 * ========================================================================== */

export const globalStyle = (theme: Theme): Interpolation => ({
  "html, body, div, article, aside, details, footer, header, section, applet, iframe, embed, object, h1, h2, h3, h4, h5, h6, hgroup, blockquote, p, pre, span, a, abbr, acronym, address, big, cite, code, del, dfn, ins, kbd, q, ruby, s, samp, small, strike, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, label, legend, fieldset, form, table, caption, tbody, tfoot, thead, tr, th, td, img, figure, figcaption, menu, nav, output, summary, time, mark, canvas, audio, video":
    {
      margin: "0",
      padding: "0",
      border: "0",
      font: "inherit",
      verticalAlign: "baseline",
    },

  html: {
    fontFamily: `${Fonts.Family} !important`,
    boxSizing: "border-box",
    minHeight: "100vh",
    MozOsxFontSmoothing: "grayscale",
  },

  body: {
    fontFamily: Fonts.Family,
    color: theme.foreground,
    background: theme.background,
    fontSize: "16px",
    lineHeight: 1.5,
    position: "relative",
    WebkitFontSmoothing: "antialiased",
  },

  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
    {
      display: "block",
    },

  a: {
    color: theme.foreground,
    textDecoration: "none",
  },

  "blockquote, p": {
    quotes: "none",
  },

  "blockquote::before, blockquote::after, q::before, q::after": {
    content: `""`,
  },

  table: {
    borderCollapse: "collapse",
    borderSpacing: "0",
  },

  "*, *::before, *::after": {
    fontFamily: "inherit",
    boxSizing: "inherit",
  },

  "button, input, optgroup, select, textarea": {
    fontFamily: Fonts.Family,
  },

  input: {
    margin: "0",
  },

  "input::-ms-clear": {
    display: "none",
    width: "0",
    height: "0",
  },

  "input::-webkit-clear-button": {
    WebkitAppearance: "none",
    display: "none",
    width: "0",
    height: "0",
  },

  "input::-webkit-search-cancel-button": {
    display: "none",
    width: "0",
    height: "0",
  },

  /*
   * A better looking default horizontal rule
   */

  hr: {
    display: "block",
    height: "1px",
    border: "0",
    borderTop: `1px solid ${theme.border}`,
    margin: "20px 0",
    padding: "0",
  },

  /*
   * Remove the gap between audio, canvas, iframes,
   * images, videos and the bottom of their containers:
   * https://github.com/h5bp/html5-boilerplate/issues/440
   */

  "audio, canvas, iframe, img, svg, video": {
    verticalAlign: "middle",
  },

  /*
   * Remove default fieldset styles.
   */

  fieldset: {
    border: "0",
    margin: "0",
    padding: "0",
  },

  /*
   * Allow only vertical resizing of textareas.
   */

  textarea: {
    resize: "vertical",
  },

  "@media print": {
    ["*, *::before, *::after"]: {
      background: "transparent !important",
      color: "#000 !important",
      boxShadow: "none !important",
      textShadow: "none !important",
    },

    ["a, a:visited"]: {
      textDecoration: "underline",
    },

    ["a[href]::after"]: {
      content: " (' attr(href) ')",
    },

    ["abbr[title]::after"]: {
      content: " (' attr(title) ')",
    },

    [`a[href^='#']::after, a[href^='javascript:']::after`]: {
      content: `""`,
    },

    ["pre, blockquote"]: {
      border: "1px solid #999",
      pageBreakInside: "avoid",
    },

    ["thead"]: {
      display: "table-header-group",
    },

    ["tr, img"]: {
      pageBreakInside: "avoid",
    },

    ["img"]: {
      maxWidth: "100% !important",
    },

    ["p, h2, h3"]: {
      orphans: 3,
      widows: 3,
    },

    ["h2, h3"]: {
      pageBreakAfter: "avoid",
    },
  },
});

const content: Interpolation = {
  minHeight: "calc(100vh - 200px)",
  paddingTop: grid(3),
  paddingBottom: grid(5),

  [Device.DesktopTablet]: {
    paddingTop: grid(4),
    paddingBottom: grid(8),
  },
};

export const styles = {
  content,
};
