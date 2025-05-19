import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "default",
  leftIcon,
  ...props
}: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className || ""}`} {...props}>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children}
    </button>
  );
}
