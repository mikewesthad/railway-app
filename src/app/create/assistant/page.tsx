"use client";
import { useState } from "react";
import { BackButtonLink } from "../components/BackButtonLink";
import styles from "./page.module.css";
import { ImMagicWand } from "react-icons/im";
import { Button } from "@/components/Button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import { CreatePageTemplateQuery } from "@/__generated__/graphql";

const templateQuery = gql(`
  query CreatePageTemplate($code: String) {
    template(code: $code) {
      id
      name
      description
      category
      health
      readme
      tags
      languages
      guides {
        post
        video
      }
      serializedConfig
    }
  }
`);

export default function AssistantPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGettingRecommendation, setIsGettingRecommendation] = useState(false);
  const [aiResponse, setAiResponse] = useState<null | {
    templateId: string | null;
    reason: string;
  }>(null);

  const { data: templateData, loading: templateLoading } = useQuery<CreatePageTemplateQuery>(
    templateQuery,
    {
      variables: { code: aiResponse?.templateId ?? undefined },
      skip: !aiResponse?.templateId,
    }
  );

  const onTemplateSelect = (templateId: string) => {
    console.log("onTemplateSelect", templateId);
  };

  const handleGetRecommendation = async () => {
    if (!aiPrompt.trim()) return;

    const userMessage = aiPrompt.trim();
    setAiResponse(null);
    setAiPrompt("");
    setIsGettingRecommendation(true);

    try {
      const response = await fetch("/api/getRecommendedTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await response.json();

      // Add assistant's response to chat history
      setAiResponse(
        data.templateId === "null"
          ? {
              templateId: null,
              reason:
                "I couldn't find a perfect template for your needs. Try being more specific or browse the templates below.",
            }
          : {
              templateId: data.templateId,
              reason: data.reason,
            }
      );

      // If we got a template ID, select that template
      if (data.templateId && data.templateId !== "null") {
        onTemplateSelect(data.templateId);
      }
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      setAiResponse({
        templateId: null,
        reason: "Sorry, I encountered an error while trying to help you. Please try again.",
      });
    } finally {
      setIsGettingRecommendation(false);
    }
  };

  const handleExamplePrompt = (prompt: string) => {
    setAiPrompt(prompt);
    // Small delay to let the input update before sending
    setTimeout(() => handleGetRecommendation(), 100);
  };

  return (
    <main className={styles.main}>
      <BackButtonLink className={styles.backButton} href="/create" />
      <h1>Railway Assistant</h1>
      <div className={styles.content}>
        <p>Describe what you want to build, and we&apos;ll scaffold it for you.</p>
        <div className={styles.chatInput}>
          <div className={styles.inputWrapper}>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe what you want to build..."
              className={styles.promptInput}
              disabled={isGettingRecommendation}
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
              className={styles.startButton}
              onClick={handleGetRecommendation}
              disabled={isGettingRecommendation}
            >
              <ImMagicWand />
              <span>Start</span>
            </Button>
          </div>
        </div>
        <div className={styles.responseContainer}>
          {isGettingRecommendation && (
            <div className={styles.spinnerContainer}>
              <LoadingSpinner />
              <p>Hold tight, we&apos;re working on it...</p>
            </div>
          )}
          {aiResponse && (
            <div className={styles.aiResponse}>
              {aiResponse.templateId ? (
                <>
                  <p>{aiResponse.reason}</p>
                  {templateLoading ? (
                    <div className={styles.spinnerContainer}>
                      <LoadingSpinner />
                      <p>Loading template details...</p>
                    </div>
                  ) : templateData?.template ? (
                    <div className={styles.templateDetails}>
                      <h2>{templateData.template.name}</h2>
                      <p>{templateData.template.description || "No description available"}</p>
                      {templateData.template.tags && templateData.template.tags.length > 0 && (
                        <div className={styles.tags}>
                          {templateData.template.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {templateData.template.languages &&
                        templateData.template.languages.length > 0 && (
                          <div className={styles.languages}>
                            <h3>Languages</h3>
                            <div className={styles.languageList}>
                              {templateData.template.languages.map((language) => (
                                <span key={language} className={styles.language}>
                                  {language}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      <Button
                        onClick={() => onTemplateSelect(templateData.template.id)}
                        className={styles.deployButton}
                      >
                        Deploy Template
                      </Button>
                    </div>
                  ) : null}
                </>
              ) : (
                <p>{aiResponse.reason}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
