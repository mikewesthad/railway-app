import { IoArrowBack } from "react-icons/io5";
import styles from "./BackButtonLink.module.css";
import Link from "next/link";

interface BackLinkProps {
  href: string;
}

export function BackButtonLink({ href }: BackLinkProps) {
  return (
    <Link href={href} className={styles.backButton}>
      <IoArrowBack size={20} />
      <span>Back</span>
    </Link>
  );
}
