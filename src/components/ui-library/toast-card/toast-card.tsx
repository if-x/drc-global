import * as React from "react";
import { Portal } from "react-portal";
import AnimateHeight from "react-animate-height";
import { SiteContext } from "../../../site-context/site-context";
import { Colors } from "../design-tokens/colors";
import styles from "./toast-card.styles";

interface ToastCardProps {
  isVisible?: boolean;
}

const ToastCard: React.FC<ToastCardProps> = ({ isVisible, children }) => {
  const { isDarkMode } = React.useContext(SiteContext);

  return (
    <Portal>
      <div css={styles.root}>
        <AnimateHeight duration={500} height={isVisible ? "auto" : 0}>
          <div
            css={[
              styles.card,
              {
                backgroundColor: isDarkMode
                  ? Colors.DarkModeOffBlack
                  : Colors.White,
              },
            ]}
          >
            {children}
          </div>
        </AnimateHeight>
      </div>
    </Portal>
  );
};

export default ToastCard;
