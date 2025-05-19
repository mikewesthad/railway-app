import styles from "./ProjectCard.module.css";
import { gql } from "@/__generated__/gql";
import NextLink from "next/link";
import { ProjectCardFragment } from "@/__generated__/graphql";
import { Pill } from "@/components/Pill";
import { FaLink } from "react-icons/fa6";
import Link from "@/components/Link";

gql(`
  fragment ProjectCard on Project {
    id
    createdAt
    updatedAt
    deletedAt
    description
    name
    isPublic
    services {
      edges {
        node {
          id
          name
          icon
          templateThreadSlug
          updatedAt
          deployments {
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
        }
      }
    }
  }
`);

interface ProjectCardProps {
  project: ProjectCardFragment;
}

function getSuccessfulDeploymentUrls(project: ProjectCardFragment) {
  return project.services.edges
    .map((edge) =>
      edge.node.deployments.edges.find((deployment) => deployment.node.status === "SUCCESS")
    )
    .map((deployment) => {
      if (deployment?.node.staticUrl) {
        return {
          id: deployment?.node.id,
          url: deployment?.node.staticUrl,
          fullUrl: `https://${deployment?.node.staticUrl}`,
        };
      }
    })
    .filter((url) => url !== undefined);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const deployments = getSuccessfulDeploymentUrls(project);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <NextLink
            href={`/project/${project.id}`}
            className={`${styles.title} ${styles.stretchedLink}`}
          >
            {project.name}
          </NextLink>
          {project.deletedAt && <Pill variant="red">Deleted</Pill>}
        </div>
        <span className={styles.date}>
          Updated {new Date(project.updatedAt).toLocaleDateString()}
        </span>
      </div>
      {deployments.length > 0 ? (
        deployments.map((d) => (
          <Link key={d.id} href={d.fullUrl} className={styles.deploymentLink} target="_blank">
            <FaLink />
            <span>{d.url}</span>
          </Link>
        ))
      ) : (
        <span>No deployments</span>
      )}
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
              />
            )}
            {service.node.name}
          </span>
        ))}
      </div>
    </div>
  );
}
