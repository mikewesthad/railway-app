import { VisuallyHidden } from "react-aria";
import styles from "./LoadingSpinner.module.css";

export function LoadingSpinner({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <div className={`${styles.loader} ${className}`} style={{ width: size, height: size }}>
      <VisuallyHidden>Loading</VisuallyHidden>
    </div>
  );
}
