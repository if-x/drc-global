import * as React from "react";
import { DeviceMargin, getMarginValue } from "../design-tokens/margin-helper";

interface SeparatorProps {
  margin?: DeviceMargin;
}

const Separator: React.FC<SeparatorProps> = ({ margin }) => {
  const marginValue = getMarginValue(margin);

  return <hr css={marginValue} />;
};

export default Separator;
