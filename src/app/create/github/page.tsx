"use client";

import { BackButtonLink } from "../components/BackButtonLink";
import { Button } from "@/components/Button";
import styles from "./page.module.css";

export default function GithubPage() {
  return (
    <main className={styles.main}>
      <BackButtonLink href="/create" />
      <h1>Import from GitHub</h1>
      <div className={styles.content}>
        <p>
          Deploy an existing project from your GitHub repository. We&apos;ll scan your code to
          automatically configure the environment for you.
        </p>
        <Button
          onClick={() =>
            alert(
              "Coming soon :). This demo is focused on the assistant flow, so this part of the flow is stubbed out."
            )
          }
        >
          Import from GitHub
        </Button>
      </div>
    </main>
  );
}
