import NextLink from "next/link";
import styles from "./Link.module.css";
import { ComponentProps } from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
interface LinkProps extends ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <NextLink className={`${styles.link} ${className || ""}`} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
