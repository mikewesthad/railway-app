"use client";

import { gql } from "@/__generated__/gql";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import styles from "./DeleteModal.module.css";

const DELETE_PROJECT = gql(`
  mutation DeleteProject($id: String!) {
    projectScheduleDelete(id: $id)
  }
`);

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
}

export function DeleteModal({ isOpen, onClose, projectId, projectName }: DeleteModalProps) {
  const router = useRouter();
  const [confirmName, setConfirmName] = useState("");
  const [deleteProject, { loading }] = useMutation(DELETE_PROJECT);

  const handleDelete = async () => {
    if (confirmName !== projectName) return;

    try {
      await deleteProject({
        variables: {
          id: projectId,
        },
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Project" maxWidth="600px">
      <div className={styles.content}>
        <p>
          Are you sure you want to schedule deletion of the project <strong>{projectName}</strong>{" "}
          in 48 hours? This includes all services, environments and data. Active deploys will be
          stopped immediately.
        </p>
        <p>Please type the project name to confirm deletion:</p>
        <input
          type="text"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
          placeholder={projectName}
          className={styles.input}
        />
        <div className={styles.actions}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={handleDelete}
            disabled={confirmName !== projectName || loading}
            variant="danger"
          >
            {loading ? "Deleting..." : "Delete Project"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
