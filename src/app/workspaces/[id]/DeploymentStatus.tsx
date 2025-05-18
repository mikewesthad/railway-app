import { DeploymentStatus as DeploymentStatusEnum } from "@/__generated__/graphql";
import styles from "./DeploymentStatus.module.css";
import { BsGlobe } from "react-icons/bs";

export function DeploymentStatus({ status }: { status: DeploymentStatusEnum }) {
  const getStatusStyle = (status: DeploymentStatusEnum) => {
    switch (status) {
      case DeploymentStatusEnum.Success:
        return styles.success;
      case DeploymentStatusEnum.Failed:
      case DeploymentStatusEnum.Crashed:
        return styles.error;
      case DeploymentStatusEnum.Building:
      case DeploymentStatusEnum.Deploying:
      case DeploymentStatusEnum.Initializing:
        return styles.inProgress;
      case DeploymentStatusEnum.Queued:
      case DeploymentStatusEnum.Waiting:
      case DeploymentStatusEnum.NeedsApproval:
        return styles.pending;
      case DeploymentStatusEnum.Sleeping:
        return styles.sleeping;
      case DeploymentStatusEnum.Removed:
      case DeploymentStatusEnum.Removing:
      case DeploymentStatusEnum.Skipped:
        return styles.neutral;
      default:
        return styles.neutral;
    }
  };

  const getStatusLabel = (status: DeploymentStatusEnum) => {
    switch (status) {
      case DeploymentStatusEnum.Success:
        return "Success";
      case DeploymentStatusEnum.Failed:
        return "Failed";
      case DeploymentStatusEnum.Crashed:
        return "Crashed";
      case DeploymentStatusEnum.Building:
        return "Building";
      case DeploymentStatusEnum.Deploying:
        return "Deploying";
      case DeploymentStatusEnum.Initializing:
        return "Initializing";
      case DeploymentStatusEnum.Queued:
        return "Queued";
      case DeploymentStatusEnum.Waiting:
        return "Waiting";
      case DeploymentStatusEnum.NeedsApproval:
        return "Needs Approval";
      case DeploymentStatusEnum.Sleeping:
        return "Sleeping";
      case DeploymentStatusEnum.Removed:
        return "Removed";
      case DeploymentStatusEnum.Removing:
        return "Removing";
      case DeploymentStatusEnum.Skipped:
        return "Skipped";
      default:
        return status;
    }
  };

  return (
    <span className={`${styles.pill} ${getStatusStyle(status)}`}>
      <BsGlobe />
      {getStatusLabel(status)}
    </span>
  );
}
