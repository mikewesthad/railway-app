"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { gql } from "@/__generated__/gql";
import styles from "./page.module.css";
import { useUser } from "@auth0/nextjs-auth0";
import { ButtonLink } from "@/components/ButtonLink";
import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { TokenForm } from "./manageToken/TokenForm";
import { useRouter } from "next/navigation";

const WORKSPACES = gql(`
  query MyAccount {
    me {
      id
      name
      avatar
      workspaces {
        id
        name
      }
    }
  }
`);

function RedirectToWorkspace() {
  const { loading, error, data } = useQuery(WORKSPACES);
  const router = useRouter();
  const firstWorkspaceId = data?.me.workspaces[0].id;

  React.useEffect(() => {
    if (firstWorkspaceId) {
      router.push(`/workspaces/${firstWorkspaceId}`);
    }
  }, [firstWorkspaceId, router]);

  if (error || !data || (!loading && !firstWorkspaceId)) {
    return <div>Error: {error?.message ?? "Could not load Railway data"}</div>;
  }

  return <LoadingSpinner size={32} />;
}

export default function Home() {
  const { user, isLoading } = useUser();
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(false);

  useEffect(() => {
    if (user) {
      checkToken();
    }
  }, [user]);

  const checkToken = async () => {
    try {
      setIsCheckingToken(true);
      const response = await fetch("/api/tokens");
      const data = await response.json();
      setHasToken(data.hasToken);
    } catch (error) {
      console.error("Error checking token:", error);
    } finally {
      setIsCheckingToken(false);
    }
  };

  if (isLoading || isCheckingToken) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Railway App</h1>
          <LoadingSpinner size={32} />
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Railway App</h1>
          <div className={styles.logIn}>
            <div>Please log in to get started.</div>
            <ButtonLink href="/auth/login">Login</ButtonLink>
          </div>
        </main>
      </div>
    );
  }

  if (hasToken === false) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Railway App</h1>
          <TokenForm onTokenSaved={checkToken} />
        </main>
      </div>
    );
  }

  return <RedirectToWorkspace />;
}
