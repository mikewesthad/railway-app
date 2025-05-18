import styles from "./Footer.module.css";
import { MdFavorite } from "react-icons/md";
import { MdCoffee } from "react-icons/md";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Made with <MdFavorite /> <MdCoffee /> by{" "}
      <a href="https://github.com/mikewesthad">Mike Hadley</a>
    </footer>
  );
}
