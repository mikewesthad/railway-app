"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";
import { ProjectCard } from "./ProjectCard";
import { ButtonLink } from "@/components/ButtonLink";
import { useParams } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { FaPlus } from "react-icons/fa6";

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
    <main className={styles.main}>
      {loading ? <LoadingSpinner /> : null}
      {error ? <p>Error: {error.message}</p> : null}
      {data ? (
        <>
          <div className={styles.header}>
            <h1>{data.workspace.name}</h1>
            <ButtonLink
              variant="primary"
              href={`/create?teamId=${data.workspace.team ? data.workspace.team.id : ""}`}
              leftIcon={<FaPlus />}
            >
              Create Project
            </ButtonLink>
          </div>
          <div className={styles.projectGrid}>
            {data.workspace.team?.projects?.edges &&
            data.workspace.team?.projects?.edges.length > 0 ? (
              data.workspace.team?.projects?.edges.map((project) => (
                <ProjectCard key={project.node.id} project={project.node} />
              ))
            ) : (
              <p>No projects found. Try creating one!</p>
            )}
          </div>
        </>
      ) : null}
    </main>
  );
}
