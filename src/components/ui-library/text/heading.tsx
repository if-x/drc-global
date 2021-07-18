import * as React from "react";

import { DeviceMargin } from "../design-tokens/margin-helper";
import { Fonts } from "../design-tokens/fonts";
import Text from "./text";
import { DeviceTextAlign, TextAlignType } from "./text-helper";

type HeadingComponent = "h1" | "h2" | "h3" | "h4";
export type HeadingSizes = "large" | "standard" | "small";

const getHeadingSize = (size: HeadingSizes) => {
  let textSize = { desktop: 24, mobile: 24 };

  if (size === "large") {
    textSize = { desktop: 28, mobile: 28 };
  }

  if (size === "small") {
    textSize = { desktop: 24, mobile: 20 };
  }

  return textSize;
};

const getHeadingComponent = (
  size: HeadingSizes,
  component?: HeadingComponent
): HeadingComponent => {
  let htmlComponent: HeadingComponent = "h3";

  if (size === "large") {
    htmlComponent = "h2";
  }

  if (size === "small") {
    htmlComponent = "h4";
  }

  return component || htmlComponent;
};

export interface HeadingProps {
  id?: string;
  component?: HeadingComponent;
  size?: HeadingSizes;
  textAlign?: DeviceTextAlign | TextAlignType;
  margin?: DeviceMargin;
}

const Heading: React.FC<HeadingProps> = ({
  component,
  size = "standard",
  children,
  ...otherProps
}) => {
  return (
    <Text
      component={getHeadingComponent(size, component)}
      textSize={getHeadingSize(size)}
      weight={Fonts.Weight.Bold}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

export default Heading;
