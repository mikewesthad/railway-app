import { ComponentProps } from "react";
import Link from "next/link";
import styles from "./ButtonLink.module.css";

type ButtonVariant = "default" | "primary" | "danger";

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
}

export function ButtonLink({
  children,
  className,
  variant = "default",
  leftIcon,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${styles.buttonLink} ${styles[variant]} ${className || ""}`} {...props}>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      {children}
    </Link>
  );
}
