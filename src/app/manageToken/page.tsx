"use client";

import { useEffect, useState } from "react";
import { TokenForm } from "./TokenForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import styles from "./page.module.css";
import { Button } from "@/components/Button";
import { FaTrash } from "react-icons/fa";

interface TokenStatus {
  hasToken: boolean;
  createdAt: string | null;
}

export default function ManageTokenPage() {
  const [tokenStatus, setTokenStatus] = useState<TokenStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTokenStatus = async () => {
    try {
      const response = await fetch("/api/tokens");
      if (!response.ok) {
        throw new Error("Failed to fetch token status");
      }
      const data = await response.json();
      setTokenStatus(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch token status");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteToken = async () => {
    if (!confirm("Are you sure you want to delete your token?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch("/api/tokens", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete token");
      }
      await fetchTokenStatus();
    } catch (err) {
      console.error(err);
      setError("Failed to delete token");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchTokenStatus();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner size={40} />
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Manage Railway Token</h1>
      <div className={styles.container}>
        {error ? <p>{error}</p> : null}
        {tokenStatus?.hasToken ? (
          <>
            <p>✅ Token is set</p>
            <p>Created: {new Date(tokenStatus.createdAt ?? "").toLocaleString()}</p>
            <div>
              <Button
                onClick={handleDeleteToken}
                disabled={isDeleting}
                className={styles.deleteButton}
                variant="danger"
                leftIcon={isDeleting ? <LoadingSpinner size={20} /> : <FaTrash />}
              >
                Delete Token
              </Button>
            </div>
          </>
        ) : (
          <TokenForm onTokenSaved={fetchTokenStatus} className={styles.tokenForm} />
        )}
      </div>
    </main>
  );
}
