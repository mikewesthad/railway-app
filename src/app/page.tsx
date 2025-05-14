"use client";

import styles from "./page.module.css";
import { useQuery, gql } from "@apollo/client";

const MY_ACCOUNT = gql`
  query MyAccount {
    me {
      id
      name
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(MY_ACCOUNT);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Railway App</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>{data?.me?.name}</p>}
      </main>
      <footer className={styles.footer}>
        Made with ❤️ by <a href="https://github.com/mikewesthad">Mike Hadley</a>
      </footer>
    </div>
  );
}
