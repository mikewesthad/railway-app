"use client";

import styles from "./page.module.css";
import { ImMagicWand } from "react-icons/im";
import { IoGrid } from "react-icons/io5";
import { FaGithub, FaCode } from "react-icons/fa";
import Link from "next/link";
import { useTeamId } from "./useTeamId";

function Card({
  href,
  children,
  icon,
  color,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  color?: "pink";
}) {
  const colorClassName = color === "pink" ? styles.cardPink : "";
  return (
    <Link className={styles.card} href={href}>
      <div className={`${styles.cardIcon} ${colorClassName}`}>{icon}</div>
      <div className={styles.cardContent}>{children}</div>
    </Link>
  );
}

export default function CreatePage() {
  const teamId = useTeamId();

  return (
    <main className={styles.main}>
      <h1>What do you want to create?</h1>
      <div className={styles.cards}>
        <Card
          href={`/create/assistant?teamId=${teamId}`}
          icon={<ImMagicWand size={28} />}
          color="pink"
        >
          <h3>Build with Railway assistant</h3>
          <p>Simply describe what you want to deploy and the assistant will create it for you.</p>
        </Card>

        <Card href={`/create/template?teamId=${teamId}`} icon={<IoGrid size={28} />}>
          <h3>Choose an existing template</h3>
          <p>Browse our collection of pre-built templates from the community.</p>
        </Card>

        <Card href={`/create/github?teamId=${teamId}`} icon={<FaGithub size={28} />}>
          <h3>Import a project from GitHub</h3>
          <p>Deploy an existing project from your GitHub repository.</p>
        </Card>

        <Card href={`/create/blank?teamId=${teamId}`} icon={<FaCode size={28} />}>
          <h3>Start from an empty project</h3>
          <p>Create a new project that is completely blank.</p>
        </Card>
      </div>
    </main>
  );
}
