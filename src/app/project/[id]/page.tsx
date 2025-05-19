"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";

const PROJECT_QUERY = gql(`
  query Project($id: String!) {
    project(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      isPublic
      services {
        edges {
          node {
            id
            name
            icon
          }
        }
      }
      environments {
        edges {
          node {
            id
            name
            isEphemeral
          }
        }
      }
    }
  }
`);

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { data, loading, error } = useQuery(PROJECT_QUERY, {
    variables: { id: params.id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.project) return <div>Project not found</div>;

  const project = data.project;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>{project.name}</h1>
          <span className={styles.date}>
            Created {new Date(project.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className={styles.section}>
          <h2>Description</h2>
          <p>{project.description || "No description provided"}</p>
        </div>

        <div className={styles.section}>
          <h2>Services</h2>
          <div className={styles.serviceList}>
            {project.services.edges.map((service) => (
              <div key={service.node.id} className={styles.service}>
                {service.node.icon && (
                  <img
                    src={service.node.icon}
                    alt=""
                    className={styles.serviceIcon}
                    width={24}
                    height={24}
                  />
                )}
                <span>{service.node.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Environments</h2>
          <div className={styles.environmentList}>
            {project.environments.edges.map((env) => (
              <div key={env.node.id} className={styles.environment}>
                <span>{env.node.name}</span>
                {env.node.isEphemeral && <span className={styles.ephemeral}>Ephemeral</span>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
