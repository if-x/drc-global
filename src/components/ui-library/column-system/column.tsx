import * as React from "react";

import styles, { colWidth } from "./column.styles";

export type ColSpan = 1 | 1.5 | 2 | 2.4 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 12;

interface ColumnProps {
  isInline?: boolean;
  inlineWidth?: number;
  spanXs?: ColSpan;
  spanSm?: ColSpan;
  spanMd?: ColSpan;
  spanLg?: ColSpan;
  isNarrowMargin?: boolean;
  isNoMarginBottom?: boolean;
  children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = (props) => {
  const {
    isInline,
    inlineWidth,
    spanXs,
    spanSm,
    spanMd,
    spanLg,
    isNarrowMargin,
    isNoMarginBottom,
    children,
  } = props;

  const columnStyles = [
    styles.column,
    colWidth({ spanXs, spanSm, spanMd, spanLg }),
    isNarrowMargin && styles.narrowMargin,
    isInline && styles.inline(inlineWidth),
    isNoMarginBottom && styles.noMargin,
  ];

  return <div css={columnStyles}>{children}</div>;
};

export default Column;
