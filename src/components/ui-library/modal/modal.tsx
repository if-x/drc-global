import * as React from "react";
import { Portal } from "react-portal";
import Image from "../image/image";
import CloseIcon from "../../../images/icons/close-icon.svg";
import { useClickOut } from "../../../hooks/use-click-out";
import styles from "./modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = React.useRef<HTMLDivElement>(null);

  const [isMounted, setMounted] = React.useState<boolean>(isOpen);

  React.useEffect(() => {
    if (isOpen !== isMounted) {
      if (isOpen) {
        setMounted(isOpen);
      } else {
        setTimeout(() => {
          setMounted(isOpen);
        }, 300);
      }
    }
  }, [isOpen, isMounted]);

  useClickOut({ ref: modalRef, callback: onClose });

  return isMounted ? (
    <Portal>
      <div css={[styles.backdrop, { opacity: isOpen ? 1 : 0 }]}>
        <div ref={modalRef} css={styles.container}>
          <div
            role="button"
            aria-label="Close"
            css={styles.closeButton}
            onClick={onClose}
          >
            <Image src={CloseIcon} alt="Close" />
          </div>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
