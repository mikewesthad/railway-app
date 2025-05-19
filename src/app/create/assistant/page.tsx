"use client";

import { Suspense, useState } from "react";
import { BackButtonLink } from "../components/BackButtonLink";
import styles from "./page.module.css";
import { ImMagicWand } from "react-icons/im";
import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useTemplateRecommendation } from "./useTemplateRecommendation";
import { TemplateCard } from "../components/TemplateCard";
import { useTeamId } from "../useTeamId";
import { IoMdSend } from "react-icons/io";

function AssistantMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.assistantMessage}>
      <div className={styles.messageHeader}>
        <ImMagicWand className={styles.messageIcon} />
        Railway Assistant
      </div>
      {children}
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AssistantPageContent />
    </Suspense>
  );
}

function AssistantPageContent() {
  const teamId = useTeamId();

  const [aiPrompt, setAiPrompt] = useState("");
  const { loading, error, data, getRecommendation } = useTemplateRecommendation();

  const handleGetRecommendation = async () => {
    await getRecommendation(aiPrompt);
  };

  return (
    <main className={styles.main}>
      <BackButtonLink className={styles.backButton} href={`/create?teamId=${teamId}`} />
      <h1>Railway Assistant</h1>
      <div className={styles.content}>
        <div className={styles.chatInput}>
          <p>Describe what you want to build, and we&apos;ll scaffold it for you.</p>
          <div className={styles.inputWrapper}>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe what you want to build..."
              className={styles.promptInput}
              disabled={loading}
            />
            <div className={styles.inlineExamples}>
              <span className={styles.exampleHint}>Not sure what to build?</span>
              <button
                onClick={() => setAiPrompt("a messaging app")}
                className={styles.inlineExample}
              >
                a messaging app
              </button>
              <button
                onClick={() => setAiPrompt("an AI knowledge base for my company")}
                className={styles.inlineExample}
              >
                an AI knowledge base
              </button>
              <button
                onClick={() => setAiPrompt("I only know python")}
                className={styles.inlineExample}
              >
                I only know python
              </button>
            </div>
            <Button
              variant="primary"
              className={styles.startButton}
              onClick={handleGetRecommendation}
              disabled={loading}
              leftIcon={loading ? <LoadingSpinner size={20} /> : <IoMdSend />}
            >
              Send
            </Button>
          </div>
        </div>
        <div className={styles.responseContainer}>
          {loading ? (
            <AssistantMessage>
              <div className={styles.assistantMessageLoading}>
                <LoadingSpinner />
                <span>Hold tight, we&apos;re working on it...</span>
              </div>
            </AssistantMessage>
          ) : null}
          {error ? <p>{error}</p> : null}
          {data ? (
            <div className={styles.aiResponse}>
              {data.template ? (
                <>
                  <AssistantMessage>
                    <p>
                      I recommend <strong>{data.template.name}</strong>. {data.reason}
                    </p>
                  </AssistantMessage>
                  <div className={styles.templateCardContainer}>
                    <TemplateCard template={data.template} teamId={teamId} />
                  </div>
                </>
              ) : (
                <p>{data.reason}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
