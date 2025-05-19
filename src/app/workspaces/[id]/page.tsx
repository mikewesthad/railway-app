"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";
import { ProjectCard } from "./ProjectCard";
import { ButtonLink } from "@/components/ButtonLink";
import { useParams } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const PROJECTS = gql(`
  query MyProjects($workspaceId: String!) {
    workspace(workspaceId: $workspaceId) {
      name
      team {
        id
        projects {
          edges {
            node {
              id
              ...ProjectCard
            }
          }
        }
      }
    }
  }
`);

export default function WorkspacePage() {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(PROJECTS, {
    variables: {
      workspaceId: params.id,
    },
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {loading ? <LoadingSpinner /> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {data ? (
          <>
            <div className={styles.header}>
              <h1>{data.workspace.name}</h1>
              <ButtonLink href="/create">Create Project</ButtonLink>
            </div>
            <div className={styles.projectGrid}>
              {data.workspace.team?.projects?.edges.map((project) => (
                <ProjectCard key={project.node.id} project={project.node} />
              ))}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
