"use client";

import { gql } from "@/__generated__/gql";
import { DeploymentStatus as DeploymentStatusEnum } from "@/__generated__/graphql";
import { DeploymentStatus } from "@/app/project/[id]/DeploymentStatus";
import styles from "./Deployment.module.css";
import { ProjectPageDeploymentInfoFragment } from "@/__generated__/graphql";
import { BsThreeDotsVertical } from "react-icons/bs";

// Mapping for ordering deployments by their status.
const DeploymentStatusOrder = {
  [DeploymentStatusEnum.Success]: 0,
  [DeploymentStatusEnum.Failed]: 1,
  [DeploymentStatusEnum.Building]: 2,
  [DeploymentStatusEnum.Deploying]: 3,
  [DeploymentStatusEnum.Removing]: 4,
  [DeploymentStatusEnum.Sleeping]: 5,
  [DeploymentStatusEnum.Skipped]: 6,
  [DeploymentStatusEnum.Crashed]: 7,
  [DeploymentStatusEnum.Queued]: 8,
  [DeploymentStatusEnum.NeedsApproval]: 9,
  [DeploymentStatusEnum.Initializing]: 10,
  [DeploymentStatusEnum.Waiting]: 11,
  [DeploymentStatusEnum.Removed]: 12,
};

/**
 * Sorts deployments by status and then by date. Ideally we'd be doing this on
 * the server via a GQL endpoint that does the sorting.
 */
export function sortDeployments(
  a: ProjectPageDeploymentInfoFragment,
  b: ProjectPageDeploymentInfoFragment
) {
  if (a.status !== b.status) {
    return DeploymentStatusOrder[a.status] - DeploymentStatusOrder[b.status];
  }

  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

gql(`
  fragment ProjectPageDeploymentInfo on Deployment {
    id
    creator {
      id
      avatar
      name
    }
    service {
      id
      name
      icon
    }
    status
    url
    staticUrl
    createdAt
    updatedAt
  }
`);

interface DeploymentProps {
  deployment: ProjectPageDeploymentInfoFragment;
}

export function Deployment({ deployment }: DeploymentProps) {
  return (
    <div className={styles.deploymentCard}>
      <div className={styles.topRow}>
        <div className={styles.topRowLeft}>
          <DeploymentStatus status={deployment.status} />
          {deployment.creator?.avatar && (
            // Don't try to optimize remotely hosted icon images.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={deployment.creator.avatar}
              alt={deployment.creator.name || ""}
              className={styles.avatar}
              width={28}
              height={28}
            />
          )}
          <span className={styles.serviceGroup}>
            <span className={styles.serviceName}>{deployment.service.name}</span>
          </span>
        </div>
        <div className={styles.topRowRight}>
          <div className={styles.date}>
            Updated {new Date(deployment.updatedAt).toLocaleTimeString()}
          </div>
          <button
            className={styles.menuButton}
            aria-label="Open menu"
            onClick={() =>
              alert(
                "Coming soon :). This demo is focused on project creation vs deployment management."
              )
            }
          >
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>
      <div>
        {deployment.staticUrl ? (
          <a
            href={`https://${deployment.staticUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.deploymentUrl}
          >
            {deployment.staticUrl}
          </a>
        ) : (
          <p>No deployment URL</p>
        )}
      </div>
    </div>
  );
}
