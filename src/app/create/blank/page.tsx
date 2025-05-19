"use client";

import styles from "./page.module.css";
import { BackButtonLink } from "../components/BackButtonLink";
import { Button } from "@/components/Button";
import { useTeamId } from "../useTeamId";
import { Suspense } from "react";

export default function BlankProjectPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlankProjectContent />
    </Suspense>
  );
}

function BlankProjectContent() {
  const teamId = useTeamId();

  return (
    <main className={styles.main}>
      <BackButtonLink href={`/create/?teamId=${teamId}`} />
      <h1>Create Blank Project</h1>
      <div className={styles.content}>
        <p>
          Create a new project with no services yet. You&apos;ll be able to add services later
          manually, or using the Railway assistant to help scaffold your project.
        </p>
        <Button
          onClick={() =>
            alert(
              "Coming soon :). This demo is focused on the assistant flow, so this part of the flow is stubbed out."
            )
          }
        >
          Create Blank Project
        </Button>
      </div>
    </main>
  );
}
