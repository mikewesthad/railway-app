"use client";
import { useState } from "react";
import { BackButtonLink } from "../components/BackButtonLink";
import styles from "./page.module.css";

export default function AssistantPage() {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGettingRecommendation, setIsGettingRecommendation] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    Array<{ type: "user" | "assistant"; content: string }>
  >([]);
  const onTemplateSelect = (templateId: string) => {
    console.log("onTemplateSelect", templateId);
  };

  const handleGetRecommendation = async () => {
    if (!aiPrompt.trim()) return;

    const userMessage = aiPrompt.trim();
    setChatHistory((prev) => [...prev, { type: "user", content: userMessage }]);
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
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content:
            data.templateId === "null"
              ? "I couldn't find a perfect template for your needs. Try being more specific or browse the templates below."
              : data.reason,
        },
      ]);

      // If we got a template ID, select that template
      if (data.templateId && data.templateId !== "null") {
        onTemplateSelect(data.templateId);
      }
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "assistant",
          content: "Sorry, I encountered an error while trying to help you. Please try again.",
        },
      ]);
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
      <BackButtonLink href="/create" />
      <h1>Railway Assistant</h1>
      <div className={styles.content}>
        <div className={styles.assistantContainer}>
          <div className={styles.chatContainer}>
            {chatHistory.length === 0 ? (
              <div className={styles.welcomeMessage}>
                <p>
                  Hi! I&apos;m your template assistant. Tell me what you want to build, and
                  I&apos;ll help you find the right template.
                </p>
                <p>Try one of these examples:</p>
                <div className={styles.examplePrompts}>
                  <button
                    onClick={() => handleExamplePrompt("a messaging app")}
                    className={styles.exampleButton}
                  >
                    a messaging app
                  </button>
                  <button
                    onClick={() => handleExamplePrompt("an AI knowledge base for my company")}
                    className={styles.exampleButton}
                  >
                    an AI knowledge base for my company
                  </button>
                  <button
                    onClick={() => handleExamplePrompt("I only know python")}
                    className={styles.exampleButton}
                  >
                    I only know python
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.chatMessages}>
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${
                      message.type === "user" ? styles.userMessage : styles.assistantMessage
                    }`}
                  >
                    <div className={styles.messageContent}>{message.content}</div>
                  </div>
                ))}
                {isGettingRecommendation && (
                  <div className={`${styles.message} ${styles.assistantMessage}`}>
                    <div className={styles.messageContent}>
                      <div className={styles.typingIndicator}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className={styles.chatInput}>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGetRecommendation();
                  }
                }}
                placeholder="Describe what you want to build..."
                className={styles.promptInput}
                disabled={isGettingRecommendation}
              />
              <button
                onClick={handleGetRecommendation}
                disabled={isGettingRecommendation || !aiPrompt.trim()}
                className={styles.recommendButton}
              >
                {isGettingRecommendation ? (
                  <span className={styles.buttonContent}>
                    <span className={styles.spinner}></span>
                    Thinking...
                  </span>
                ) : (
                  <span className={styles.buttonContent}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Send
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
