import * as React from "react";

import { Interpolation } from "@emotion/core";
import styles from "./container.styles";

interface ContainerProps {
  id?: string;
  fullWidthOnMobile?: boolean;
  css?: Interpolation;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  fullWidthOnMobile,
  className,
  ...otherProps
}) => {
  return (
    <div
      css={[styles.root, !fullWidthOnMobile && styles.margin]}
      className={className}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Container;
