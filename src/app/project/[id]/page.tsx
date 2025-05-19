"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";
import { useState } from "react";
import { DeleteModal } from "./DeleteModal";
import { Deployment, sortDeployments } from "./Deployment";

const PROJECT_QUERY = gql(`
  query ProjectPageGet($id: String!) {
    project(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      deletedAt
      isPublic
      deployments(first: 10) {
        edges {
          node {
            id
            ...ProjectPageDeploymentInfo
          }
        }
      }
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
          }
        }
      }
    }
  }
`);

export default function ProjectPage() {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(PROJECT_QUERY, {
    variables: { id: params.id },
    // TODO: this is a terrible hack to get a live list of deployments. This
    // should use a subscription to only query the updates needed.
    // pollInterval: 5000,
  });

  const project = data?.project;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {loading ? <LoadingSpinner /> : null}
        {error ? <p>Error: {error.message}</p> : null}
        {project ? (
          <>
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <h1>{project.name}</h1>
                <div className={styles.statusPills}>
                  {project.deletedAt && <Pill variant="red">Deleted</Pill>}
                  <Pill>{project.isPublic ? "Public" : "Private"}</Pill>
                </div>
              </div>
              <div className={styles.dates}>
                <span className={styles.date}>
                  Last updated{" "}
                  {new Date(project?.updatedAt ?? project?.createdAt ?? "").toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Description</h2>
              <p>{project.description || "No description provided"}</p>
              <div>
                <Button
                  disabled={project.deletedAt}
                  variant="danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete project
                </Button>
              </div>
            </div>

            {project.deployments.edges.length > 0 && (
              <div className={styles.section}>
                <h2>Deployments</h2>
                <ul className={styles.deploymentList}>
                  {project.deployments.edges
                    .slice()
                    .sort((a, b) => sortDeployments(a.node, b.node))
                    .map(({ node }) => (
                      <li key={node.id}>
                        <Deployment deployment={node} />
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className={styles.section}>
              <h2>Services</h2>
              <ul className={styles.serviceList}>
                {project.services.edges.map(({ node: service }) => (
                  <li key={service.id} className={styles.service}>
                    {service.icon && (
                      // Don't try to optimize remotely hosted icon images.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={service.icon}
                        alt=""
                        className={styles.serviceIcon}
                        width={24}
                        height={24}
                      />
                    )}
                    <span>{service.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <h2>Environments</h2>
              <ul className={styles.environmentList}>
                {project.environments.edges.map(({ node: env }) => (
                  <li key={env.id} className={styles.environment}>
                    <span>{env.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DeleteModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              projectId={project.id}
              projectName={project.name}
            />
          </>
        ) : null}
      </main>
    </div>
  );
}
