"use client";

import { gql } from "@/__generated__/gql";
import { DeploymentStatus as DeploymentStatusEnum } from "@/__generated__/graphql";
import { DeploymentStatus } from "@/app/project/[id]/DeploymentStatus";
import styles from "./Deployment.module.css";
import { ProjectPageDeploymentInfoFragment } from "@/__generated__/graphql";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ImMagicWand } from "react-icons/im";

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

const BUILD_LOGS_QUERY = gql(`
  query BuildLogsGet($deploymentId: String!) {
    buildLogs(deploymentId: $deploymentId) {
      ...BuildLog
    }
  }

  fragment BuildLog on Log {
    message
    timestamp
    severity
  }
`);

interface BuildLog {
  message: string;
  timestamp: string;
  severity?: string | null;
}

interface DeploymentProps {
  deployment: ProjectPageDeploymentInfoFragment;
}

export function Deployment({ deployment }: DeploymentProps) {
  const [showLogs, setShowLogs] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { data: logsData, loading: logsLoading } = useQuery(BUILD_LOGS_QUERY, {
    variables: { deploymentId: deployment.id },
    skip: !showLogs,
  });

  const analyzeLogs = async () => {
    if (!logsData?.buildLogs) return;

    setAnalyzing(true);
    try {
      // TODO: ideally this wouldn't require the client to send the logs to the
      // server. I imagine the AI summary could be generated in a job after a
      // build fails.
      const logText = logsData.buildLogs
        .map((log) => `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`)
        .join("\n")
        .slice(-3000);

      const response = await fetch("/api/explainFailingBuild", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logs: logText }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze logs");
      }

      const result = await response.json();
      setExplanation(result.explanation);
    } catch (error) {
      console.error("Failed to analyze logs:", error);
      setExplanation("Failed to analyze logs. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

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
      {deployment.status === "FAILED" ? (
        <div className={styles.errorSection}>
          {!showLogs ? (
            <Button onClick={() => setShowLogs(true)}>View Logs</Button>
          ) : (
            <div className={styles.logsContainer}>
              {logsLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <div className={styles.logsHeader}>
                    <Button onClick={() => setShowLogs(false)}>Hide Logs</Button>
                    <Button
                      leftIcon={analyzing ? <LoadingSpinner /> : <ImMagicWand />}
                      onClick={analyzeLogs}
                      disabled={analyzing}
                    >
                      Explain Error
                    </Button>
                  </div>
                  {explanation && (
                    <div className={styles.explanation}>
                      <strong>Error Analysis:</strong> {explanation}
                    </div>
                  )}
                  <div className={styles.logs}>
                    {logsData?.buildLogs.map((log: BuildLog, index: number) => (
                      <div key={`${log.timestamp}-${index}`} className={`${styles.logLine}`}>
                        <span className={styles.timestamp}>
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                        <span className={styles.message}>{log.message}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
