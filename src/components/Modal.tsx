import {
  Dialog,
  DialogProps,
  Modal as AriaModal,
  ModalOverlay,
  Button,
  Heading,
} from "react-aria-components";
import styles from "./Modal.module.css";
import { MdClose } from "react-icons/md";

interface ModalProps extends DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "800px",
  ...props
}: ModalProps) {
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
      <AriaModal className={styles.modal} style={{ maxWidth }}>
        <Dialog {...props} className={styles.dialog}>
          <div className={styles.header}>
            <Heading slot="title" level={2} className={styles.title}>
              {title}
            </Heading>
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
