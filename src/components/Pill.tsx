import { ReactNode } from "react";
import styles from "./Pill.module.css";

type PillVariant = "default" | "red";

interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}

export function Pill({ children, variant = "default", className = "" }: PillProps) {
  return <span className={`${styles.pill} ${styles[variant]} ${className}`}>{children}</span>;
}
