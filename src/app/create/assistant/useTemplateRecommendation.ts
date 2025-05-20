import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@/__generated__/gql";
import { TemplateCardFragment } from "@/__generated__/graphql";

const templateQuery = gql(`
  query CreatePageAssistantGetTemplate($code: String) {
    template(code: $code) {
      id
      ...TemplateCard
    }
  }
`);

interface AssistantRecommendationState {
  loading: boolean;
  error: string | null;
  data: {
    template: TemplateCardFragment | null;
    reason: string;
  } | null;
}

interface UseTemplateRecommendationResult extends AssistantRecommendationState {
  getRecommendation: (prompt: string) => Promise<void>;
}

export function useTemplateRecommendation(): UseTemplateRecommendationResult {
  const [assistantRecommendationState, setAssistantRecommendationState] =
    useState<AssistantRecommendationState>({
      loading: false,
      error: null,
      data: null,
    });

  const [getTemplate] = useLazyQuery(templateQuery);

  const getRecommendation = async (prompt: string) => {
    if (!prompt.trim()) {
      setAssistantRecommendationState({
        loading: false,
        error: "Please provide a prompt.",
        data: null,
      });
      return;
    }

    setAssistantRecommendationState({
      loading: true,
      error: null,
      data: null,
    });

    try {
      const response = await fetch("/api/getRecommendedTemplate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      const templateCode = data.templateCode;
      const reason = data.reason;

      if (templateCode) {
        const result = await getTemplate({ variables: { code: templateCode } });
        setAssistantRecommendationState({
          loading: false,
          data: { template: result.data?.template ?? null, reason },
          error: null,
        });
      } else {
        setAssistantRecommendationState({
          loading: false,
          data: null,
          error: reason,
        });
      }
    } catch (error) {
      console.error("Failed to get recommendation:", error);
      setAssistantRecommendationState({
        loading: false,
        data: null,
        error: "Sorry, I encountered an error while trying to help you. Please try again.",
      });
    } finally {
      setAssistantRecommendationState((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return {
    ...assistantRecommendationState,
    getRecommendation,
  };
}
