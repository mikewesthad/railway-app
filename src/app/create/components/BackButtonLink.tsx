import { IoArrowBack } from "react-icons/io5";
import styles from "./BackButtonLink.module.css";
import Link from "next/link";

interface BackLinkProps {
  href: string;
  className?: string;
}

export function BackButtonLink({ href, className }: BackLinkProps) {
  return (
    <Link href={href} className={`${styles.backButton} ${className}`}>
      <IoArrowBack size={20} />
      <span>Back</span>
    </Link>
  );
}
