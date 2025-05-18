import Link from "next/link";
import styles from "./ButtonLink.module.css";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ButtonLink({ href, children, className }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${styles.buttonLink} ${className || ""}`}>
      {children}
    </Link>
  );
}
