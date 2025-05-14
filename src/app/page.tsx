import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Railway App</h1>
      </main>
      <footer className={styles.footer}>
        Made with ❤️ by <a href="https://github.com/mikewesthad">Mike Hadley</a>
      </footer>
    </div>
  );
}
