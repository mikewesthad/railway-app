import {
  Dialog,
  DialogProps,
  Modal as AriaModal,
  ModalOverlay,
  Button,
} from "react-aria-components";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

interface ModalProps extends DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children, ...props }: ModalProps) {
  return (
    <ModalOverlay
      className={styles.overlay}
      isDismissable
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <AriaModal className={styles.modal}>
        <Dialog {...props} className={styles.dialog}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <Button slot="close" className={styles.closeButton}>
              <MdClose size={18} />
            </Button>
          </div>
          <div className={styles.content}>{children}</div>
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  );
}
