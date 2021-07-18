import { FontWeightProperty } from "csstype";
import { useTheme } from "emotion-theming";
import * as React from "react";
import { Theme } from "../../../../types/theme";

import { DeviceMargin, getMarginValue } from "../design-tokens/margin-helper";
import {
  DeviceTextAlign,
  DeviceTextSize,
  getResponsiveTextAlign,
  getResponsiveTextSize,
  TextAlignType,
} from "./text-helper";

export interface ElementProps extends React.HTMLProps<HTMLElement> {
  component?: keyof React.ReactHTML;
}

export interface TextProps extends ElementProps {
  textSize?: DeviceTextSize | number;
  textAlign?: DeviceTextAlign | TextAlignType;
  type?: "primary" | "secondary";
  weight?: FontWeightProperty;
  margin?: DeviceMargin;
}

const Element: React.FC<ElementProps> = ({ component, ...otherProps }) =>
  React.createElement(component || "span", otherProps);

const Text = (props: TextProps) => {
  const {
    textSize,
    textAlign,
    type = "primary",
    weight,
    margin,
    className,
    component,
    ...otherProps
  } = props;

  const theme = useTheme<Theme>();

  const textSizeValue = getResponsiveTextSize(textSize);
  const textAlignValue = getResponsiveTextAlign(textAlign);

  const marginValue = getMarginValue(margin);

  return (
    <Element
      css={[
        textSizeValue,
        type === "secondary" && { color: theme.text },
        textAlignValue,
        marginValue,
        !!weight && { fontWeight: weight },
      ]}
      className={className}
      component={component}
      {...otherProps}
    />
  );
};

export default Text;
