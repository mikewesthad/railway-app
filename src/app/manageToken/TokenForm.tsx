"use client";

import { useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import styles from "./TokenForm.module.css";

interface TokenFormProps {
  onTokenSaved: () => void;
  className?: string;
}

export function TokenForm({ onTokenSaved, className }: TokenFormProps) {
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: token }),
      });

      if (!response.ok) {
        throw new Error("Failed to save token");
      }

      onTokenSaved();
    } catch {
      setError("Failed to save token. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${styles.tokenForm} ${className}`}>
      <h2>Enter Your Railway Token</h2>
      <p>Please enter your Railway account API token to continue.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your Railway token"
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner size={20} /> : "Save Token"}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
