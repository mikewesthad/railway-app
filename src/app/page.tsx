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

/**
 * Redirects to the first workspace in the user's account. Little bit of a
 * corner cut here. TODO: support workspace switching.
 */
function RedirectToWorkspace() {
  const { loading, error, data } = useQuery(WORKSPACES);
  const router = useRouter();
  const firstWorkspaceId = data?.me?.workspaces?.[0]?.id;

  React.useEffect(() => {
    if (firstWorkspaceId) {
      router.push(`/workspaces/${firstWorkspaceId}`);
    }
  }, [firstWorkspaceId, router]);

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner size={32} />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <div>Error: {error.message}</div>
      </Wrapper>
    );
  }

  if (!data?.me?.workspaces?.length) {
    return (
      <Wrapper>
        <div>No workspaces found!</div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <LoadingSpinner size={32} />
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Railway App</h1>
        {children}
      </main>
    </div>
  );
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
      <Wrapper>
        <LoadingSpinner size={32} />
      </Wrapper>
    );
  }

  if (!user) {
    return (
      <Wrapper>
        <div className={styles.logIn}>
          <div>Please log in to get started.</div>
          <ButtonLink variant="primary" href="/auth/login">
            Login
          </ButtonLink>
        </div>
      </Wrapper>
    );
  }

  if (hasToken === false) {
    return (
      <Wrapper>
        <TokenForm onTokenSaved={checkToken} />
      </Wrapper>
    );
  }

  return <RedirectToWorkspace />;
}
