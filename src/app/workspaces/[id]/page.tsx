"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";
import { ProjectCard } from "./ProjectCard";

const PROJECTS = gql(`
  query MyProjects {
    workspace(workspaceId: "14fc15eb-b61d-47bc-93b0-385d4d2b244b") {
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

// subscription MyQuery($deploymentId: String!) {
//   buildLogs(deploymentId: $deploymentId) {
//     severity
//     message
//   }
// }

// query marketplace {
//   templates(first: 10, recommended: true) {
//     edges {
//       node {
//         id
//         description
//         name
//         # readme
//         category
//         health
//       }
//     }
//   }
// }

export default function WorkspacePage() {
  const { data, loading, error } = useQuery(PROJECTS);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <>
            <h1>{data.workspace.name}</h1>
            <div className={styles.projectGrid}>
              {data.workspace.team?.projects?.edges.map((project) => (
                <ProjectCard key={project.node.id} project={project.node} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
