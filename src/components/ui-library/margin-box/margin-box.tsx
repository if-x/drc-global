import * as React from "react";
import { DeviceMargin, getMarginValue } from "../design-tokens/margin-helper";

export interface MarginBoxProps {
  margin: DeviceMargin;
  className?: string;
}

const MarginBox: React.FC<MarginBoxProps> = ({
  margin,
  className,
  children,
}) => {
  const marginValue = getMarginValue(margin);

  return (
    <div css={marginValue} className={className}>
      {children}
    </div>
  );
};

export default MarginBox;
