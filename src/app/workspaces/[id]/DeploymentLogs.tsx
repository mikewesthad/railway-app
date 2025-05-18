import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import styles from "./DeploymentLogs.module.css";
import { useState } from "react";

const BUILD_LOGS_QUERY = gql(`
  query BuildLogs($deploymentId: String!) {
    buildLogs(deploymentId: $deploymentId) {
      message
      timestamp
      severity
    }
  }
`);

export function DeploymentLogs({ deploymentId }: { deploymentId: string }) {
  const { data, loading, error } = useQuery(BUILD_LOGS_QUERY, {
    variables: { deploymentId },
  });
  const [explanation, setExplanation] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const copyToClipboard = () => {
    if (!data?.buildLogs) return;

    const logText = data.buildLogs
      .map((log) => `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`)
      .join("\n");

    navigator.clipboard.writeText(logText);
  };

  const analyzeLogs = async () => {
    if (!data?.buildLogs) return;

    setAnalyzing(true);
    try {
      const logText = data.buildLogs
        .map((log) => `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.message}`)
        .join("\n");

      const response = await fetch("/api/explainFailingBuild", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logs: logText }),
      });

      const result = await response.json();
      setExplanation(result.explanation);
    } catch (error) {
      console.error("Failed to analyze logs:", error);
      setExplanation("Failed to analyze logs. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading logs...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error loading logs: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonGroup}>
        <button onClick={copyToClipboard} className={styles.button}>
          Copy Logs
        </button>
        <button onClick={analyzeLogs} className={styles.button} disabled={analyzing}>
          {analyzing ? "Analyzing..." : "Analyze Failure"}
        </button>
      </div>
      {explanation && <div className={styles.explanation}>{explanation}</div>}
      <div className={styles.logs}>
        {data?.buildLogs.map((log, index) => (
          <div
            key={`${log.timestamp}-${index}`}
            className={`${styles.logLine} ${log.severity ? styles[log.severity] : ""}`}
          >
            <span className={styles.timestamp}>{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span className={styles.message}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
