import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import * as React from "react";
import { Portal } from "react-portal";

import styles from "./slide-out.styles";

interface SlideOutProps {
  id?: string;
  isOpen?: boolean;
  enableBodyLock?: boolean;
  className?: string;
  isFullWidthOnMobile?: boolean;
  children: React.ReactNode;
  onHide?: () => void;
}

const SlideOut: React.FC<SlideOutProps> = ({
  id,
  isOpen,
  enableBodyLock,
  onHide,
  className,
  isFullWidthOnMobile,
  children,
}) => {
  const slideOutRef = React.useRef<HTMLDivElement>(null);

  const [isSlideOutMounted, setSlideOutMounted] = React.useState<boolean>(
    !!isOpen
  );
  const [isChildrenMounted, setChildrenMounted] = React.useState<boolean>(
    !!isOpen
  );
  const [mountedChildren, setMountedChildren] =
    React.useState<React.ReactNode>(children);

  // Unmount children after slideout is closed
  React.useEffect(() => {
    let unMountTimer: NodeJS.Timeout;

    if (children) {
      if (isOpen) {
        setSlideOutMounted(true);
        setMountedChildren(children);
        unMountTimer = setTimeout(() => {
          setChildrenMounted(true);
        }, 20);
      }

      if (!isOpen) {
        setChildrenMounted(false);
        unMountTimer = setTimeout(() => {
          setSlideOutMounted(false);
          setMountedChildren(null);
        }, 400);
      }
    }

    return () => {
      clearTimeout(unMountTimer);
    };
  }, [isOpen, children]);

  // Lock body scroll when slideout is open
  React.useEffect(() => {
    let bodyLockTimer: NodeJS.Timeout;
    const node = slideOutRef && slideOutRef.current;

    if (node && enableBodyLock) {
      if (isSlideOutMounted) {
        bodyLockTimer = setTimeout(() => {
          disableBodyScroll(node);
        }, 50);
      }

      if (!isSlideOutMounted) {
        bodyLockTimer = setTimeout(() => {
          enableBodyScroll(node);
        }, 50);
      }
    }

    return () => {
      setTimeout(() => {
        const slideOuts = document.getElementsByClassName("slide-out");
        if (Array.from(slideOuts).length === 0) {
          clearAllBodyScrollLocks();
        }
      }, 400);
      clearTimeout(bodyLockTimer);
    };
  }, [enableBodyLock, isSlideOutMounted, slideOutRef]);

  const handleBackDropClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (event.currentTarget === event.target) {
        if (onHide) {
          onHide();
        }
      }
    },
    [onHide]
  );

  return isSlideOutMounted ? (
    <Portal>
      <div
        css={(theme) => [
          styles.backDrop,
          isChildrenMounted && styles.backdropOpen(theme),
        ]}
        onMouseDown={handleBackDropClick}
      >
        <div
          id={id}
          ref={slideOutRef}
          css={(theme) => [
            styles.container(theme),
            isFullWidthOnMobile && styles.fullWidthMobile,
            isChildrenMounted && styles.containerOpen,
          ]}
          className={`slide-out ${className}`}
        >
          {mountedChildren}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default SlideOut;
