import styles from "./ProjectCard.module.css";
import { gql } from "@/__generated__/gql";
import { DeploymentStatus } from "./DeploymentStatus";
import Link from "next/link";
import { ProjectCardFragment } from "@/__generated__/graphql";
import { Pill } from "@/components/Pill";

gql(`
  fragment ProjectCard on Project {
    id
    createdAt
    updatedAt
    deletedAt
    description
    name
    isPublic
    # TODO: This isn't 100% right. The goal is to find the last deployment URL 
    # to expose a link & status from the dashboard. Likely the better way is to
    # use the deployments query, which provides filtering for status and
    # environment.
    deployments(first: 1) {
      edges {
        node {
          id
          url
          status
          staticUrl
          createdAt
          
        }
      }
    }
    services {
      edges {
        node {
          id
          name
          icon
          templateThreadSlug
          updatedAt
        }
      }
    }
  }
`);

interface ProjectCardProps {
  project: ProjectCardFragment;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const deployment = project.deployments?.edges?.[0]?.node;

  return (
    <Link href={`/project/${project.id}`} className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{project.name}</h2>
        {project.deletedAt && <Pill variant="red">Deleted</Pill>}
        <span className={styles.date}>
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </span>
      </div>
      {deployment && <DeploymentStatus status={deployment.status} />}
      {deployment?.staticUrl && (
        <a
          href={`https://${deployment.staticUrl}`}
          className={styles.deploymentLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          View Deployment
        </a>
      )}
      <div className={styles.services}>
        <h3 className={styles.servicesTitle}>Services</h3>
        <div className={styles.serviceList}>
          {project.services.edges.map((service) => (
            <span key={service.node.id} className={styles.service}>
              {service.node.icon && (
                // Don't try to optimize remotely hosted icon images.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={service.node.icon}
                  alt=""
                  className={styles.serviceIcon}
                  width={18}
                  height={18}
                  style={{ marginRight: 6, verticalAlign: "middle" }}
                />
              )}
              {service.node.name}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
