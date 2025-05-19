import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "default" | "primary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
}

export function Button({ children, className, variant = "default", ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className || ""}`} {...props}>
      {children}
    </button>
  );
}
